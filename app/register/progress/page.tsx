"use client";
import React, { useState } from "react";
import IconButton from "../../../components/uics/IconButton";
import CombinedInput from "../../../components/uics/CombinedInput";
import SeparateInput from "../../../components/uics/SeperateInput";

import { Copy, Lock, Phone } from "lucide-react";
import ProgressBar from "../../../components/uics/RFprogressBar";
import { toast } from "react-toastify";
import { BASE_URL } from "../../env";
import { useRouter } from "next/navigation";

const languageMap: any = {
  Hindi: "hi",
  English: "en",
  Gujarati: "gj",
};

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (mobile: string) => {
    const phoneRegex = /^[1-9]\d{9}$/;
    return phoneRegex.test(mobile);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    const errors = [];

    // Validation checks
    if (!validatePhoneNumber(mobile)) {
      errors.push("Invalid phone number.");
    }

    if (!validatePassword(password)) {
      errors.push(
        "Password must be at least 8 characters long, with at least one capital letter and one number."
      );
    }

    if (!validateEmail(email)) {
      errors.push("Invalid email format.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error, { autoClose: 1000 }));
      setLoading(false);
      return;
    }

    const payload = {
      password: password,
      mobileNumber: parseInt(mobile),
      name: name,
      email: email,
      isSuspended: false,
      isPremium: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
    };

    try {
      // console.log(payload);

      const response = await fetch(`${BASE_URL}/auth/register-gm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: { message?: string } = await response.json(); // get the data in case of reponse - error or success

      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }

      toast.success(`Successfully created GM`, {
        autoClose: 1000,
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-3 py-8">
      <ProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {currentStep === 1 && (
        <>
          <div className="flex gap-2 text-left text-[40px]">
            <p className="text-[28px]">
              Select <span className="text-primary font-extrabold">Your</span>{" "}
              Language
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex text-[12px] bg-transparent border-secondary-foreground h-[3rem] border-[1px] rounded-sm overflow-hidden w-full max-w-md">
              {["Hindi", "English", "Gujarati"].map((lang) => (
                <button
                  key={lang}
                  className={`flex-1 px-4 py-2 ${
                    selectedLanguage === languageMap[lang]
                      ? "bg-primary text-white"
                      : "text-black"
                  }`}
                  onClick={() => changeLanguage(languageMap[lang])}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className="flex mt-2">
            <button className="w-screen" onClick={nextStep}>
              <IconButton text="NEXT" />
            </button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="flex flex-col gap-2 justify-center mt-4">
            <CombinedInput
              value={mobile}
              setValue={setMobile}
              variant="primary"
              icon={Phone}
              placeholder="Eg.(987****669)"
              label="Mobile"
            />
            <CombinedInput
              value={password}
              setValue={setPassword}
              variant="primary"
              icon={Lock}
              placeholder="*******"
              inputType="password"
              label="Password"
            />
          </div>
          <div className="flex justify-between mt-2">
            <button onClick={nextStep} className="w-screen">
              <IconButton text="NEXT" />
            </button>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <div className="flex flex-col gap-2 justify-center mt-4">
            <SeparateInput
              value={name}
              setValue={setName}
              variant="primary"
              placeholder="Eg.(RAHUL SINGH)"
              label="Name"
            />

            <SeparateInput
              value={email}
              setValue={setEmail}
              variant="primary"
              placeholder="Eg.(rahul@example.com)"
              label="Email"
            />
          </div>
          <div className="flex justify-between mt-2">
            <button onClick={handleRegister} className="w-screen">
              <IconButton text={loading ? "REGISTERING..." : "REGISTER"} />
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default RegisterPage;
