"use client";

import { useState, useEffect } from "react";

// Function to fetch generated content using Gemini AI API
const fetchGeminiData = async (placeName: string) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyCEbXFSHXoUtTGYJDKpcl81OQZpwSRMdyk";

  if (!apiKey || !placeName) {
    console.error("API Key or Place Name is missing.");
    return "No details available.";
  }

  try {
    // Prepare the API URL (assuming the API endpoint and method you are using)
    const response = await fetch(`https://api.example.com/generative-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Tell me interesting facts about Astoria.`,
        model: "gemini-1.5-flash",  
      }),
    });

    const result = await response.json();

    // Ensure we return only the text from the first candidate's content
    if (result && result.candidates && result.candidates.length > 0) {
      const contentParts = result.candidates[0].content.parts;
      if (contentParts && contentParts.length > 0) {
        return contentParts[0].text; // Return the first part's text
      } else {
        return "No details available.";
      }
    } else {
      return "No details available.";
    }
  } catch (error) {
    console.error("Error fetching Gemini data:", error);
    return "Failed to fetch place details.";
  }
};

const PlaceInfo = ({ placeName }: { placeName: string }) => {
  const [placeDetails, setPlaceDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setLoading(true);
      const data = await fetchGeminiData(placeName);
      setPlaceDetails(data);
      setLoading(false);
    };

    if (placeName) {
      fetchPlaceDetails();
    }
  }, [placeName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!placeDetails) {
    return <div>No details available for Astoria Bl/37 St</div>;
  }

  return (
    <div>
      <h3>{placeName}</h3>
      <p>{placeDetails}</p>
    </div>
  );
};

export default PlaceInfo;