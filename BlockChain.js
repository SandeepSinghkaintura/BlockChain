const crypto = require('crypto');

// Block class representing each block in the blockchain
class Block {
    constructor(index, timestamp, transactions, previousHash = '') {
        this.index = index; // Position of the block in the chain
        this.timestamp = timestamp; // Time when block is created
        this.transactions = transactions; // List of transactions in the block
        this.previousHash = previousHash; // Hash of the previous block
        this.nonce = 0; // Number used for mining (Proof-of-Work)
        this.hash = this.calculateHash(); // Calculate initial hash
    }

    // Method to calculate the block's hash using SHA-256
    calculateHash() {
        return crypto.createHash('sha256').update(
            this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce
        ).digest('hex');
    }

    // Mining function to perform Proof-of-Work
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++; // Increment nonce to change hash
            this.hash = this.calculateHash(); // Recalculate hash
        }
        console.log(`Block mined: ${this.hash}`); // Print mined block hash
    }
}

// Blockchain class to manage the chain of blocks
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Initialize blockchain with Genesis Block
        this.difficulty = 3; // Adjust for faster/slower mining
    }

    // Method to create the first block (Genesis Block)
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    // Get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block to the chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // Set previous hash reference
        newBlock.mineBlock(this.difficulty); // Perform mining (Proof-of-Work)
        this.chain.push(newBlock); // Add the mined block to the chain
    }

    // Validate the integrity of the blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the current block's hash is valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if the previous hash matches
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Demonstration of Blockchain functionality
let myBlockchain = new Blockchain();

console.log("Mining block 1...");
myBlockchain.addBlock(new Block(1, Date.now(), [{ sender: "Alice", receiver: "Bob", amount: 100 }]));

console.log("Mining block 2...");
myBlockchain.addBlock(new Block(2, Date.now(), [{ sender: "Bob", receiver: "Charlie", amount: 50 }]));

console.log("Blockchain:", JSON.stringify(myBlockchain, null, 4));

// Verify if the blockchain is valid
console.log("Is blockchain valid?", myBlockchain.isChainValid());

// Tampering demonstration
console.log("Tampering with blockchain...");
myBlockchain.chain[1].transactions = [{ sender: "Alice", receiver: "Bob", amount: 10000 }]; // Manually modify transactions in block 1

// Check blockchain validity after tampering
console.log("Is blockchain valid after tampering?", myBlockchain.isChainValid());
