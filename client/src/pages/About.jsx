import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-6">
        {/* Heading */}
        <header className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            About Our Flight Booking App
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your one-stop platform for booking flights with ease
          </p>
        </header>

        {/* Mission Section */}
        <section className="my-12 px-6">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            We aim to provide a seamless and user-friendly platform for
            travelers to book flights, compare prices, and plan their journeys
            effortlessly. Our goal is to offer competitive pricing, quick
            booking, and excellent customer service for every passenger.
          </p>
        </section>

        {/* Features Section */}
        <section className="my-12 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-600">
              Easy Flight Search
            </h3>
            <p className="mt-4 text-gray-600 text-center">
              Quickly find flights based on your travel dates, destination, and
              preferences.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-600">
              Secure Payment
            </h3>
            <p className="mt-4 text-gray-600 text-center">
              Safe and secure payment gateways to ensure your transactions are
              always protected.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-600">
              24/7 Customer Support
            </h3>
            <p className="mt-4 text-gray-600 text-center">
              Our dedicated customer support team is available around the clock
              to assist with your booking needs.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="my-12 px-6 text-center">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            If you have any questions or feedback, feel free to contact our
            support team.
          </p>
          <a
            href="abioyemichael4@gmail.com"
            className="mt-6 inline-block px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
