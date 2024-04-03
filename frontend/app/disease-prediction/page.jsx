"use client";
import Image from "next/image";
import React, { useState } from "react";

function DiseasePrediction() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict-disease", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to predict disease");
      }

      const data = await response.json();
      setPrediction(data.predicted_price);
      setDescription(data.description);
    } catch (error) {
      console.error("Error predicting disease:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-8">
      <h2 className="text-5xl font-serif">Disease Prediction</h2>
      <div className="feature-row flex flex-row gap-12 font-serif">
        <div className="flex flex-col items-center max-w-96">
          <Image src={"/ic1.png"} height={50} width={50} />
          <h2 className="text-3xl text-green-600">Easy Detection</h2>
          <p className="text-center text-lg text-gray-500">
            Just need to click and upload leaf image.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-96">
          <Image src={"/ic2.png"} height={50} width={50} />
          <h2 className="text-3xl text-green-600">Cause and Solution</h2>
          <p className="text-center text-lg text-gray-500">
            Provides cause and solution for the predicted disease.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-96">
          <Image src={"/ic3.png"} height={50} width={50} />
          <h2 className="text-3xl text-green-600">Large Plant Support</h2>
          <p className="text-center text-lg text-gray-500">
            Identifies 38 diseases among 14 plants.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="file"
          accept="image/*"
          className="form_input mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleFileChange}
        />
        <button type="submit" className="outline_btn">
          Predict
        </button>
      </form>
      {prediction && (
        <div className="w-1/2 text-lg font-mono bg-slate-100 py-7 px-14">
          <h3>
            <strong>Disease:</strong> {prediction}
          </h3>
          <p>Description:</p>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      )}
    </div>
  );
}

export default DiseasePrediction;
