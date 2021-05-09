# Decentralized Stock Exchange
**By: Developer's Monk (Adarsh Shrivastava)** <br>
**dApp live at: https://dse.adarshshrivastava.in**

![logo](https://user-images.githubusercontent.com/41023846/117513641-c853ba00-afaf-11eb-9d7d-c427a95ba19e.png)

![logo](https://user-images.githubusercontent.com/41023846/117558251-4b9d0a80-b099-11eb-95d3-5392d823b307.png)

Build over Ethereum framework, this is a Decentralized Stock Exchange Pilot Project. There are a number of things to be incoprated in it as the possibilities are endless but this version of DSE contains some core features like:

 - User Identity management - using Portis
 - Listing Companies and offering IPOs
 - Trading - Buying/ Selling of stocks
 - Transparancy - All the transactions of a company's stocks are publically available and could be seen by anyone. BUT, taking in account the privacy of people, only their wallet addresses are visible and not their personal informations.
 - Refreshing Smooth UI and UX

## Features, Scope, Use case
Refer to this doc file: https://docs.google.com/document/d/1vPfsUe4D0JQ3AEMYj5OsVF831o5TeD73icAnvtdMz4U/edit

## Technology Used

 - Ethereum - Backend using SmartContracts
 - Portis - Wallet, Providing User Identification
 - ReactJS - Frontend
 - Web3.js - to interact with SmartContracts
 - Ganache - to create local ethereum blockchain for test deployment
 - AWS EC2 - hosted ganache server and react app on it.

## How to run
There are two ways to test this project

 1. **Use Directly from URL (PREFFERED)** <br>
	URL: https://dse.adarshshrivastava.in <br>
	I have hosted a ganache blockchain server on my personal AWS EC2 instance and have connected it with this app for testing purposes. I might remove the server after a month or so and then you'll have to run it on your own local machine.<br><br>
		1. If you don't have Portis wallet then register now from https://wallet.portis.io/ . It's free.<br>
		2. Go to your portis wallet. Go to **more > Import Ethereum Wallet > Private Key**<br>
		3. Go to https://adarshshrivastava.in/dse_keys.json . This file contains list of available walletIds and their keys for testing. <br>
		4. Inside Private Key textbox in portis wallet, enter anyone key from that file: (These keys are of ganache server each having account with 1000 Ethers(obviously fake ones for testing)). After entering the key select active wallet and  select the wallet with the walletid you picked from that file in point 3. <br>
		5. All done! You could now use the app from this link: https://dse.adarshshrivastava.in . Happy Trading!! 
			

 2. **Run on your own local machine**
	1. Clone this repository to your local machine.
	2. Install Ganache and run it. It will show 10 accounts each with 100Ether.
	3. Open http://remix.ethereum.org/. IDE for developing smart contracts.
	4. Inside Remix copy the two contracts Exchange.sol and Company.sol from "./Contracts" and compile
	5. Once they are compiled go to Deploy tab in Remix and in Environment dropdown, select "Web3 Provider". Now it will ask for a url. Go to Ganache and copy the server url from there and paste it.
	6. Now Remix is linked to your local Ganache server. Now deploy the Exchange.sol file in first account and note down it's contract address.
	7. Now to add companies all you have to do is, Edit Company.sol file's contructor (from line 33 to 42). There you have to enter Company details and in place of ExchangeAddress variable there, add the contract address which you noted in point 6.Rest Instructions are given there.
	8. Once a Company.sol file is ready, deploy it as you did the Exchange.sol file. Again note down the contract address.
	9. Now from Solidity's deploy section, select Exchange contract and run addCompany function there with two parameters - (companyContractAddress you noted in point 8, company Id).
	10. Hurray! Now your company is listed in the Exchange. To add more companies make multiple copies of Company.sol and deploy them as stated from point 7 - point 9.
	11. Once everything is set, go to frontend folder where our React App is stored. 
	12. run command `npm install` to install dependencies
	13. edit Config.json file inside Frontend/src/Config.json and change these two properties: **nodeUrl** with your ganache local url and **exchangeContractAddress** with the address you saved in point 6.
	14. Now run command `npm start`. That's it. Start trading!!




