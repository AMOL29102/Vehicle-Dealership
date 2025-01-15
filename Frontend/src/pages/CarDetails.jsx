import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

function CarDetails() {
  const params = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`https://www.nikhilmotors.com/api/landingcar/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        );
        if (response.status === 200) {
          setCarData(response.data);
          console.log(response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError('Car not found'); // Set specific error message for 404
        } else {
          setError('Error fetching car details'); // General error message
        }
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false); // End loading regardless of success or error
      }
    };


    fetchCarDetails();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <main className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-bold mb-4">{carData.car.carcompany} {carData.car.carname}</h1>
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              className="rounded-t-lg"
            >
              {carData.images?.map((image, index) => (
                <div key={index} className="flex justify-center items-center overflow-hidden">
                  <img
                    src={image}  // Correctly use the image URL
                    alt={`Car ${carData.car.carname}`}
                    className="max-h-[20rem] rounded-t-lg object-contain"
                  />
                </div>
              ))}

            </Carousel>
          </div>

          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Vehicle Details</h2>
            <h3 className="text-lg font-semibold mb-2">Vehicle Information</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Vehicle Number :</span>
                <span>{carData.car.registernumber}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Vehicle Name:</span>
                <span>{carData.car.carname}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Vehicle Type:</span>
                <span>{carData.car.carmake}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Company:</span>
                <span>{carData.car.carcompany}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Color:</span>
                <span>{carData.car.carcolor}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Kilometers :</span>
                <span>{carData.car.kilometers}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Fitness Upto :</span>
                <span>{(new Date(carData.car.fitness_upto_date)).toLocaleDateString('en-GB')}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Registration Date :</span>
                <span>{(new Date(carData.car.registration_date)).toLocaleDateString('en-GB')}</span>
              </li>
              <li className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Price:</span>
                <span className="text-blue-500">₹ {carData.car.vehiclesellprice}</span>
              </li>
              <li className="flex justify-between items-start border-b pb-2">
                <span className="font-semibold">Description:</span>
                <div className="ml-2 w-full">
                  <p className="break-words whitespace-normal">{carData.car.description}</p>
                </div>
              </li>


            </ul>

            {/* Insurance Section */}
            {carData.insurance && (carData.insurance.insurancetenure) != 0 && <><h3 className="text-lg font-semibold mb-2 mt-4">Insurance Information</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">Insurance Company:</span>
                  <span>{carData.insurance.insurancecompany}</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">Policy Number:</span>
                  <span>{carData.insurance.insurancenumber}</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">Policy Tenure:</span>
                  <span>{carData.insurance.insurancetenure} years</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">Insurance Upto:</span>
                  <span>{(new Date(carData.insurance.insuranceenddate)).toLocaleDateString('en-GB')}</span>
                </li>
              </ul>
            </>
            }
            {/* Owner Section */}
            {/* <h3 className="text-lg font-semibold mb-2 mt-4">Owner Information</h3>
            <ul>
              <li className="flex justify-between items-center mb-2">
                <span className="font-semibold">Owner Name:</span>
                <span>{carData.owner.ownername}</span>
              </li>
              <li className="flex justify-between items-center mb-2">
                <span className="font-semibold">Phone Number:</span>
                <span>{carData.owner.ownerphone}</span>
              </li>
              <li className="flex justify-between items-center mb-2">
                <span className="font-semibold">Email:</span>
                <span>{carData.owner.owneremail}</span>
              </li>
              <li className="flex justify-between items-center mb-2">
                <span className="font-semibold">Address:</span>
                <span>{carData.owner.owneraddress}</span>
              </li>
            </ul> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CarDetails;
