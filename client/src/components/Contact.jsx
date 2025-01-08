import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to server or email)
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-6">
        {/* Header Section */}
        <header className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you! Reach out to us for any questions or
            feedback.
          </p>
        </header>

        {/* Contact Form Section */}
        <section className="my-12 px-6">
          <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-indigo-600 text-center">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-6 text-green-600 text-center">
                <p>
                  Your message has been sent successfully! We'll get back to you
                  soon.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
