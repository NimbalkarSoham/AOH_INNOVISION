"use client";
import React, { Suspense, useEffect, useState } from "react";
import Buy from "./Buy";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";

const ResolveOrder = ({ product, orderData, predictedPrice }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const makePayment = async ({ productId = null }) => {
    // "use server"
    const key = process.env.RAZORPAY_API_KEY;
    console.log(key);
    // Make API call to the serverless API
    const data = await fetch("http://localhost:3000/api/order-resolver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
        predictedPrice: predictedPrice,
      }),
    }); // 1. fetch product data..
    const { order } = await data.json();
    console.log(order.id);
    const options = {
      key: key,
      name: product.name,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Understanding RazorPay Integration",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log(response);

        const data = await fetch("http://localhost:3000/api/paymentverify", {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const res = await data.json();

        console.log("response verify==", res);

        if (res?.message == "success") {
          try {
            debugger;
            await fetch(`/api/product/${product._id}`, {
              method: "PUT",
              body: JSON.stringify({
                status: "returned",
              }),
            });
            console.log(orderData);

            await fetch(`/api/order/${orderData._id}`, {
              method: "PATCH",
              body: JSON.stringify({
                status: "Closed",
              }),
            });

            console.log("Product status updated successfully");

            console.log("We won");
          } catch (error) {
            console.log(error);
          }

          console.log("redirected.......");
          router.push("/");
        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Soham Nimbalkar",
        email: "soham.nimbalkar08@gmail.com",
        contact: "7977170174",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default ResolveOrder;
