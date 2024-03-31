"use client";
import RentalPricePredictor from "@/components/PricePredictor";
import React, { useEffect, useState } from "react";

const orderDetails = ({ params }) => {
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  const fetchOrder = async () => {
    debugger;
    const data = await fetch(`http://localhost:3000/api/order/${params.id}`);
    const order = await data.json();
    setOrder(order);

    const productData = await fetch(
      `http://localhost:3000/api/product/${order.product}`
    );
    const product = await productData.json();
    setProduct(product);
    console.log(order);
    console.log(product);
  };

  useEffect(() => {
    fetchOrder();
  }, [params.id]);
  return (
    <div>
      <div className="details">Order details</div>
      <RentalPricePredictor product={product} order={order} />
    </div>
  );
};

export default orderDetails;
