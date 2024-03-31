'use client'
import Feed from "@/components/Feed";
import React, { useEffect, useState } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});

  const fetchUser = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/`);
    const user = await response.json();
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (session?.user.id) fetchUser();
  }, [session?.user.id]);

  if (session?.user.email === "2021.soham.nimbalkar@ves.ac.in") {
    return <AdminPage />;
  }

  if (userData.isVerified === "not-verified") {
    return <KycForm />;
  }

  if (userData.isVerified === "under-verification") {
    toast.error("Note: Your account is under verification. Please wait until your account is verified by the Admin");
  }

  return (
    <section className="w-full  flex-col items-center">
      <ToastContainer />
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
