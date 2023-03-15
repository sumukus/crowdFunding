const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const crowdFundingFactory = require("./build/crowdFundingFactory.json");

const provider = new HDWalletProvider(
    //Enter metamask passphrase, 
    //Enter the infura link to the rinkeby test network
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from address ", accounts[0]);

    const result = await new web3.eth.Contract(crowdFundingFactory.abi)
    .deploy({
        data: crowdFundingFactory.evm.bytecode.object,
    })
    .send({
        from: accounts[0],
        gas: 2000000
    });

    console.log("Contract is deployed at address ", result.options.address);
    provider.engine.stop();
}

deploy();

//Deployed at 0x3136D6e327018d4124C222E15f4aD7fA8621f16E
//Deployed at 0x3136D6e327018d4124C222E15f4aD7fA8621f16E
//Deployed at 0x3136D6e327018d4124C222E15f4aD7fA8621f16E