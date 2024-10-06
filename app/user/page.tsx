"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";
import { LogOut, Settings, User2, Users2 } from "lucide-react";

import axios from "axios";
import { lookInSession, storeInSession } from "../../lib/session";
import { BASE_URL } from "../env";
import ManagersTable from "../../components/ManagersTable";
import { Button } from "../../components/ui/button";

const UserForm = () => {
  const router = useRouter();
  const [referCode, setReferCode] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [language, setLanguage] = useState("male");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isMaster, setIsMaster] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [retailer, setRetailer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<any>(null);

  useEffect(() => {
    const userId = lookInSession("userId");
    console.log(userId);

    setIsMaster(userId == "");
    if (!userId) {
      setError("Retailer ID not found in session");
      setLoading(false);
      return;
    }

    const fetchRetailer = async () => {
      try {
        const retailerResponse = await axios.get(`${BASE_URL}/gm/${userId}`);
        const data = retailerResponse.data;
        setRetailer(data);
        setMeasurements({
          Name: data.name || "",
          Email: data.email || "",
          "Suspension Status": data.isSuspended ? "Suspended" : "Active",
          "Premium Status": data.isPremium ? "Premium" : "Standard",
          "Verification Status": data.isVerified ? "Verified" : "Unverified",
          "Created At": new Date(data.createdAt).toLocaleDateString() || "",
        });
      } catch (err) {
        setError("Failed to fetch retailer details or orders");
        storeInSession(
          "errorText",
          "Failed to fetch retailer details or orders"
        );
        storeInSession("backLink", "/users");
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchRetailer();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", {
      email,
      gender,
      firstName,
      lastName,
      profileImage: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");

    router.push("/login");
  };

  return (
    <main
      className="profile-cont mt-md usr-cont self-center mx-auto px-1 "
      role="main"
    >
      <section className="user-info flex flex-col mt-24  px-1 ">
        <Button onClick={()=> {
          router.push("/user/reviews");
        }}>My Reviews</Button>
        <ManagersTable measurements={measurements} />
        <div className="menu-items mt-[10vh]">
          <div className="item flex justify-between items-center mt-[-20px]">
            {isMaster && (
              <>
                <Link href="/managers" className="text-black">
                  <div className="flex items-center">
                    <img src={"/managers.png"} className="w-8 aspect-square" />
                    <p className="capitalize text-sm font-semibold ml-4 tracking-wide">
                      Managers
                    </p>
                  </div>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
              </>
            )}
          </div>
          <div className="item flex justify-between items-center my-1">
            <Link href="user/settings" className="text-black">
              <div className="flex items-center">
                <img src={"/settings.png"} className="w-8 aspect-square" />
                <p className="capitalize text-sm font-semibold ml-5 tracking-wide">
                  Settings
                </p>
              </div>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </div>
        </div>

        <div className="flex w-full justify-between"></div>
      </section>
    </main>
  );
};

export default UserForm;
