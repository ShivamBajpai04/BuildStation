import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import abi from "./abi";

// Contract address - replace with your actual contract address
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export async function POST(req: Request) {
  try {
    console.log("API route: Starting mint process");

    // Get the authenticated user from Clerk
    const { userId } = await auth();
    console.log("API route: User ID:", userId);

    if (!userId) {
      console.log("API route: No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    console.log("API route: Connecting to MongoDB");
    await connectDB();

    // Get user from database
    console.log("API route: Finding user in database");
    const dbUser = await User.findOne({ clerk_id: userId });
    console.log("API route: Database user:", dbUser);

    if (!dbUser?.wallet_address) {
      console.log("API route: No wallet address found");
      return NextResponse.json(
        { error: "User wallet address not found" },
        { status: 400 }
      );
    }

    // Get the request body
    const { tokenURI } = await req.json();
    console.log("API route: Token URI:", tokenURI);

    if (!tokenURI) {
      console.log("API route: No token URI provided");
      return NextResponse.json(
        { error: "Token URI is required" },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.WALLET_PRIVATE_KEY) {
      console.log("API route: No private key found in environment");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!CONTRACT_ADDRESS) {
      console.log("API route: No contract address found in environment");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Connect to the blockchain
    console.log("API route: Connecting to blockchain");
    const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);

    // Ensure private key is properly formatted (remove '0x' prefix if present)
    const privateKey = process.env.WALLET_PRIVATE_KEY.replace(/^0x/, "");
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log("API route: Contract address:", CONTRACT_ADDRESS);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    // Mint the NFT
    console.log("API route: Minting NFT");
    const tx = await contract.safeMint(dbUser.wallet_address, tokenURI);
    console.log("API route: Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("API route: Transaction receipt:", receipt);

    // Get the token ID from the transaction logs
    const tokenId = receipt.logs[0].topics[3];
    console.log("API route: Token ID:", tokenId);

    return NextResponse.json({
      success: true,
      transactionHash: receipt.hash,
      tokenId: tokenId,
    });
  } catch (error) {
    console.error("API route: Error minting NFT:", error);
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 });
  }
}
