"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import BuyProduct from "@/components/razorpay/BuyProduct";
// import '@app/product-details/product.css'

const page = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [myOrder, setMyOrder] = useState([]);
  const [Owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null);

  

  useEffect(() => {
    const fetchOrder = async () => {
      //debugger;
      const response = await fetch(`/api/product/${params.id}`, {
        method: "GET",
      });

      const data = await response.json();

      const ownerReq = await fetch(`/api/users/${data.creator}`, {
        method: "GET",
      });

      const owner = await ownerReq.json();

      setOwner(owner.name);
      console.log(owner);

      setMyOrder(data);
      //console.log(myOrder);
    };

    if (params.id) fetchOrder();
  }, [params.id]);

  const handleGoBack = () => {
    window.history.back(); // This will go back to the previous page
  };

  const handleVerification = async () => {
    debugger;
    try {
      console.log(params.id);
      const price = document.getElementById("price_string").value;
      if (price == "") {
        alert("Enter price string YZ");
      } else {
        const response = await fetch(`/api/product/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            price: price,
          }),
        });

        if (response.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    debugger;
    console.log(myOrder.brand);
    try {
      await fetch(`/api/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: "soldOut!",
        }),
      });

      console.log("Product status updated successfully");

      const response = await fetch(`/api/order/new`, {
        method: "POST",
        body: JSON.stringify({
          owner: myOrder.creator,
          customer: session.user.id,
          product: myOrder._id,
          shippingAddress: shipping_address,
          rate: myOrder.price,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="product-card">
        <div className="product-nav">
          <button
            type="button"
            className="close-button btn btn-danger"
            onClick={handleGoBack}
          >
            &#10006;
          </button>
        </div>
        <div className="product-image h-[500px] flex items-center">
          <img src={myOrder.image || ""} alt="Product image" />
        </div>
        <div className="product-info">
          <h3>
            <strong>{myOrder.name || ""}</strong>
          </h3>
          <br />
          <p>
            <strong>Description: </strong>
          </p>
          <p>{myOrder.description || ""}</p>
          <div className="product-details">
            <ul>
              <li>
                <strong>Owner:</strong>{" "}
                <Link href={`/profile/${myOrder.creator}`}>{Owner}</Link>
              </li>
              <li>
                <strong>Rate:</strong> {myOrder.price || ""}/Day
              </li>
              <li>
                <strong>Type: </strong>
                {myOrder.type || ""}
              </li>
              <li>
                <strong>Location:</strong> {myOrder.location || ""}
              </li>
              <li>
                <strong>Contact:</strong> {myOrder.contact || ""}
              </li>
              {session?.user.email == "2021.soham.nimbalkar@ves.ac.in" ? (
                <>
                  <li>
                    <strong>Enter price-string:</strong>
                  </li>
                  <input type="text" name="price_string" id="price_string" />
                </>
              ) : (
                <>
                  <li>
                    <strong>Enter Delivery Address:</strong>
                  </li>
                  <input
                    type="text"
                    name="shipping_address"
                    id="shipping_address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}
            </ul>
          </div>
          <div className="product-actions">
            {session?.user.email == "2021.soham.nimbalkar@ves.ac.in" ? (
              <button
                id="verify-btn"
                onClick={handleVerification}
                className="btn explore_btn"
              >
                Verify
              </button>
            ) : (
              <BuyProduct product_id={params.id} shipping_address={address}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
