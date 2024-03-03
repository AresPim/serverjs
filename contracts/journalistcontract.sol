// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// journalistcontract gère les frais de publication et les pénalités pour les journalistes
contract journalistcontract {
    address public owner; //L'adresse du propriétaire du contrat est enregistrée dans la variable owner
    mapping(address => uint256) public journalistBalances;
    uint256 public publicationFee;
    uint256 public penaltyAmount;

    event Publication(address indexed journalist, uint256 amount);
    event Penalty(address indexed journalist, uint256 amount);

    //exécuté une seule fois lors du déploiement du contrat.
    constructor(uint256 _publicationFee, uint256 _penaltyAmount) {
        owner = msg.sender;
        publicationFee = _publicationFee;
        penaltyAmount = _penaltyAmount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function publish() external payable {
        require(msg.value >= publicationFee, "Insufficient publication fee");
        require(journalistBalances[msg.sender] >= penaltyAmount, "Insufficient balance to cover penalty You can't publish now!");
    
        // Si le solde est suffisant, déduisez la pénalité du solde du journaliste
        journalistBalances[msg.sender] -= penaltyAmount;
    
        // Ajoutez le montant de la publication au solde du journaliste
        journalistBalances[msg.sender] += msg.value;
    
        emit Publication(msg.sender, msg.value);
    }


    function penalize(address journalist) external onlyOwner {
        require(journalistBalances[journalist] > 0, "Journalist has no balance to penalize");
        payable(journalist).transfer(penaltyAmount);
        journalistBalances[journalist] -= penaltyAmount;
        emit Penalty(journalist, penaltyAmount);
}

}
