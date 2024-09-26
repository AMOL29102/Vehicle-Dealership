import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import EnquiryCard from '../components/EnquiryCard'; 

function CustomerEnquiry() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [enquiries, setEnquiries] = useState([
    {
      customerName: 'John Doe',
      customerPhone: '1234567890',
      description: 'My car needs servicing.',
      date: '2024-09-25T14:48:00.000Z'
    },
    {
      customerName: 'Jane Smith',
      customerPhone: '0987654321',
      description: 'I have an issue with my car registration.',
      date: '2024-09-24T09:15:00.000Z'
    },
    {
      customerName: 'Alice Johnson',
      customerPhone: '1122334455',
      description: 'I want to enquire about car insurance.',
      date: '2024-09-23T17:30:00.000Z'
    }
  ]);
   
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };


  // handle Upload and handle submit functions to be updated for integration 
  // only static data is available for now
  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(customerPhone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/submit', {
        customerName,
        customerPhone,
        description,
        date: new Date() 
      });
      
      await handleUpload();
      
      setEnquiries([...enquiries, {
        customerName,
        customerPhone,
        description,
        date: new Date(),
      }]);

      toast.success("Enquiry submitted successfully!");

      setCustomerName('');
      setCustomerPhone('');
      setDescription('');
    } catch (error) {
      toast.error("An error occurred while saving details");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="p-8 shadow-lg rounded-lg bg-gray-100">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-teal-700">Customer Enquiry Form</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="customerName" className="block text-gray-700 text-sm font-semibold mb-2">Customer Name</label>
              <input
                type="text"
                id="customerName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-300"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-semibold mb-2">Phone No.</label>
              <input
                type="text"
                id="customerPhone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-300"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description of Enquiry</label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-teal-300 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>

      <div className="my-12 border-t-2 border-teal-300"></div> {/* Divider between form and cards */}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Customer Enquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enquiries.map((enquiry, index) => (
            <EnquiryCard
              key={index}
              customerName={enquiry.customerName}
              customerPhone={enquiry.customerPhone}
              description={enquiry.description}
              date={enquiry.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerEnquiry;