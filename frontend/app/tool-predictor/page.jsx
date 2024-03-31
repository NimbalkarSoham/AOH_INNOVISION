"use client";
import React, { useState } from "react";

const RentalToolPredictor = () => {
  const [activity, setActivity] = useState("Plowing");
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState(1000);
  const [predictedEquipment, setPredictedEquipment] = useState("");

  const predictTool = async () => {
    const requestData = {
        Activity: activity,
        Duration: duration,
        Budget: budget,
    };
    try {
      const response = await fetch("http://localhost:5000/toolpredict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const tools = await response.json();
      console.log(tools);

      setPredictedEquipment(tools.Predicted_Tools);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tool Prediction</h1>
      <p className="mb-4">
        Enter the details to predict the tool best suited for the work.
      </p>

      <div className="mb-4">
      <label className="block mb-2" htmlFor="activity">
          Activity
        </label>
        <select
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full"
        >
          <option value="Plowing">Plowing</option>
          <option value="Planting">Planting</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Fertilizing">Fertilizing</option>
          <option value="Pest Control">Pest Control</option>
          <option value="Soil Testing">Soil Testing</option>
          <option value="Land Preparation">Land Preparation</option>
          <option value="Crop Monitoring">Crop Monitoring</option>
          <option value="Storage">Storage</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="duration">
          Duration
        </label>
        <input
          type="range"
          id="duration"
          value={duration}
          min={1}
          max={10}
          step={0.1}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full"
        />
        <span>{duration}</span>
      </div>

      <div className="mb-4">
      <label className="block mb-2" htmlFor="budget">
          Budget
        </label>
        <input
          type="range"
          id="budget"
          value={budget}
          min={100}
          max={2000}
          step={0.1}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          className="w-full"
        />
        <span>{budget}</span>
      </div>

      <button
        onClick={predictTool}
        className="bg-[#6FB74C] text-white font-bold py-2 px-4 rounded"
      >
        Predict
      </button>

      {predictedEquipment && (
        <p className="mt-4">
          The predicted Tools are: {predictedEquipment}
        </p>
      )}
    </div>
  );
};

export default RentalToolPredictor;
