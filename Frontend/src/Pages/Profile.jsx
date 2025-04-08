import React from "react";
import { useAuthContext } from "../Context/authContext";

export default function Profile() {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-xl font-semibold text-orange-600">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Your Profile</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">Name:</p>
            <p className="text-lg text-gray-800">{authUser.name}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">Email:</p>
            <p className="text-lg text-gray-800">{authUser.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 font-medium">Mobile:</p>
            <p className="text-lg text-gray-800">{authUser.mobileNo}</p>
          </div>

          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-500 font-medium">Address:</p>
            <p className="text-lg text-gray-800 text-right">{authUser.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
