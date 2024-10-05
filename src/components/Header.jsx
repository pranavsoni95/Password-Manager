import React from "react";
import {  Link } from "react-router-dom";


const Header = () => {
  return (
   
    <div className="flex justify-between items-center font-bold bg-green-400 h-12  text-[20px]  px-8">
      <div className="password-manager cursor-pointer ">
        <h2>Password Manager</h2>
      </div>
      <div>
        <ul className="header-list flex cursor-pointer gap-4 bg-green-400">
          <li  className=" hover:bg-green-300 h-10  px-2 rounded-lg items-center flex  "><Link to='/home'>Home</Link></li>
          <li className=" hover:bg-green-300 h-10 px-2 rounded-lg items-center flex  "><Link to='/about'>About</Link></li>
          <li className=" hover:bg-green-300 h-10 px-2 rounded-lg items-center flex"><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
    </div>
    
  );
};

export default Header;
