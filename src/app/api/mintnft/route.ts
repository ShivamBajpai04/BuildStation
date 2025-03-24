import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import abi from "./abi";

// Contract address - replace with your actual contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export async function POST(req: Request) {
  try {
    // Get the authenticated user from Clerk
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    await connectDB();

    // Get user from database
    const dbUser = await User.findOne({ clerk_id: user.id });
    if (!dbUser?.wallet_address) {
      return NextResponse.json(
        { error: "User wallet address not found" },
        { status: 400 }
      );
    }

    // Get the request body
    const { tokenURI } = await req.json();
    if (!tokenURI) {
      return NextResponse.json(
        { error: "Token URI is required" },
        { status: 400 }
      );
    }

    // Connect to the blockchain
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS!, abi, wallet);

    // Mint the NFT
    const tx = await contract.mintNFT(dbUser.wallet_address, tokenURI);
    const receipt = await tx.wait();

    // Get the token ID from the transaction logs
    const tokenId = receipt.logs[0].topics[3];

    return NextResponse.json({
      success: true,
      transactionHash: receipt.hash,
      tokenId: tokenId,
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 });
  }
}
