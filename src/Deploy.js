const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {

	const cSender=process.argv[2] && process.argv[2];
	var htmlout="<html><head></head><body><h1>bRAIDing messages via Wormhole</h1><h2>Deploy</h2>";

	var chain0Id=6;
	var chain1Id=14;
	var chain2Id=2;

	var chain0Name='Avalanche Fuji Testnet';
	var chain1Name='Celo Alfajores Testnet';
	var chain2Name='Base Sepolia Testnet';

	if (cSender=="-c") {
		chain0Id=14; chain0Name='Celo Alfajores Testnet';
		chain1Id=6; chain1Name='Avalanche Fuji Testnet';
		chain2Id=2; chain2Name='Base Sepolia Testnet';
	} else if (cSender=="-b") {
		chain0Id=2; chain0Name='Base Sepolia Testnet';
		chain1Id=6; chain1Name='Avalanche Fuji Testnet';
		chain2Id=14; chain2Name='Celo Alfajores Testnet';
	}

	console.log("Sender :" + chain0Id + " | " + chain0Name);
	console.log("Receiver 1 :" + chain1Id + " | " + chain1Name);
	console.log("Receiver 2 :" + chain2Id + " | " + chain2Name);

	htmlout = htmlout + "<h3>Sender</h3>" + chain0Id + " | " + chain0Name;
	htmlout = htmlout + "<h3>Receiver 1</h3>" + chain1Id + " | " + chain1Name;
	htmlout = htmlout + "<h3>Receiver 2</h3>" + chain2Id + " | " + chain2Name;

	try {

	const chains = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/chains.json')));

	const chain0 = chains.chains.find((chain) => chain.description.includes(chain0Name));
	const chain1 = chains.chains.find((chain) => chain.description.includes(chain1Name));
	const chain2 = chains.chains.find((chain) => chain.description.includes(chain2Name));

	const provider0 = new ethers.JsonRpcProvider(chain0.rpc);
	const provider1 = new ethers.JsonRpcProvider(chain1.rpc);
	const provider2 = new ethers.JsonRpcProvider(chain2.rpc);

	const wallet0 = new ethers.Wallet(process.env.PRIVATE_KEY, provider0);
	const wallet1 = new ethers.Wallet(process.env.PRIVATE_KEY, provider1);
	const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY, provider2);

	const messageSenderJson = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, "../out/MessageSender.sol/MessageSender.json"), "utf8"));
	const messageReceiverJson = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../out/MessageReceiver.sol/MessageReceiver.json'), 'utf8'));

	const abiSender = messageSenderJson.abi;
	const abiReceiver = messageReceiverJson.abi;

	const bytecodeSender = messageSenderJson.bytecode;
	const bytecodeReceiver = messageReceiverJson.bytecode;

	const messageSender = new ethers.ContractFactory(abiSender, bytecodeSender, wallet0);
	const messageReceiver1 = new ethers.ContractFactory(abiReceiver, bytecodeReceiver, wallet1);
	const messageReceiver2 = new ethers.ContractFactory(abiReceiver, bytecodeReceiver, wallet2);

	const senderContract = await messageSender.deploy(chain0.wormholeRelayer);
	const receiver1Contract = await messageReceiver1.deploy(chain1.wormholeRelayer);
	const receiver2Contract = await messageReceiver2.deploy(chain2.wormholeRelayer);

	await senderContract.waitForDeployment();
	console.log('MessageSender deployed to:', chain0Name, senderContract.target);
	await receiver1Contract.waitForDeployment();
	console.log('MessageReceiver deployed to:', chain1Name, receiver1Contract.target);
	await receiver2Contract.waitForDeployment();
	console.log('MessageReceiver deployed to:', chain2Name, receiver2Contract.target);

	const deployedContractsPath = path.resolve(__dirname, '../config/deployedContracts.json');
	const deployedContracts = JSON.parse(fs.readFileSync(deployedContractsPath, 'utf8'));

	senderAddress = deployedContracts.sender.address;

	const tx1 = await receiver1Contract.setRegisteredSender(chain0Id, ethers.zeroPadValue(senderAddress, 32));
	await tx1.wait();
	const tx2 = await receiver2Contract.setRegisteredSender(chain0Id, ethers.zeroPadValue(senderAddress, 32));
	await tx2.wait();	

	console.log(`Registered MessageSender (${senderAddress}) for (${chain0Name})`);

	deployedContracts.sender = { id: chain0Id, name: chain0Name,
		address: senderContract.target, dtime: new Date().toISOString(), };
	deployedContracts.receiver1 = { id: chain1Id, name: chain1Name,
		address: receiver1Contract.target, dtime: new Date().toISOString(), };
	deployedContracts.receiver2 = { id: chain2Id, name:chain2Name,
		address: receiver2Contract.target, dtime: new Date().toISOString(), };
			
	fs.writeFileSync(deployedContractsPath, JSON.stringify(deployedContracts, null, 2));

	console.log("Sender :" + senderContract.target);
	console.log("Receiver 1 :" + receiver1Contract.target);
	console.log("Receiver 2 :" + receiver2Contract.target);

	htmlout = htmlout + "<h3>Sender</h3>" + senderContract.target;
	htmlout = htmlout + "<h3>Receiver 1</h3>" + receiver1Contract.target;
	htmlout = htmlout + "<h3>Receiver 2</h3>" + receiver2Contract.target;
	htmlout = htmlout + "<h3>Deployment</h3>Sucessful";
	htmlout = htmlout + "</body></html>";

	}
	
	catch {
		htmlout = htmlout + "<h3>Deployment</h3>Failed";
		htmlout = htmlout + "</body></html>";
	}

	return htmlout;
}
