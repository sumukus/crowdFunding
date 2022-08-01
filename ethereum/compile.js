const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const filePath = path.resolve(__dirname, 'contracts', 'crowdFunding.sol' );

const sourceCode = fs.readFileSync(filePath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'crowdFunding.sol':{
            content: sourceCode
        }
    },
    settings:{
        outputSelection:{
            "*":{
                "*": ["*"]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['crowdFunding.sol'];

fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}