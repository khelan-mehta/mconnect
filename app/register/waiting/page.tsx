import Link from "next/link";
import React from "react";
import { Icons } from "../../../components/Icons";
import Image from "next/image";
import finalPageRF from "../../../public/finalPageRF.png";
const Page = () => {
  return (
    <div className="h-[70vh] py-12 gap-8 flex flex-col w-full justify-center items-center">
      <Image src={finalPageRF} alt="" width={250} height={500} />
      <div className="text-left">
        <p className="capitalize text-xl font-semibold">
          thank <span className="text-primary text-2xl font-bold">you</span> for{" "}
          <span className="text-primary text-2xl font-bold">joining</span> us!{" "}
        </p>
        <p className=" my-2 capitalize text-sm text-gray-500 ">
          we will get back to you once you are approved by admin!
        </p>
      </div>
      <Link
        className=" text-center bg-transparent w-full p-2 border-2 text-primary border-primary rounded-md "
        href={"/login"}
      > 
        LOGIN
      </Link>
    </div>
  );
};

export default Page;
