# Confirmy Block

This is a experimental script to help confirm unconfirmed Nano transactions.

- It fetches the first unconfirmed block, increases the PoW and retransmits it to the network, waits for confirmation from PRs and continues to the next block.
- If something goes wrong it exit. So you need to run again
- If any receive block depends on another unconfirmed block (link), it gives up and exit. So you need to run again in the source account (it will be displayed)

I was successful in confirming hundreds of blocks from a Binance account, using my own node and later verifying the confirmations on nanocrawler.cc and nanolooker.com

#### Clone and install dependencies
```
    git clone https://github.com/anarkrypto/confirmy-block
    cd confirmy-blocks
    npm install
```

#### Config
Edit `config.json`:
- node: A valid and synced Nano node RPC. It can be a remote node, but it needs to support the following rpc calls: account_info, account_history, block_info, process 
- worker: Responsible for increase the PoW. It can be the same Nano node or a nano-work-server. It is recommended to use GPU
- enable_max_difficulty: If you want to skip very large PoW, leave this option enabled (true). Otherwise false
- max_difficulty_send: Maximum PoW multiplier for send and change blocks [if enable_max_difficulty is true] 
- max_difficulty_receive: Maximum PoW multiplier for receive blocks [if enable_max_difficulty is true] 

#### If you are using your own node:
Add this lines to your `config-node.toml`
```
# Online weight minimum required to confirm a block.
# type:string,amount,raw
online_weight_minimum = "60000000000000000000000000000000000000"

# Percentage of votes required to confirm blocks. A value below 50 is not recommended.
# type:uint64
online_weight_quorum = 67
```
This will ensure that your node will only say that a block is confirmed when the 67% vote quorum has been reached


#### Usage:
Confirms all blocks in an account:

```
    node src/index [nano_account]
```
Confirms a specific block
```
    node src/index [block_hash]
```

Example:

```
    node src/index nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k
```
```
    node src/index 311B4EF6724AE01E0B276A3219943A81C5C76378B581B2C1E6F946712C957699
```

<br>

<img src="https://github.com/anarkrypto/confirmy-block/blob/main/docs/confirmyblock.gif?raw=true">


<br><br>

If it helped you, consider making a donation :):

nano_37f4cm1tu94tteodph6xwwnoowhiae3q483kgfwzd75ns7tbp9uknot4qihe
