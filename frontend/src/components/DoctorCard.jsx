// ✅ Updated DoctorCard.jsx with Dashboard theme
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorCard = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = () => {
    if (selectedDate) {
      setIsModalOpen(false);
      setBookingConfirmed(true);
      setTimeout(() => setBookingConfirmed(false), 3000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#e6f4ea] border border-[#d2e3c8] rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-[#f6f8ed] border-2 border-[#b7d7b0] flex items-center justify-center"
        >
          <User className="w-10 h-10 text-[#3b5d3b]" />
        </motion.div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-[#3b5d3b]">{doctor.name}</h2>
            <span className="text-[#6b705c] font-bold text-sm">🌿 {doctor.rating}</span>
          </div>
          <p className="text-[#6b705c]">{doctor.qualification}</p>
          <p className="text-[#7ca982] font-semibold mt-1">
            {doctor.experience} Years Experience
          </p>
          <p className="text-[#6b705c] mt-1 text-sm">📍 {doctor.location}</p>

          <div className="mt-4">
            <p className="font-semibold mb-1 text-[#3b5d3b]">Specialities</p>
            <div className="inline-block bg-[#f6f8ed] text-[#3b5d3b] px-3 py-1 rounded-full text-sm">
              {doctor.speciality}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3b5d3b] text-white px-4 py-2 rounded-md hover:bg-[#2f4e2f] transition"
          >
            Book Ayurvedic Appointment
          </motion.button>
          <button className="text-[#3b5d3b] font-semibold border border-[#b7d7b0] px-3 py-1 rounded-md hover:bg-[#f6f8ed] transition">
            ₹ {doctor.price}
          </button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold text-[#3b5d3b] mb-4">
              Select Appointment Date
            </h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Click to select a date"
              className="border border-[#d2e3c8] p-2 w-full rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#3b5d3b] text-white rounded-md hover:bg-[#2f4e2f]"
                onClick={handleBooking}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingConfirmed && (
        <div className="fixed bottom-24 right-6 bg-[#3b5d3b] text-white px-4 py-3 rounded-lg shadow-lg z-50">
          Your appointment has been booked ✅
        </div>
      )}
    </>
  );
};

export default DoctorCard;