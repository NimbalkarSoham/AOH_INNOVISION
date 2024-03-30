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
      <div className="flex flex-row  justify-between ">
        <div className="col1">
          <div className="flex items-start">
            {" "}
            {/* Changed from items-center */}
            <h1 className="head_text text-center">
              <span className="text-green1">AGRI</span>
              <span className="custom_farm_style">FARM</span>
            </h1>
          </div>
          <p className="message1">
            Empowering farmers with Morden Ecommerce Solution
          </p>
          <p className="message2">
            Explore, Transact and Thrive in Agriculture:Discover Quality
            <br />
            tools, Accurate Prediction and Growing Community.
          </p>
          <Link type="button" href="/#feed" className="explore_btn">
            Explore Now!
          </Link>
        </div>
        <div className="col2 mx-10">
          <Image src={"/Hero.png"} width={500} height={500} />
        </div>
      </div>
      <br />
      <br />

      <div style={{ overflow: "hidden" }}>
        <Banner />
        <Support />
        <Workflow />
        <div id="feed" className="flex justify-center">
        <Feed />
      </div>
      <Services />
      {/* <Stats /> */}
      <Equipments />
      </div>
      
    </section>
  );
};

export default LandingPage;
