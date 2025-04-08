import React from 'react';
import Navbar from '../Components/Navbar';
import { Link } from "react-router-dom";
import DonationImg from '../assets/boy.webp'

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
      <Navbar />


      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">

        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Don’t Waste Food, <span className="text-orange-600">Share It.</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Join our community in reducing food waste and feeding the needy. Every leftover meal can bring a smile to someone’s face.
          </p>
          <div className="space-x-4">
            <Link to='/donar'>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-medium shadow-md transition">
              Donate Food
            </button>
            </Link>
            <Link to='/receive'>
            <button className="bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-2xl font-medium shadow-sm transition">
              Request Food
            </button>
            </Link>
          </div>
        </div>


        <div className="mt-10 md:mt-0">
          <img
            src={DonationImg}
            alt="Food donation"
            className="w-[350px] md:w-[450px]"
          />
        </div>
      </div>


      <div className="text-center py-10 px-4 bg-white border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-orange-700">
          “If you can’t feed a hundred people, then feed just one.” – Mother Teresa
        </h2>
      </div>
    </div>
  );
}
