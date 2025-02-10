# Simple Blockchain Implementation in JavaScript

This project demonstrates a simple implementation of a blockchain in JavaScript using Node.js. The blockchain consists of blocks that store transactions and uses Proof-of-Work to ensure data integrity.

## Features
- **Block Structure**: Each block contains an index, timestamp, transactions, previous block hash, and a cryptographic hash.
- **Proof-of-Work**: Implements mining by requiring a certain number of leading zeroes in the hash.
- **Blockchain Integrity Check**: Ensures that the blockchain remains valid.
- **Tampering Demonstration**: Shows how modifying a block invalidates the chain.

## Prerequisites
Make sure you have Node.js installed on your system. You can check your installation by running:
```
node -v
```

## Installation
Clone the repository and navigate into the project directory:
```
git clone https://github.com/SandeepSinghkaintura/blockchain-js.git
cd blockchain-js
```

## Running the Blockchain
Run the script using Node.js:
```
node blockchain.js
```

This will:
1. Create a blockchain.
2. Mine two blocks with sample transactions.
3. Display the blockchain.
4. Verify blockchain validity.
5. Demonstrate how tampering affects integrity.

## Code Overview
### Block Class
Defines the structure of a block and includes methods for hashing and mining.

### Blockchain Class
Manages the chain of blocks and provides methods to add blocks, validate the chain, and enforce Proof-of-Work.

### Mining & Tampering Demonstration
- Blocks are mined with a specified difficulty level.
- A tampering attempt is simulated by altering a block's transactions and checking the blockchain's validity.

## Example Output
```
Mining block 1...
Block mined: 000abcd...
Mining block 2...
Block mined: 000efgh...
Blockchain: { ...blockchain data... }
Is blockchain valid? true
Tampering with blockchain...
Is blockchain valid after tampering? false
```

## License
This project is open-source under the MIT License.

## Author
[Your Name]  
[Your Contact Information]

