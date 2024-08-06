const fs = require('fs');
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  try {
    const lockedAmount = ethers.utils.parseEther("0.001");

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplaceInstance = await Marketplace.deploy({
      value: lockedAmount,
    });

    await marketplaceInstance.deployed();

    console.log(
      `Marketplace with ${ethers.utils.formatEther(
        lockedAmount
      )} ETH deployed to ${marketplaceInstance.address}`
    );

    // Write contract address to a file
    fs.writeFileSync('contract-address.txt', marketplaceInstance.address);
  } catch (error) {
    if (error.code === "ETHER_NATIVE_REJECTED") {
      console.error("Transaction rejected. Check if the account has enough funds.");
    } else {
      console.error("Error deploying contract:", error);
    }
    process.exitCode = 1;
  }
}

// Run the deployment script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
