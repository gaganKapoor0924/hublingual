import React from "react";
import "./style.css";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponseMsg(data.message);
      setFormData({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (error) {
      console.log(error);
      setResponseMsg("Something went wrong!");
    }
  };

  return (
    <div className="contact_form">
      <div className="contact_info">
        <h2>Get In Touch</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            name="name"
            id="name"
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your Name"
            value={formData.email}
            name="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            placeholder="Enter your Number"
            value={formData.phone}
            name="phone"
            id="phone"
            onChange={handleChange}
          />
          <label htmlFor="course">Courses:</label>
          <input
            type="text"
            placeholder="Enter your Course"
            value={formData.course}
            name="course"
            id="course"
            onChange={handleChange}
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button className="btn-submit">Submit</button>
        </form>
        {responseMsg && <p>{responseMsg}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
