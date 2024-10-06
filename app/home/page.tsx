"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "../../components/ui/drawer";
import { Search } from "lucide-react";
import GeminiResponseDisplay from "./GeminiResponseDisplay";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { storeInSession } from "../../lib/session";

// Function to fetch data from Gemini API
const fetchGeminiData = async (placeName: string) => {
  const apiKey = "AIzaSyCEbXFSHXoUtTGYJDKpcl81OQZpwSRMdyk";

  if (!apiKey || !placeName) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Your response will be in strict array of objects format, no other strings dont add \n in your responses only spaces, from left to right in this address string, mention cleanliness suggestions about the leftmost place you know about, if you dont know about the leftmost word, fetch info going to next right word. give an array of objects with key name as place name and value as info in your prompt response. string: ${placeName}.`;

    const result = await model.generateContent(prompt);
    if (result && result.response) {
      return result.response;
    }
  } catch (error) {
    console.error("Error fetching Gemini data:", error);
  }
  return "No details available.";
};

// Google Maps container styling
const containerStyle = {
  width: "80vw",
  height: "50vh",
  marginTop: "1rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  borderRadius: "10px",
};

// Default center coordinates (New York City)
const center = {
  lat: 40.748817,
  lng: -73.985428,
};

const MapComponent = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [addressDetails, setAddressDetails] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [placeInfo, setPlaceInfo] = useState<any>(null);
  const [showInfoButton, setShowInfoButton] = useState(false); // State to manage the button visibility
  const [showAddReportButton, setShowAddReportButton] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Hook for navigation

  // Fetch geocoding data from Google Maps API
  const fetchGeocodeData = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCh2leYtUyFnXzh9HVgHf5YUCiO3uu5AMA`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results[0]) {
      setAddressDetails(data.results[0].formatted_address);
      storeInSession("address", data.results[0].formatted_address);
      storeInSession(
        "nameOfPlace",
        data.results[0].address_components[0].long_name
      );
    } else {
      setAddressDetails("No details available");
    }
  };

  // Handle map click event
  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng) {
      setSelectedPlace({ lat, lng });
      storeInSession("lat", lat.toString());
      storeInSession("long", lng.toString());
      fetchGeocodeData(lat, lng);
      setShowInfoButton(true);
      setShowAddReportButton(true); // Show button when a location is clicked
    }
  };

  // Handle search for location
  const handleSearchLocation = async () => {
    const location = searchInputRef.current?.value;
    if (!location) return;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCh2leYtUyFnXzh9HVgHf5YUCiO3uu5AMA`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results[0]) {
      const newLat = data.results[0].geometry.location.lat;
      const newLng = data.results[0].geometry.location.lng;

      setMapCenter({ lat: newLat, lng: newLng });
      setSelectedPlace({ customText: data.results[0].formatted_address });
      setAddressDetails(data.results[0].formatted_address);
      setShowAddReportButton(true); // Show Add Report button after search
    } else {
      setAddressDetails("No results found");
      setShowAddReportButton(false); // Hide Add Report button if no result
    }
  };

  // Open the drawer and fetch place info from Gemini API
  const openDrawer = async () => {
    setDrawerOpen(true);

    if (addressDetails) {
      const info: any = await fetchGeminiData(addressDetails);

      // Log the entire Gemini API response
      console.log("Gemini API Response:", info);

      // Assuming the response contains the `candidates` and the desired text is inside `candidates[0].content.parts[0].text`
      if (info && info.candidates && info.candidates.length > 0) {
        const geminiText = info.candidates[0].content.parts[0].text;
        console.log("Extracted Text:", geminiText);

        // Set the placeInfo with the extracted text
        setPlaceInfo(geminiText);
      } else {
        console.log("No valid content in the response.");
        setPlaceInfo("No details available.");
      }
    }
  };

  // Remove selected marker
  const handleRemoveMarker = () => {
    setSelectedPlace(null);
    setShowInfoButton(false); // Hide button when marker is removed
  };

  // Function to handle button click and navigate to /info
  const handleInfoButtonClick = async () => {
    if (addressDetails) {
      const info: any = await fetchGeminiData(addressDetails);

      // Log the entire Gemini API response
      console.log("Gemini API Response:", info);

      // Assuming the response contains the `candidates` and the desired text is inside `candidates[0].content.parts[0].text`
      if (info && info.candidates && info.candidates.length > 0) {
        const geminiText = info.candidates[0].content.parts[0].text;
        console.log("Extracted Text:", geminiText);

        // Set the placeInfo with the extracted text
        setPlaceInfo(geminiText);

        storeInSession("placeInfo", JSON.stringify(geminiText)); // Store place info as a string

        // Redirect to the info page
        router.push("/info");
      } else {
        console.log("No valid content in the response.");
        setPlaceInfo("No details available.");
      }
    }
    // Redirect to /info
  };

  const handleAddReportClick = () => {
    router.push("/create");
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCh2leYtUyFnXzh9HVgHf5YUCiO3uu5AMA">
      <div className="px-8 mt-24">
        <div className="mb-4 flex gap-[5%]">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search location"
            className="border border-gray-300 p-2 h-[2.5rem] rounded w-[75%] mb-2"
          />
          <button
            onClick={handleSearchLocation}
            className="bg-black justify-center text-center flex w-[15%] text-white py-2 h-[2.5rem] px-1 rounded"
          >
            <Search />
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10}
          onClick={onMapClick}
        >
          {selectedPlace && (
            <>
              <Marker
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              />
              <InfoWindow
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                onCloseClick={handleRemoveMarker} // Hide button on close
              >
                <div className="rounded-[40px]">
                  <h3>{addressDetails || "Unknown Location"}</h3>
                  <button
                    onClick={openDrawer}
                    className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                  >
                    Show Place Info
                  </button>
                </div>
              </InfoWindow>
            </>
          )}
        </GoogleMap>

        {/* Animated button for redirecting to /info */}
        {showInfoButton && (
          <motion.button
            onClick={handleInfoButtonClick}
            className="mt-1 bg-black w-full text-white py-2 px-4 rounded"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Go to Info
          </motion.button>
        )}
        {showAddReportButton && (
          <motion.button
            onClick={handleAddReportClick}
            className="mt-1 bg-purple-700 w-full text-white py-2 px-4 rounded"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Add Report
          </motion.button>
        )}

        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerContent>
            <DrawerHeader>
              <h2>{addressDetails || "Place Info"}</h2>
              {placeInfo ? (
                <GeminiResponseDisplay responses={placeInfo} />
              ) : (
                <p>Loading information about this place...</p>
              )}
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
