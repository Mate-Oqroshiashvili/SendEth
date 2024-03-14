const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const senderAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const receiverAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

const wallet = new ethers.Wallet(privateKey, provider);

async function transferEther() {
  try {
    const balance = await provider.getBalance(senderAddress);
    const balance2 = await provider.getBalance(receiverAddress);
    console.log(
      "Account balance before transaction:",
      ethers.utils.formatEther(balance),
      "ETH"
    );
    console.log(
      "Account balance before transaction:",
      ethers.utils.formatEther(balance2),
      "ETH"
    );

    const amount = ethers.utils.parseEther("1");

    const gasPrice = ethers.utils.parseUnits("20", "gwei");

    const tx = await wallet.sendTransaction({
      to: receiverAddress,
      value: amount,
      gasPrice: gasPrice,
    });

    console.log("Transaction hash:", tx.hash);

    await tx.wait();
  } catch (error) {
    console.error("Error:", error);
  }
}

transferEther();
