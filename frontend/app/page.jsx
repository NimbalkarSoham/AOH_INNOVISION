"use client";
import Feed from "@/components/Feed";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminPage from "@/components/AdminPage";
import KycForm from "@/components/KycForm";
import Link from "next/link";
import Banner from "@/components/home/Banner/Banner";
import Support from "@/components/home/support/Support";
import Workflow from "@/components/home/workflow/Workflow";
import Services from "@/components/home/services/Services";
import Stats from "@/components/home/stats/Stats";
import Equipments from "@/components/home/equipments/Equipments";
const LandingPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const fetchUser = async () => {
    //debugger;
    const response = await fetch(`/api/users/${session?.user.id}/`);
    const user = await response.json();
    setUserData(user);
    //console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  useEffect(() => {
    if (session?.user.id) fetchUser();
  }, [session?.user.id]);

  if (session?.user.email == "2021.soham.nimbalkar@ves.ac.in") {
    return <AdminPage />;
  }

  if (userData.isVerified == "not-verified") {
    return <KycForm />;
  }

  return (
    <section className="w-full  flex-col items-center">
      {userData.isVerified == "under-verification" ? (
        <p className="text-red-600 w-fit">
          Note: Your account is under verification. Please wait until your
          account is verified by the Admin{" "}
        </p>
      ) : (
        <></>
      )}

      <div className="flex flex-col items-center">
        <Banner />
        <Support />
        <Workflow />
        <div id="feed" className="flex justify-center w-full">
          <Feed />
        </div>
        <Services />
        <Equipments />
      </div>
    </section>
  );
};

export default LandingPage;
