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
            Company companyContract = Company(companies[i].companyContract);
            if(companyContract.getUserHoldings(msg.sender) > 0){
                matchingCompanies++;
            }
        }

        string[] memory idList = new string[](matchingCompanies);
        string[] memory nameList = new string[](matchingCompanies);
        uint[]   memory rateList = new uint[](matchingCompanies);
        uint[]   memory stockList = new uint[](matchingCompanies);

        uint length = 0;
        for(uint i = 0; i < companies.length; i++){
            Company companyContract = Company(companies[i].companyContract);
            if(companyContract.getUserHoldings(msg.sender) > 0){
                idList[length] = companies[i].companyId;
                nameList[length] = companyContract.getCompanyName();
                rateList[length] = companyContract.getCurrentRate();
                stockList[length] = companyContract.getUserHoldings(msg.sender) + companyContract.getUserListings(msg.sender);
                length++;
            }
        }

        return (idList, nameList, rateList, stockList);
    }

    function buyStock(string memory companyId, uint maxRate, uint stocksToBuy) public payable{
        Company companyContract = Company(getCompanyContractAddressFromId(companyId));
        companyContract.buyStocks{value: msg.value}(msg.sender, stocksToBuy, maxRate);
    }

    function getCompanyContractAddressFromId(string memory id) private view returns(address){
        for(uint i = 0; i < companies.length; i++){
            if(compareStrings(companies[i].companyId, id)){
                return companies[i].companyContract;
            }
        }
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}