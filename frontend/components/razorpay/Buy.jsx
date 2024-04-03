"use client";
import React, { useState } from "react";

const Buy = ({ makePayment }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-[10px]">
      <button
        onClick={() => {
          makePayment({ productId: "example_ebook" }); // put productId here. get it as a prop in this button
        }}
        disabled={isLoading}
        className={`bg-[#219653] text-white font-semibold mt-20 py-2 px-4 rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
};

export default Buy;
