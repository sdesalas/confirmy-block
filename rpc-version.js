const readlineSync = require('readline-sync');
const axios = require("axios");
const fs = require("fs");

const nodes = fs.readFileSync('nodes.txt').toString().split("\n");

main();

async function main() {
	for (var i = 0; i < nodes.length; i++) {
        console.log('Checking node ' + i + ': ' + nodes[i]);
        try {
            var res = await axios.post(nodes[i], {action: "version"}, {validateStatus: () => true});
            console.log(res.status);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
	}
}
