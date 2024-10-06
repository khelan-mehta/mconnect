"use client";
import React, { useEffect, useState } from "react";
import { lookInSession, storeInSession } from "../../lib/session";
import GeminiResponseDisplay from "../home/GeminiResponseDisplay";
import { BASE_URL } from "../env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from "next/navigation";

const InfoPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [placeInfo, setPlaceInfo] = useState<any>(null);
  const [cleanlinessRating, setCleanlinessRating] = useState<string | null>(
    null
  );
  const router = useRouter();
  const fetchGeminiData = async (placeName: string) => {
    const apiKey = "AIzaSyCEbXFSHXoUtTGYJDKpcl81OQZpwSRMdyk";

    if (!apiKey || !placeName) return null;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Your response will be in strict array of objects format, no other strings dont add \n in your responses only spaces, from left to right in this address string, mention cleanliness facts about the leftmost place you know about, if you dont know about the leftmost word, fetch info going to next right word. give an array of objects with key name as place name and value as infoin your prompt response. string: ${placeName}.`;

      const result = await model.generateContent(prompt);
      if (result && result.response) {
        return result.response;
      }
    } catch (error) {
      console.error("Error fetching Gemini data:", error);
    }
    return "No details available.";
  };
  // Function to call the API and fetch cleanliness rating
  const fetchCleanlinessRating = async (
    _add: string,
    _gc: { lang: number; lat: number }
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}/facts/location/${_add}/${JSON.stringify(_gc)}`
      );
      const data = await response.json();
      if (data && data.payload) {
        setCleanlinessRating(data.payload); // Assuming cleanliness rating is inside the payload
      } else {
        setCleanlinessRating("Cleanliness rating not available.");
      }
    } catch (error) {
      console.error("Error fetching cleanliness rating:", error);
      setCleanlinessRating("Error fetching cleanliness rating.");
    }
  };

  useEffect(() => {
    const storedAddress = lookInSession("address");
    const storedPlaceInfo = lookInSession("placeInfo");
    const lat = lookInSession("lat");
    const lng = lookInSession("long");

    setAddress(storedAddress);
    setPlaceInfo(storedPlaceInfo ? JSON.parse(storedPlaceInfo) : null);

    // Fetch cleanliness rating only if address and coordinates are available
    if (storedAddress && lat && lng) {
      fetchCleanlinessRating(storedAddress, {
        lat: parseFloat(lat),
        lang: parseFloat(lng),
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start mt-[70px] px-3 py-6 min-h-[90vh] bg-gray-100">
      <div className="w-full max-w-[1200px] p-6 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold text-center mb-6">
          Place Information
        </h1>
        <div className="mt-6 p-4 bg-white rounded-md my-2 shadow">
          <h2 className="text-lg font-bold mb-2">Cleanliness Rating</h2>
          <p>
            {(Number(cleanlinessRating) - 1).toFixed(2) ||
              "Loading cleanliness rating..."}
          </p>
        </div>

        <div className="text-black">
          <h2 className="text-sm rounded-md font-semibold mb-4 bg-white border-purple-700 border-2 w-1/2 p-3 text-center">
            AI-based Reports
          </h2>
          <GeminiResponseDisplay responses={placeInfo} />
        </div>

        {/* Display the cleanliness rating */}
      </div>
    </div>
  );
};

export default InfoPage;
