const readlineSync = require('readline-sync');
const axios = require("axios");
const fs = require("fs");

const nodes = fs.readFileSync('nodes.txt').toString().split("\n");

main();
//peers();

async function main() {
	var addr = readlineSync.question('Address to search: ');
	var lowest_node = "";
	var lowest_height = Number.POSITIVE_INFINITY;
	var lowest_block = undefined;
	var heights = [];
	for (var i = 0; i < nodes.length; i++) {
        console.log('Checking node ' + i + ': ' + nodes[i]);
        try {
            var accinfo = await account_info(addr, nodes[i]);
            if (accinfo["confirmation_height"] < lowest_height) {
                lowest_node = nodes[i];
                lowest_height = accinfo["confirmation_height"];
                lowest_block = accinfo["confirmation_height_frontier"];
            }
            heights.push(accinfo["confirmation_height"]);   
        } catch (err) {
            console.error(err);
        }
	}
	console.log("You need to contact node " + lowest_node);
	console.log("Height: " + lowest_height);
	console.log("Block: " + lowest_block);
	console.log("Heights: " + heights);
}

/*async function peers() {
	
}*/

function postRPC(data, nodeAddress = node) {
    return new Promise(async function (resolve, reject) {
        await axios.post(nodeAddress, data)
            .then((res) => {
                console.log(res.status);
                console.log(res.data);
                if (typeof res.data === 'object') {
                    if ("error" in res.data) {
                        reject(res.data.error)
                    } else {
                        resolve(res.data)
                    }
                } else {
                    reject("Invalid node response")
                }
            }).catch((err) => {
                console.log(err);
                if (err.response) {
                    console.log(err.response.status);
                    console.log(err.response.data);
                    reject(err.response.data);
                } else if (err.request) {
                    reject("no response from node");
                } else {
                    reject('Error', err.message);
                }
            })
    })
}
function account_info(account, node) {
    return new Promise((resolve, reject) => {
        const data = {
            action: "account_info",
            account: account
        }
        postRPC(data, node)
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
    })
}