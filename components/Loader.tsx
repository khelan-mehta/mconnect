"use client";
import { redirect } from "next/navigation";
import Router from "next/router";
import React, { useEffect, useState } from "react";

// import "./Loader.css";

const Loader = () => {
  let error = null;

  return (
    <div>
      <div className="flex fixed flex-col h-screen w-screen bg-white z-50 top-0 left-0 justify-center items-center">
        <img src="/icon-only.png" className="w-4/6 aspect-square" />
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
        <div className="fixed top-0 left-0 border p-4 m-4">{error}</div>
      </div>
    </div>
  );
};

export default Loader;
