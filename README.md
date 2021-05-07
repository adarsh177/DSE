# Decentralized Stock Exchange
![DSE](https://adarshshrivastava.in/dse.png)
Build over Ethereum framework, this is a Decentralized Stock Exchange Pilot Project. There are a number of things to be incoprated in it as the possibilities are endless but this version of DSE contains some core features like:

 - User Identity management - using Portis
 - Listing Companies and offering IPOs
 - Trading - Buying/ Selling of stocks
 - Transparancy - All the transactions of a company's stocks are publically available and could be seen by anyone. BUT, taking in account the privacy of people, only their wallet addresses are visible and not their personal informations.
 - Refreshing UI and UX

## Technology Used

 - Ethereum - Backend using SmartContracts
 - ReactJS - Frontend
 - Web3.js - to interact with SmartContracts
 - Ganache - to create local ethereum blockchain for test deployment

## How to run
There are two ways to test this project

 1. **Hosted on my personal EC2**
	I have hosted a ganache blockchain server on my personal AWS EC2 instance and have connected it with this app for testing purposes. I might remove the server after a month so then you'll have to run it on your own local machine.
	To run it from my hosted server, visit https://dse.adarshshrivastava.in
	One thing to make sure before using this is that you must have a Portis wallet. If you don't have one, register from https://wallet.portis.io/ .
	Once you register and open your wallet, go to **more > Import Ethereum Wallet > Private Key** and enter any of the below listed keys. 
	This step is needed because this app is hosted on a test-self-hosted blockchain and not on Ethereum mainnet.
 2. **Run on your own local machine**
	1. Clone this repository to your local machine.
	2. Open Remix in your web browser and do stuff



	