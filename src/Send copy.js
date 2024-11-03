const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {

	var cMessage=process.argv[2] && process.argv[2] && "";
	var cCode=process.argv[3] && process.argv[3] && "";
	var cSend=process.argv[4] && process.argv[4] && "";

	if (!cMessage) { cMessage="SardhavShertha"; }
	if (!cCode) { cCode="Ahd"; }
	if (!cSend) { cSend=""; }

	const cMessLen=cMessage.length;
	const cCodeLen=cCode.length;

	var htmlout="<html><head></head><body><h1>bRAIDing messages via Wormhole</h1><h2>Deploy</h2>";

	var cMessage1="";
	var cMessage2="";
	var cMessChr1="";
	var cMessChr2="";

	console.log(cMessage);
	for (var i=0; i<cMessLen/2; i++) {
		cMessChr1=cMessage[cMessLen-1-2*i];
		cMessChr2=cMessage[cMessLen-2-2*i];
		for (var j=0; j<cCodeLen-1; j++) {
			if (cMessChr1==cCode[j]) {cMessChr1=cCode[j+1]; j=99;}
			else if (cMessChr1==cCode[j+1]) {cMessChr1=cCode[j]; j=99;}}
		for (var j=0; j<cCodeLen-1; j++) {		
			if (cMessChr2==cCode[j]) {cMessChr2=cCode[j+1]; j=99;}
			else if (cMessChr2==cCode[j+1]) {cMessChr2=cCode[j]; j=99;}}
		cMessage1=cMessage1.concat(cMessChr1);
		cMessage2=cMessage2.concat(cMessChr2);
	};

	console.log("Original Message : " + cMessage);
	console.log("Code to Split : " + cCode);	
	console.log("Message Part 1 : " + cMessage1);
	console.log("Message Part 2 : " + cMessage2);

	htmlout = htmlout + "<h3>Original Message<h3>" + cMessage;
	htmlout = htmlout + "<h3>Code to Split<h3>" + cCode;	
	htmlout = htmlout + "<h3>Message Part 1<h3>" + cMessage1;
	htmlout = htmlout + "<h3>Message Part 2<h3>" + cMessage2;

	if (cSend=="") { return htmlout + "</body></html>"; }

	const chains = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/chains.json')));

	const deployedContracts = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../config/deployedContracts.json')));
	
	chain0Id = deployedContracts.sender.id;
	chain1Id = deployedContracts.receiver1.id;
	chain2Id = deployedContracts.receiver2.id;
	
	chain0Name = deployedContracts.sender.name;
	chain1Name = deployedContracts.receiver1.name;
	chain2Name = deployedContracts.receiver2.name;

	chain0Address = deployedContracts.sender.address;
	chain1Address = deployedContracts.receiver1.address;
	chain2Address = deployedContracts.receiver2.address;

	console.log('Sender : ' + chain0Id + " | " + chain0Name + " | " + chain0Address);
	console.log('Receiver1 : ' + chain1Id + " | " + chain1Name + " | " + chain1Address);
	console.log('Receiver2 : ' + chain2Id + " | " + chain2Name + " | " + chain2Address);

	htmlout = htmlout + "<h3>Sender</h3>" + chain0Id + " | " + chain0Name + " | " + chain0Address;
	htmlout = htmlout + "<h3>Receiver 1</h3>" + chain1Id + " | " + chain1Name + " | " + chain1Address;
	htmlout = htmlout + "<h3>Receiver 2</h3>" + chain2Id + " | " + chain2Name + " | " + chain2Address;

	const chain0 = chains.chains.find((chain) => chain.description.includes(chain0Name));
	const chain1 = chains.chains.find((chain) => chain.description.includes(chain1Name));
	const chain2 = chains.chains.find((chain) => chain.description.includes(chain2Name));

	const provider0 = new ethers.JsonRpcProvider(chain0.rpc);
	const wallet0 = new ethers.Wallet(process.env.PRIVATE_KEY, provider0);

	const messageSenderJson = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../out/MessageSender.sol/MessageSender.json'), 'utf8'));

	const abi = messageSenderJson.abi;

	const MessageSender = new ethers.Contract( chain0Address, abi, wallet0 );

	const txCost1 = await MessageSender.quoteCrossChainCost(chain1Id);

	console.log("Transaction Cost 1 : " + txCost1);
	htmlout = htmlout + "<h3>Transaction Cost 1</h3>>" + txCost1;

	const txCost2 = await MessageSender.quoteCrossChainCost(chain2Id);

	console.log("Transaction Cost 2 : " + txCost2);
	htmlout = htmlout + "<h3>Transaction Cost 2</h3>>" + txCost2;

	const tx1 = await MessageSender.sendMessage( chain1Id, chain1Address,
		cMessage1, { value: txCost1, });

	console.log('Message Part 1 sent. Waiting for confirmation...');
	await tx1.wait();

	console.log('Message Part 1 sent. Hash: ' + tx1.hash);
	htmlout = htmlout + "<h3>Hash of Message Part 1 sent</h3>" + tx1.hash;
	console.log(`See: https://wormholescan.io/#/tx/${tx1.hash}?network=TESTNET`);
	htmlout = htmlout + "<h3>URL of Message Part 1 sent</h3>https://wormholescan.io/#/tx/" + tx1.hash + "?network=TESTNET";

	const tx2 = await MessageSender.sendMessage( chain2Id, chain2Address,
		cMessage2, { value: txCost2, });

	console.log('Message Part 2 sent. Waiting for confirmation...');
	await tx2.wait();

	console.log('Message Part 2 sent. Hash: ' + tx2.hash);
	htmlout = htmlout + "<h3>Hash of Message Par2 1 sent</h3>" + tx2.hash;
	console.log(`See: https://wormholescan.io/#/tx/${tx2.hash}?network=TESTNET`);
	htmlout = htmlout + "<h3>URL of Message Part 2 sent</h3>https://wormholescan.io/#/tx/" + tx2.hash + "?network=TESTNET";

	htmlout = htmlout + "<h3>Sending of Message</h3>Sucessful";
	htmlout = htmlout + "</body></html>";

	return htmlout;
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
	return "<html><head></head><body>" + error + "</body></html>";
});
