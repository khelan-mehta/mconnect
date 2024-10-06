"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios"; // You'll use axios for the API call
import { lookInSession } from "../../lib/session";
import { BASE_URL } from "../env";

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "How do you find the odour of the water?",
    options: [
      "Pungent and Intolerable",
      "Bad but Tolerable",
      "Okayish",
      "Good",
      "Refreshing",
    ],
  },
  {
    question: "Is there the presence of algae and fungi in the water source?",
    options: ["None", "Less", "Noticeable", "Moderate", "Too Much"],
  },
  {
    question: "What is the colour of the water?",
    options: [
      "Black",
      "Blackish Grey",
      "Green",
      "Slightly Discoloured",
      "Colourless",
    ],
  },
  {
    question:
      "Do you find a division of dustbins into blue and green for dry and wet waste wherever garbage is disposed?",
    options: ["Never", "Rarely", "Sometimes", "Frequently", "Always"],
  },
  {
    question: "Approximate number of dustbins in the locality?",
    options: ["0-2", "3-5", "6-10", "10-15", "More than 15"],
  },
  {
    question: "How would you rate the frequency of garbage collection?",
    options: ["Very Poor", "Poor", "Moderate", "Good", "Excellent"],
  },
  {
    question:
      "How many pests (rats, cockroaches, termites) do you notice in the area?",
    options: ["None", "Very Few", "A Few", "Moderate Number", "A Lot"],
  },
  {
    question:
      "Rate the greenery of the locality based on the number of trees per unit area:",
    options: [
      "1/5 (Very Poor)",
      "2/5 (Poor)",
      "3/5 (Moderate)",
      "4/5 (Good)",
      "5/5 (Excellent)",
    ],
  },
];

const Questionnaire: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  ); // Store the selected answers
  const userId = lookInSession("userId");
  const nameOfPlace = lookInSession("nameOfPlace");
  const address = lookInSession("address");
  const lat = parseFloat(lookInSession("lat") || "");
  const long = parseFloat(lookInSession("long") || "");
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex + 1; // Store answer as 1 for the first option and 5 for the last
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitAnswers(); // Submit on the last question
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to map answers and call API
  const submitAnswers = async () => {
    const payload = {
      createdBy: userId, // Replace with actual user ID
      _add: address, // Replace with actual address
      _gc: { lat: lat, long: long }, // Replace with actual geo code
      _nm: nameOfPlace, // Replace with actual place name
      isSuspended: false,
      wod: answers[0],
      wafc: answers[1],
      wc: answers[2],
      dd: answers[3],
      dn: answers[4],
      ddistro: answers[5],
      pests: answers[6],
      greenery: answers[7],
    };

    try {
      const response = await axios.post(`${BASE_URL}/facts/create`, payload);
      console.log("Response: ", response.data);
      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting answers: ", error);
    }
  };

  return (
    <div className="w-full h-[80vh] mt-12 flex flex-col justify-center items-center p-4 bg-gray-100">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-300 rounded-full mb-4">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Container */}
      <motion.div
        key={currentIndex} // Unique key for each question for animations
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ type: "spring" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {questions[currentIndex].question}
        </h2>
        <div className="space-y-2">
          {questions[currentIndex].options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`text-lg text-center  p-2 rounded-lg cursor-pointer  ${
                answers[currentIndex] === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 "
              }`}
            >
              {option}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={previousQuestion}
            disabled={currentIndex === 0}
            className="bg-black rounded-full text-white px-2 py-2 disabled:bg-gray-400"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextQuestion}
            className="bg-black rounded-full text-white px-2 py-2"
          >
            {currentIndex === questions.length - 1 ? (
              <Check />
            ) : (
              <ChevronRight />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Questionnaire;
