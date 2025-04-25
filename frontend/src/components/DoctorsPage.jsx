import React, { useState } from "react";
import DoctorCard from "./DoctorCard";
import Footer from "./Footer";

const DoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = [
    {
      name: "Dr. Anjali Sharma",
      rating: "4.8",
      qualification: "BAMS, MD (Ayurveda)",
      experience: 18,
      location: "A-12, Green Park, New Delhi",
      speciality: "Heart & Lifestyle Disorders - Ayurvedic Therapies",
      contact: "9988-123-456",
      price: 799,
    },
    {
      name: "Dr. Ravi Shankar",
      rating: "4.7",
      qualification: "BAMS, PGD Panchakarma",
      experience: 22,
      location: "No. 45, MG Road, Bengaluru",
      speciality: "Panchakarma & Detox Therapies",
      contact: "7890-456-123",
      price: 999,
    },
    {
      name: "Dr. Meena Joshi",
      rating: "4.9",
      qualification: "BAMS, MD (Kayachikitsa)",
      experience: 19,
      location: "Sector 17, Vashi, Navi Mumbai",
      speciality: "Skin & Digestive Disorders - Ayurvedic Solutions",
      contact: "9123-654-321",
      price: 799,
    },
    {
      name: "Dr. Arvind Chauhan",
      rating: "4.6",
      qualification: "BAMS, Ayurvedic Oncology Expert",
      experience: 25,
      location: "Saket, New Delhi",
      speciality: "Cancer Care & Immunity Boosting via Ayurveda",
      contact: "7000-889-111",
      price: 1199,
    },
    {
      name: "Dr. Ritu Verma",
      rating: "4.8",
      qualification: "BAMS, PG Diploma in Gynaecology",
      experience: 16,
      location: "Koregaon Park, Pune",
      speciality: "Women's Health & Hormonal Imbalance (Ayurvedic Gynaecology)",
      contact: "8333-222-111",
      price: 599,
    },
    {
      name: "Dr. Harsh Vardhan",
      rating: "4.7",
      qualification: "BAMS, Yoga Therapist",
      experience: 20,
      location: "Banjara Hills, Hyderabad",
      speciality: "Joint Pain, Arthritis, and Lifestyle Disorders",
      contact: "9444-888-777",
      price: 799,
    },
  ];
  

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.speciality}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fdf9] py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          🌿 Healing Through Ayurveda
        </h1>
        <p className="text-green-600 text-lg">
          Discover natural care from certified Ayurvedic doctors
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
        <div className="flex items-center bg-[#f4f9f4] rounded-md shadow-sm border border-[#cde0c3] px-4 py-3 w-full md:w-80">
          <span className="text-green-600 mr-2">📍</span>
          <select className="flex-1 bg-transparent outline-none text-green-800">
            <option>Select City</option>
          </select>
        </div>
        <div className="flex items-center bg-[#f4f9f4] rounded-md shadow-sm border border-[#cde0c3] px-4 py-3 w-full md:w-96">
          <input
            type="text"
            placeholder="Search By Doctor Name or Disease"
            className="flex-1 bg-transparent outline-none text-green-800 placeholder-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctor Cards List */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))
        ) : (
          <p className="text-center text-green-700">
            No doctors found matching your search.
          </p>
        )}
      </div>
      
    </div>
  );
};

export default DoctorPage;
