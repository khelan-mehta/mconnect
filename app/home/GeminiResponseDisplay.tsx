import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

interface GeminiResponse {
  [key: string]: string;
}

interface GeminiResponseDisplayProps {
  responses: string; // Ensure this is a string input
}

const GeminiResponseDisplay: React.FC<GeminiResponseDisplayProps> = ({
  responses,
}) => {
  // Check if responses is valid
  if (!responses) {
    return <p>No responses available.</p>;
  }

  // Clean the string to remove unnecessary characters
  const cleanedString = responses
    .replace(/[\n\t\r]/g, "")
    .replace(/\s*([{}\[\],])\s*/g, "$1");

  // Convert the cleaned string to a valid JSON format
  const jsonString = cleanedString.replace(/}\s*{/g, "},{");

  // Add brackets for valid JSON array format
  const validJsonString = `[${jsonString}]`;

  // Parse the cleaned string into an array of objects
  let resultArray: GeminiResponse[][] = [];

  try {
    resultArray = JSON.parse(validJsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return <p>Error parsing responses.</p>;
  }

  // Animation variants for the parent and children
  const listVariants = {
    hidden: { opacity: 0 }, // Initial state
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Items start hidden and lower on Y-axis
    visible: { opacity: 1, y: 0 }, // They become visible and move up to position
  };

  return (
    <div className="p-4  rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cleanliness Suggestions</h2>
      {/* Apply animation variants to the parent motion.div */}
      <motion.ul
        className="space-y-4"
        initial="hidden" 
        animate="visible"
        variants={listVariants}
      >
        {/* Access the first array element */}
        {resultArray[0]?.map((responseObj, index) => {
          // Use Object.entries directly on the responseObj
          const [title, description] = Object.entries(responseObj)[0];

          // Trim any invalid strings (like extra quotes) and ensure the title is clean
          const cleanedTitle = title.replace(/^"+|"+$/g, "").trim();
          const cleanedDescription = description.replace(/^"+|"+$/g, "").trim();

          return (
            // Animate each list item with motion.li and apply itemVariants
            <motion.li
              key={index}
              className=" border-purple-700 border-dashed border-2 p-4  rounded-lg shadow hover:shadow-lg transition-shadow duration-200 "
              variants={itemVariants}
            >
              <h3 className="font-semibold">{cleanedTitle}</h3>
              <p>{cleanedDescription}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default GeminiResponseDisplay;
