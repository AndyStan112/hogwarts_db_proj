"use client";

import React, { useEffect, useState } from "react";

export default function FormPage() {
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/contact");
      const data = await response.json();
      setApiData(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", user_email: "", subject: "", message: "" });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <div>
      <section className="py-12 bg-gray-800 text-white text-center">
        <h1 className="text-4xl font-bold mt-12">Contact Us</h1>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <i className="fa fa-home text-3xl text-yellow-600"></i>
              <div>
                <h5 className="text-lg font-semibold">Castle Alnwick</h5>
                <p className="text-gray-600">Alnwick NE66 1NQ, UK</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fa fa-envelope-o text-3xl text-yellow-600"></i>
              <div>
                <h5 className="text-lg font-semibold">
                  mmcgonagall@hogwarts.edu.ac.uk
                </h5>
                <p className="text-gray-600">E-mail us your query</p>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name (required)"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-yellow-600"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Enter your e-mail (required)"
                value={formData.user_email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-yellow-600"
              />
              <input
                type="text"
                name="subject"
                placeholder="Enter your subject (required)"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-yellow-600"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:ring-yellow-600"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 border-2 border-yellow-600 text-yellow-600 font-semibold rounded-md hover:bg-yellow-600 hover:text-white transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
