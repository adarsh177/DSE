// SPDX-License-Identifier: GPL-3.0
// Created By: ADARSH SHRIVASTAVA

pragma solidity >=0.7.0 <0.9.0;

contract Company{
    address ExchangeAddress;
    address owner; // saving owner so that only owner could change few details later
    string companyId; // it's an identifier for a company. 3 letter word. like REL for RELIANCE
    string companyName; // it's a general name
    uint totalStocks; // total stocks a company released in IPO
    uint currentRate; // rate at which last transaction took place
    uint minimumRate; // minimum rate of this company's stock in history
    uint maximumRate; // max rate of this company's stock in history
    string description; // company description for users to know it
    mapping(address => uint) holdingsMap; // mapping of user's address to their holdings
    StockListing[] listingsArray; // mapping of user's address to stocks they have listed

    struct StockListing{
        address stockOwner;
        uint rate;
        uint stocksCount;
    }

    event Transaction(
        address _to,
        address _from,
        uint count,
        uint rate
    );
    
    constructor() {
        ExchangeAddress = 0xDA0bab807633f07f013f94DD0E6A4F96F8742B53; // address of exchange contract
        owner = msg.sender;
        companyId = "REL"; // set your company id here, make sure it is different from other companies
        companyName = "Reliance Industries";
        totalStocks = 1000; // change this with number of stocks a company wants to create
        holdingsMap[owner] = totalStocks; // giving all the stocks to owner at first
        description = "Here goes my company description!"; // add description here, thought it could also be editied later through updateDescription()
        uint stocksToList = 600; // number of stocks you want to list, remaining are held by company itself
        currentRate = 1; // in ether, rate at which these stocks should be listed
        listStocksForSale(msg.sender, stocksToList, currentRate); // here in place of 600, add the
    }
    
    // lists stocks for sale and removes them from holdings
    function listStocksForSale(address _address, uint stocks, uint rate) public returns(bool){
        if(msg.sender != ExchangeAddress && msg.sender != owner)
            revert('Not Allowed');
        
        if(holdingsMap[_address] < stocks){
            // stocks given for listing are less than they hold
            return false;
        }

        holdingsMap[_address] -= stocks;
        listingsArray.push(StockListing(_address, rate, stocks));
        return true;
    }

    // unlists all stocks which were listed for sale and returns them to holdings
    function unlistStocksFromSale(address _address) public {
        if(msg.sender != ExchangeAddress && msg.sender != owner)
            revert('Not Allowed');
        
        for(uint i = 0; i < listingsArray.length; i++){
            if(listingsArray[i].stockOwner == _address){
                holdingsMap[listingsArray[i].stockOwner] += listingsArray[i].stocksCount;
                deleteListingEntry(i);
                unlistStocksFromSale(_address);
                break;
            }
        }
    }

    // returns number of stocks bought
    // it is a recursive function and the reason for this is 
    // because there might be chances that a person needs 100 stocks
    // and inside listingArray there are two listings of 40Stocks and 80Stocks
    // so It will have to take 40 From first and remaining 60 from other.
    function buyStocks(address _address, uint stockCount, uint maxRate) public payable{
        if(msg.sender != ExchangeAddress && msg.sender != owner)
            revert('Not Allowed');
        
        uint matchIndex;
        bool found = false;
        uint leastRate = maxRate + 1;

        if(stockCount == 0)
            return;

        for(uint i = 0; i < listingsArray.length; i ++){
            if(listingsArray[i].rate <= maxRate && listingsArray[i].rate < leastRate){
                matchIndex = i;
                leastRate = listingsArray[i].rate;
                found = true;
            }
        }
        
        if(!found){
            return;
        }

        if(listingsArray[matchIndex].stocksCount <= stockCount){
            // emiting event and state update
            TransactionHappened(msg.sender, listingsArray[matchIndex].stockOwner, listingsArray[matchIndex].stocksCount, listingsArray[matchIndex].rate);

            // ether transfer
            payable(listingsArray[matchIndex].stockOwner).transfer(etherToWie(listingsArray[matchIndex].stocksCount * listingsArray[matchIndex].rate));
            payable(_address).transfer(etherToWie(listingsArray[matchIndex].stocksCount * (maxRate - listingsArray[matchIndex].rate)));

            // records
            uint stocksBought = listingsArray[matchIndex].stocksCount;
            holdingsMap[_address] += listingsArray[matchIndex].stocksCount;
            deleteListingEntry(matchIndex);

            buyStocks(_address, stockCount - stocksBought, maxRate);
        }else{
            // emiting event and state update
            TransactionHappened(msg.sender, listingsArray[matchIndex].stockOwner, stockCount, listingsArray[matchIndex].rate);

            // ether transfer
            payable(listingsArray[matchIndex].stockOwner).transfer(etherToWie(stockCount * listingsArray[matchIndex].rate));
            payable(_address).transfer(etherToWie(stockCount * (maxRate - listingsArray[matchIndex].rate)));

            // records
            holdingsMap[_address] += stockCount;
            listingsArray.push(StockListing(listingsArray[matchIndex].stockOwner, listingsArray[matchIndex].rate, listingsArray[matchIndex].stocksCount - stockCount));
            deleteListingEntry(matchIndex);
        }
    }

    // this function is called everytime there is a transaction
    // it emits events and also updates few variables
    function TransactionHappened(address _to, address _from, uint stocksCount, uint rate) private{
        if(minimumRate > rate)
            minimumRate = rate;
        
        if(maximumRate < rate)
            maximumRate = rate;

        currentRate = rate;
        
        emit Transaction(_to, _from, stocksCount, rate);
    }

    // as there is no removeAtIndex function in array here
    // so I am simply swapping the last element of array with
    // the one which is to be deleted and just using pop to 
    // delete the last index
    // Tough this will shuffle the array but for this program
    // order of array isn't important
    function deleteListingEntry(uint indexToDelete) private{
        listingsArray[indexToDelete] = listingsArray[listingsArray.length - 1];
        listingsArray.pop();
    }

    // Only the owner of this contract could change the description
    function updateDescription(string memory newDescription) public {
        if(msg.sender == owner){
            description = newDescription;
        }else{
            revert('You do not have permission to change description');
        }
    }

    // FROM HERE ON WE WILL ADD NORMAL GETTERS AND SETTERS

    function getOwner() public view returns(address){
        return owner;
    }

    function getCompanyId() public view returns(string memory){
        return companyId;
    }

    function getCompanyName() public view returns(string memory){
        return companyName;
    }

    function getTotalStocks() public view returns(uint){
        return totalStocks;
    }

    function getMaxRate() public view returns(uint){
        return maximumRate;
    }

    function getMinRate() public view returns(uint){
        return minimumRate;
    }

    function getCurrentRate() public view returns(uint){
        return currentRate;
    }
    
    function getDescription() public view returns(string memory){
        return description;
    }

    function getUserHoldings(address _address) public view returns(uint){
        if(msg.sender != ExchangeAddress && msg.sender != owner)
            revert('Not Allowed');
        
        return holdingsMap[_address];
    }

    // returns stocks and price  at which they are listed
    function getUserListings(address _address) public view returns(uint, uint){
        if(msg.sender != ExchangeAddress && msg.sender != owner)
            revert('Not Allowed');
        
        uint totalListings = 0;
        uint rate = 0;
        for(uint i = 0; i < listingsArray.length; i++){
            if(listingsArray[i].stockOwner == _address){
                totalListings += listingsArray[i].stocksCount;
                rate += listingsArray[i].stocksCount * listingsArray[i].rate;
            }
        }

        if(totalListings > 0)
            rate /= totalListings;
        
        return (totalListings, rate);
    }

    function weiToEther(uint weiVal) private pure returns (uint){
        return weiVal / 1000000000000000000;
    }

    function etherToWie(uint weiVal) private pure returns (uint){
        return weiVal * 1000000000000000000;
    }

    function addFunds() public payable{

    }

    receive() external payable {
    }
}