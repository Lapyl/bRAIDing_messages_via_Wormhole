# bRAIDing messages via Wormhole

Data breaches is a global crisis that puts all individuals and organizations at risks. In view of such data breaches, maintaining confidentiality of most messages and data is of paramount importance.

In computers, RAID 0 splits data on multiple disks, and thereby provides confidentiality. Likewise, RAID 0 of messages can be useful for sending confidential messages or storing confidential data. As an example of RAID 0 of messages, if you want to send a password, you may split the password in some way in two pieces, and send one piece to one email address, and send the other piece to another email address of the same user.

This project is about 0 RAIDing of messages across multiple blockchains by using Wormhole as the cross-chain messaging protocol. For this project, we have used Avalanche, Celo, and Base Testnets, but it is possible to extend it to other testnets and mainnets. For deployment of channels and sending of a message, the user's crypto wallet should have these testnets with adequate tokens.

Using some code-chunks from the demo wormhole messaging repository, we have built a React app that can deploy a sender and two receivers simultaneously, and then send two parts of a message to the two receivers. The splitting of a message is based on a user-provided code, and a certain splitting formula.

The node server can be started by running command "NPM start". This will bring up our webpage at port 3000. For server-side actions, we have used PHP. The PHP server can be started by running command: "PHP -S localhost : 3001" .

Our webpage at port 3000 has three forms. In the first form, a sender chain is selected out of Avalanche, Celo, and Base. The other two chains act as receivers. Upon clicking Deploy, Deploy.PHP code runs, which runs “NPM deploy” code. The deployment fails if the wallet does not have adequate tokens.

In the second form, the user writes a message to be split and sent and a code for splitting the message. Upon clicking Split, Send.PHP code runs, which runs “NPM send” code. The output displays the split messages. Sending of messages fails if appropriate deployment was not done or if the wallet does not have adequate tokens.

In the third form, the user writes two messages and the joining code. Upon clicking Join, Join.PHP code runs, which outputs the joined message.

In the first form, the deployment succeeds if the wallet has adequate tokens. The output webpage gives deployment information.

In the second form, sending of messages succeeds if appropriate deployment was already done and if the wallet has adequate tokens. The output webpage gives information about the transmission and the URLs where to get further information about the messages sent.

## Purpose

This project was subitted to Wormhole - Signa Sprint - Hackathon in November 2024.

## Acknowledgement

Some of the code in this repository is based on https://github.com/wormhole-foundation/demo-wormhole-messaging .