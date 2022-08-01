const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledCFF = require("../ethereum/build/crowdFundingFactory.json");
const compiledCF = require("../ethereum/build/crowdFunding.json");


let accounts;
let crowdFundingFactory;
let crowdFunding;
let crowdFundingAddress;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    crowdFundingFactory = await new web3.eth.Contract(compiledCFF.abi)
    .deploy({
        data: compiledCFF.evm.bytecode.object,
    })
    .send({
        from: accounts[0],
        gas: 1500000
    });

    await crowdFundingFactory.methods.createCrowdFunding("20").send({
        from: accounts[0],
        gas: 1500000
    });

    [crowdFundingAddress] = await crowdFundingFactory.methods.getListOfCrowdFunding().call();

    crowdFunding = await new web3.eth.Contract(
        compiledCF.abi,
        crowdFundingAddress
    );
    
});

describe("crowdFunding Tests", () => {

    it("crowdFundingFactory contract is deploayed", () => {
        assert.ok(crowdFundingFactory.options.address)
    });

    it("crowdFunding contract is deployed", () => {
        assert.ok(crowdFunding.options.address);
    });

    it("Minimum amount to contribute to crowdfunding", async () => {
        const minAmt = await crowdFunding.methods.minimumAmount().call();
        assert.strictEqual('20', minAmt);
    });

});