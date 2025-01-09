import React from "react";
import { NavLink } from "react-router-dom";

const ContactUs = () => {
    return (
        <div className="min-h-[89vh] bg-blue-50 flex flex-col lg:flex-row">

            {/* Main Content */}
            <div className="flex-1 p-5 lg:p-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
                    NIKHIL MOTORS
                </h1>
                <p className="text-center mb-8 text-gray-700">
                    Feel free to reach out to us using the details below!
                </p>

                {/* Cards Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Contact Numbers Card */}
                    <div className="bg-gray-100 shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
                        <div className="w-full">
                            <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
                                Contact Numbers
                            </h2>
                            <p className="text-gray-700 mb-2 font-medium text-center">
                                General: +91 7058600679
                            </p>
                            <p className="text-gray-700 mb-2 font-medium text-center">
                                Office: +91 9272111777
                            </p>
                        </div>
                        <div className="mt-4 w-full flex justify-center">
                            {/* SVG Below Contact Numbers */}
                            <img
                                className="w-24 h-24"
                                src="/Assets/Images/call.svg"
                                alt="Contact Icon"
                            />
                        </div>
                    </div>

                    {/* WhatsApp Group QR Code Card */}
                    <div className="bg-green-100 shadow-md rounded-lg p-6 text-center border border-green-200">
                        <h2 className="text-xl font-bold mb-4 text-green-700">
                            Join Our WhatsApp Group
                        </h2>
                        <p className="text-gray-700 mb-4 font-medium">
                            Scan the QR code below to join our WhatsApp group!
                        </p>
                        <div className="mt-8">
                            {/* Adjusted margin for QR code */}
                           <a href="https://chat.whatsapp.com/KlAdjB3KgIl8PUv3VQEy8g" target="blank_"> <img
                                className="w-40 h-40 mx-auto"
                                src="/Assets/Images/qr.jpeg"
                                alt="WhatsApp QR Code"
                            /></a>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="bg-yellow-100 shadow-md rounded-lg p-6 text-center border border-yellow-200">
                        <h2 className="text-xl font-bold mb-4 text-yellow-700">
                            Our Location
                        </h2>
                        <p className="text-gray-700 mb-2 font-medium">150, Kolhapur - Sangli Hwy</p>
                        <p className="text-gray-700 mb-2 font-medium">near Juna पाटिल ढाबा, Halondi</p>
                        <p className="text-gray-700 font-medium">Maharashtra 416116</p>
                        <iframe
                            className="mt-4 w-full h-40 border rounded"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.2366055831183!2d74.30603987481776!3d16.739467621607726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10109ce728891%3A0x93fd2aa9da4338c8!2sNikhil%20Motors!5e0!3m2!1sen!2sin!4v1699874369004!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                            title="Nikhil Motors Location"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
