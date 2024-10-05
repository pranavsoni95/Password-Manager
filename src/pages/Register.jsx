import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to your backend API for registration
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      // Handle successful registration
      console.log(response.data);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      // Handle error during registration
      console.error(error);
      alert(error.response.data.error || "Registration failed.");
    }
  };
  return (
    <div className="bg-green-200 flex justify-center rounded-xl mt-[90px] m-auto  items-center border-solid w-[40%] relative  h-[400px] border-black">
      
      <h1 className="absolute text-green-700 top-[20px] bg-green-200 left-[30%] px-2 text-3xl font-bold">
        Password Manager
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" flex gap-3  justify-center items-center">
          <label className="block font-bold text-xl mb-1 w-1/2">Name : </label>

          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            name="Name"
            value={formData.Name}
            className=" rounded-md border-solid w-3/4 px-2 py-[2px]"
          />
        </div>

        <div className=" flex gap-3 justify-center items-center">
          <label className="block font-bold text-xl mb-1 w-1/2">Email : </label>
          <input
            type="text"
            placeholder="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className=" rounded-md border-solid w-3/4 px-2 py-[2px]"
          />
        </div>

        <div className=" flex gap-3 justify-center items-center">
          <label className="block font-bold text-xl mb-1 w-1/2">Phone : </label>
          <input
            type="text"
            placeholder="Phone Number"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            className=" rounded-md border-solid w-3/4 px-2 py-[2px]"
          />
        </div>

        <div className=" flex gap-3 justify-center items-center">
          <label className="block font-bold text-xl mb-1 w-1/2">
            Password :{" "}
          </label>
          <input
            type="text"
            placeholder="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className=" rounded-md border-solid w-3/4 px-2 py-[2px]"
          />
        </div>
        <p className="absolute bottom-[90px] " href="">
          Already Registered?{" "}
          <a className="font-thin text-blue-500" href="">
            {" "}
            <Link to="/">Login</Link>
          </a>
        </p>
        <button
          type="submit"
          className="bg-green-800 flex hover:bg-green-700 text-white p-2 rounded mt-4 ml-auto"
        >
          SignIn
        </button>
      </form>
    </div>
  );
};

export default Register;
