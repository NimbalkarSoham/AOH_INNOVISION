"use client";
import React, { useState } from "react";

const RentalPricePredictor = () => {
  const [ageOfMachine, setAgeOfMachine] = useState(5);
  const [fuelConsumption, setFuelConsumption] = useState(15.0);
  const [rentalDuration, setRentalDuration] = useState(20);
  const [equipmentType, setEquipmentType] = useState("Harvester");
  const [equipmentName, setEquipmentName] = useState("Model A");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const predictPrice = async () => {
    const requestData = {
      age_of_machine: ageOfMachine,
      fuel_consumption: fuelConsumption,
      rental_duration: rentalDuration,
      equipment_type: equipmentType,
      equipment_name: equipmentName,
    };
    try {
      const response = await fetch("http://localhost:5000/price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const price = await response.json();

      setPredictedPrice(price.predicted_price);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Rental Price Prediction</h1>
      <p className="mb-4">
        Enter the details of the machine to predict the rental price.
      </p>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="ageOfMachine">
          Age of Machine
        </label>
        <input
          type="range"
          id="ageOfMachine"
          value={ageOfMachine}
          min={1}
          max={15}
          onChange={(e) => setAgeOfMachine(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{ageOfMachine}</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="fuelConsumption">
          Fuel Consumption
        </label>
        <input
          type="range"
          id="fuelConsumption"
          value={fuelConsumption}
          min={5.0}
          max={50.0}
          step={0.1}
          onChange={(e) => setFuelConsumption(parseFloat(e.target.value))}
          className="w-full"
        />
        <span>{fuelConsumption}</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="rentalDuration">
          Rental Duration (days)
        </label>
        <input
          type="range"
          id="rentalDuration"
          value={rentalDuration}
          min={1}
          max={90}
          onChange={(e) => setRentalDuration(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{rentalDuration}</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="equipmentType">
          Equipment Type
        </label>
        <select
          id="equipmentType"
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          className="w-full"
        >
          <option value="Harvester">Harvester</option>
          <option value="Plough">Plough</option>
          <option value="Seeder">Seeder</option>
          <option value="Sprayer">Sprayer</option>
          <option value="Tractor">Tractor</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="equipmentName">
          Equipment Name
        </label>
        <select
          id="equipmentName"
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
          className="w-full"
        >
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
          <option value="Model C">Model C</option>
          <option value="Model D">Model D</option>
          <option value="Model E">Model E</option>
        </select>
      </div>

      <button
        onClick={predictPrice}
        className="bg-[#6FB74C] text-white font-bold py-2 px-4 rounded"
      >
        Predict
      </button>

      {predictedPrice !== null && (
        <p className="mt-4">
          The predicted rental price is: ${predictedPrice?.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default RentalPricePredictor;
