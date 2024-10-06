"use client";
import { useState, useContext, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { Icons } from "../../components/Icons";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "react-toastify";
import { lookInSession, storeInSession } from "../../lib/session";
import { BASE_URL } from "../env";
import LoginImage from "../../public/page-2.png";
import Image from "next/image";
import CombinedInput from "../../components/uics/CombinedInput";
import { Copy, Lock, Phone } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/gm/login`, {
        email: mobileNumber,
        password,
      });

      // Check if the response status is 201 (Created)
      const { accessToken, refreshToken, id, name, isVerified } = response.data;

      // If the GM is verified, show success toast and proceed
      toast.success("Login successful", {
        autoClose: 1000,
      });

      // Store tokens and user info in session
      storeInSession("access_token", accessToken);
      storeInSession("refresh_token", refreshToken);
      storeInSession("userId", id);
      storeInSession("userName", name);

      // Redirect to the home page
      router.push("/home");
    } catch (error: any) {
      toast.error("Invalid Credentials", {
        autoClose: 1000,
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col h-[screen] px-2  items-center customScrollBar">
      <Image src={LoginImage} alt="" width={180} height={400} />
      <div className="flex w-full h-[260px] min-h-[260px] flex-col gap-2 justify-center mt-4">
        <CombinedInput
          value={mobileNumber}
          setValue={setMobileNumber}
          variant="primary"
          icon={Phone}
          placeholder="Eg. (khelan05@*******)"
          label="Email"
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
        <Button
          type="submit"
          variant={"outline"}
          className="p-2  h-[54px] min-h-[54px] bg-primary text-white mt-4 shadow-2xl font-bold text-sm rounded "
          onClick={handleSubmit}
        >
          LOGIN
        </Button>
        <Link className="text-center w-full  " href={"/register/progress"}>
          <p>Register First</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
