// SPDX-License-Identifier: GPL-3.0
// Created By: ADARSH SHRIVASTAVA

pragma solidity >=0.7.0 <0.9.0;

import './Company.sol';

contract Exchange{
    address owner;
    CompanyEntry[] companies;

    struct CompanyEntry{
        string companyId; // 3 letter identifier, like REL for Reliance Industries etc
        address companyContract; // address of company's contract
    }

    struct CompanyPortfolio{
        string companyId;
        string name;
        uint rate;
        uint stocks;
    }


    constructor(){
        owner = msg.sender;
    }

    // once a company publishes their contract, they could then list themselve here throught 
    // this contract's owner
    function addCompany(address companyAddress, string memory companyId) public returns(bool){
        if(msg.sender != owner)
            revert('Operation Not Allowed');

        // check if id and address already exists
        for(uint i = 0; i < companies.length; i++){
            if(compareStrings(companies[i].companyId, companyId) || companies[i].companyContract == companyAddress){
                return false;
            }
        }
        companies.push(CompanyEntry(companyId, companyAddress));
        return true;
    }

    // returns arrays of (in sequence): comapanyId, companyName, rate, stocks hold
    function getUserPortfolio() public view returns(string[] memory, string[] memory, uint[] memory, uint[] memory){
        uint matchingCompanies = 0;
        for(uint i = 0; i < companies.length; i++){
            Company companyContract = Company(payable(companies[i].companyContract));
            if(companyContract.getUserHoldings(msg.sender) > 0){
                matchingCompanies++;
            }
        }

        string[] memory idList = new string[](matchingCompanies);
        string[] memory nameList = new string[](matchingCompanies);
        uint[]   memory rateList = new uint[](matchingCompanies);
        uint[]   memory stockList = new uint[](matchingCompanies);

        uint length = 0;
        uint listing = 0;
        for(uint i = 0; i < companies.length; i++){
            Company companyContract = Company(payable(companies[i].companyContract));
            if(companyContract.getUserHoldings(msg.sender) > 0){
                idList[length] = companies[i].companyId;
                nameList[length] = companyContract.getCompanyName();
                rateList[length] = companyContract.getCurrentRate();
                (listing, ) = companyContract.getUserListings(msg.sender);
                stockList[length] = companyContract.getUserHoldings(msg.sender) + listing;
                length++;
            }
        }

        return (idList, nameList, rateList, stockList);
    }

    // return values are arrays of (in sequence): id, name, stocks, currentRate
    function getCompanyListDetailed() public view returns(string[] memory, string[] memory, uint[] memory, uint[] memory){
        string[] memory idList = new string[](companies.length);
        string[] memory nameList = new string[](companies.length);
        uint[]   memory stockList = new uint[](companies.length);
        uint[]   memory rateList = new uint[](companies.length);

        for(uint i = 0; i < companies.length; i++){
            Company companyContract = Company(payable(companies[i].companyContract));
            idList[i] = companies[i].companyId;
            nameList[i] = companyContract.getCompanyName();
            stockList[i] = companyContract.getTotalStocks();
            rateList[i] = companyContract.getCurrentRate();
        }

        return(idList, nameList, stockList, rateList);
    }

    // returns in sequence: id, contractAddress, volume, rate, maxrate, minrate, desc, holdings, listings, listingprice
    function getCompanyDetail(string memory id) public view returns(string memory, string memory, address, uint, uint, uint, uint, string memory, uint, uint, uint){
        address adr = getCompanyContractAddressFromId(id);
        if(adr == address(0))
            revert('Invalid Company ID');
        Company sc = Company(payable(adr));
        uint listingStock = 0;
        uint listingRate = 0;
        (listingStock, listingRate) = sc.getUserListings(msg.sender);
        return(id, sc.getCompanyName(), adr, sc.getTotalStocks(), sc.getCurrentRate(), sc.getMaxRate(), sc.getMinRate(), sc.getDescription(), sc.getUserHoldings(msg.sender), listingStock, listingRate);
    }

    function buyStock(string memory companyId, uint maxRate, uint stocksToBuy) public payable{
        if(maxRate * stocksToBuy != weiToEther(msg.value))
            revert('Invalid Amount sent with request');

        address companyAddress = getCompanyContractAddressFromId(companyId);        
        if(companyAddress == address(0))
            revert('Invalid Company ID');

        Company companyContract = Company(payable(companyAddress));
        payable(companyAddress).transfer(msg.value);
        companyContract.buyStocks(msg.sender, stocksToBuy, maxRate);
    }

    function listStocks(string memory companyId, uint stocks, uint rate) public {
        address companyAddress = getCompanyContractAddressFromId(companyId);        
        if(companyAddress == address(0))
            revert('Invalid Company ID');
        
        Company companyContract = Company(payable(companyAddress));
        companyContract.listStocksForSale(msg.sender, stocks, rate);
    }

    function unlistStocks(string memory companyId) public {
        address companyAddress = getCompanyContractAddressFromId(companyId);        
        if(companyAddress == address(0))
            revert('Invalid Company ID');
        
        Company companyContract = Company(payable(companyAddress));
        companyContract.unlistStocksFromSale(msg.sender);
    }

    function getCompanyContractAddressFromId(string memory id) private view returns(address){
        for(uint i = 0; i < companies.length; i++){
            if(compareStrings(companies[i].companyId, id)){
                return companies[i].companyContract;
            }
        }
        return address(0);
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function weiToEther(uint weiVal) private pure returns (uint){
        return weiVal / 1000000000000000000;
    }

    function addFunds() public payable{

    }
}