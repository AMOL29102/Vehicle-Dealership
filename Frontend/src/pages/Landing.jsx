import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Landing() {
  const [fuelType, setFuelType] = useState(null); // Default to null for no selection
  const [carType, setCarType] = useState(null); // Default to null for no selection
  const [cars, setCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  const navigate = useNavigate();

  const handleFuelTypeChange = (event) => {
    const selectedFuelType = event.target.value;
    setFuelType((prev) => (prev === selectedFuelType ? null : selectedFuelType));
  };

  const handleCarTypeChange = (event) => {
    const selectedCarType = event.target.value;
    setCarType((prev) => (prev === selectedCarType ? null : selectedCarType));
  };

  const handleSelectButton = (id) => {
    navigate(`/car/${id}`);
  };

  const resetFilters = () => {
    setFuelType(null);
    setCarType(null);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = {};
        if (fuelType) params.fuelType = fuelType; // Only add fuelType if set
        if (carType) params.carMake = carType; // Only add carType if set

        const response = await axios.get(`http://localhost:8000/`, { params });
        const data = response.data.carsWithImages;
        const carsData = data.map((car) => {
          const firstImage = car.imageurl[0]; // Assuming 'imageurl' is an array
          return {
            id: car.registrationnumber,
            imgSrc: firstImage,
            name: car.carname,
            number: car.registrationnumber,
            kilometers: "20,000KM",
            price: car.carprice,
          };
        });
        setCars(carsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, [fuelType, carType]);

  return (
    <div className="container mx-auto">
      <main className="mt-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
          {/* Toggle Button for Filters on mobile only */}
          <div className="ml-8 mr-8 mb-4 lg:hidden">
            <button
              onClick={toggleFilters}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters Section */}
          <div className={`bg-white rounded-md shadow-md p-4 mb-4 ml-8 mr-8 ${showFilters ? '' : 'hidden lg:block'}`}>
            <h2 className="text-xl font-bold mb-4">FUEL TYPE</h2>
            {["petrol", "diesel", "cng"].map((type) => (
              <div className="flex items-center" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="fuelType"
                  value={type}
                  checked={fuelType === type}
                  onChange={handleFuelTypeChange}
                  className="mr-2 cursor-pointer"

                />
                <label htmlFor={type} className="font-medium cursor-pointer">
                  {type.toUpperCase()}
                </label>
              </div>
            ))}
          </div>

          <div className={`bg-white rounded-md shadow-md p-4 mb-4 ml-8 mr-8 ${showFilters ? '' : 'hidden lg:block'}`}>
            <h2 className="text-xl font-bold mb-4">CAR TYPE</h2>
            {["car", "truck", "bike", "tempo"].map((type) => (
              <div className="flex items-center" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="carType"
                  value={type}
                  checked={carType === type}
                  onChange={handleCarTypeChange}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor={type} className="font-medium cursor-pointer">
                  {type.toUpperCase()}
                </label>
              </div>
            ))}
          </div>
          
          {/* Reset Filters Button */}
          <div className="ml-8 mr-8">
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="flex flex-wrap w-full lg:w-3/4 gap-2">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-md shadow-md p-4 flex flex-col justify-between w-full sm:w-1/3 lg:w-[32%]"
            >
              <div className="flex-grow">
                <img
                  src={car.imgSrc}
                  alt={car.name}
                  className="w-full rounded-md min-h-[60%]"
                />
                <h3 className="text-lg font-bold mt-4">{car.name}</h3>
                <p className="text-gray-600 mt-2">{car.number}</p>
                <p className="text-gray-600 mt-2">{car.kilometers}</p>
                <p className="text-green-500 font-bold mt-2">₹{car.price}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleSelectButton(car.id)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
