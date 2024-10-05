import React from "react";
import { MdDelete } from "react-icons/md";

const ShowPasswords = ({ Passwords = [] , DeletePassword }) => {

   

  return (
    <div className="flex flex-col justify-center items-center text-center bg-green-500 mt-4">
      <h2 className="text-2xl font-bold p-2">Stored Passwords</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-green-200">
            <th className="py-2   border-b">Website Name</th>
            <th className="py-2 px-4  border-b">Website URL</th>
            <th className="py-2 px-4 border-b">Password</th>
            <th className="py-2 m-0 p-0  border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Passwords.length > 0 ? (
            Passwords.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.websiteName}</td>
                <td className="border px-4 py-2">{entry.websiteUrl}</td>
                <td className="border px-4 py-2">{entry.password}</td>
                <td className="border text-2xl flex justify-center cursor-pointer py-2" onClick={()=>DeletePassword(entry._id)}><MdDelete /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
                No passwords stored.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPasswords;
