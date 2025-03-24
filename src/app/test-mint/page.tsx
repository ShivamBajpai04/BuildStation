"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function TestMintPage() {
  const { isLoaded, userId } = useAuth();
  const [tokenURI, setTokenURI] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
    transactionHash?: string;
    tokenId?: string;
  } | null>(null);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenURI) return;

    console.log("Starting mint process...");
    setLoading(true);
    setResult(null);

    try {
      console.log("Sending request to /api/mintnft...");
      const response = await fetch("/api/mintnft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenURI }),
      });

      console.log("Response received:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to mint NFT");
      }

      setResult({ success: true, ...data });
    } catch (error) {
      console.error("Error during minting:", error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  console.log("Auth state:", { isLoaded, userId });

  if (!isLoaded) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!userId) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p>You need to be signed in to test the minting functionality.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test NFT Minting</h1>

      <form onSubmit={handleMint} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="tokenURI" className="block text-sm font-medium mb-1">
            Token URI
          </label>
          <input
            type="text"
            id="tokenURI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter token URI (e.g., ipfs://...)"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Minting..." : "Mint NFT"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 rounded border">
          {result.success ? (
            <div className="text-green-600">
              <h2 className="font-bold">Success!</h2>
              <p>Transaction Hash: {result.transactionHash}</p>
              <p>Token ID: {result.tokenId}</p>
            </div>
          ) : (
            <div className="text-red-600">
              <h2 className="font-bold">Error</h2>
              <p>{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
