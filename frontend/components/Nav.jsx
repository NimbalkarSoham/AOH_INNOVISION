"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import MultilingualSelector from "./MultilingualSelector";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  const handleScrollToFeed = () => {
    const feedSection = document.getElementById("feed");
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center justify-between w-full mb-4 pt-3 px-4 bg-white">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={"/logo.png"}
          alt="Agrifarm logo"
          width={200}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex gap-6 items-center">
        {session?.user ? (
          <div className="flex gap-8 items-center">
            <Link href="/" className="nav-link">
              <button className="outline_btn text-gray-700 focus:outline-none">
                HOME
              </button>
            </Link>
            <Link href="/#feed" passHref>
              <button className=" nav-button" onClick={handleScrollToFeed}>
                PRODUCTS
              </button>
            </Link>

            <Link href="/scheme" className="nav-link">
              <button className=" nav-button">SCHEMES</button>
            </Link>
            <Link href={`/my-orders/${session?.user.id}`} className="nav-link">
              <button className=" nav-button">MY ORDERS</button>
            </Link>
            <Link href="/Support" className="nav-link">
              <button className=" nav-button">HELP</button>
            </Link>
            <Link href="/tool-predictor" className="nav-link">
              <button className=" nav-button">TOOL RECOMMENDATION</button>
            </Link>
            <Link href="/disease-prediction" className="nav-link">
              <button className=" nav-button">DISEASE CLASSIFICATION</button>
            </Link>
            <MultilingualSelector />
            <button
              type="button"
              onClick={signOut}
              className=" outline_btn text-sm text-gray-600 hover:text-black focus:outline-none"
            >
              Sign Out
            </button>
            <Link href={`/profile/${session?.user.id}`}>
              <Image
                src={session?.user.image}
                width={45}
                height={45}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="hidden sm:flex gap-6 items-center">
                  <Link href="/Support" className="nav-link">
                    <button className=" outline2_btn nav-button">HELP</button>
                  </Link>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className=" outline_btn text-sm text-gray-600 hover:text-black focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center">
        {session?.user ? (
          <div className="relative">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="Profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/#feed"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleScrollToFeed();
                  }}
                >
                  PRODUCTS
                </Link>

                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  CART
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  WISHLIST
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setToggleDropdown(false)}
                >
                  MY ORDERS
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-2 w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="text-sm text-gray-600 hover:text-black focus:outline-none"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
