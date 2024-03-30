"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

  return (
    <nav className="flex-between w-full mb-4 pt-3 px-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/logo.png"}
          alt="Agrifarm logo"
          width={200}
          height={30}
          className="object-contain"
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-12 ">
            <div className="flex gap-20 flex-center">
              <Link href="/" className="black_btn">
                HOME
              </Link>

              <Link href="/#feed" className="black_btn">
                PRODUCTS
              </Link>

              <Link href="/weather" className="black_btn">
                WEATHER
              </Link>

              <Link href="/scheme" className="black_btn">
                SCHEMES
              </Link>

              {/* <Link href="/" 
                className="black_btn">
                    CART
                </Link>

                <Link href="/" 
                className="black_btn">
                    WISHLIST
                </Link> */}

              <Link
                href={`/my-orders/${session?.user.id}`}
                className="black_btn"
              >
                MY ORDERS
              </Link>

              <MultilingualSelector />
            </div>

            <div className="flex gap-5 items-center">
              <button type="button" onClick={signOut} className="outline_btn">
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
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="outline_btn"
                  >
                    Sign In
                  </button>
                </>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  HOME
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  PRODUCTS
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  WEATHER
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  CART
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  WISHLIST
                </Link>

                <Link
                  href="/"
                  className="dropdown_link"
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
                  className="mt-5 w-full outline_btn"
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
                  className="outline_btn"
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
