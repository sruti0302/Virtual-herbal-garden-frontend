import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react"; // if you're using lucide

const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-[#f4f9f4] border border-[#cde0c3] rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center"
    >
      {/* Doctor Profile Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center"
      >
        <User className="w-10 h-10 text-green-700" />
      </motion.div>

      {/* Doctor Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold text-green-800">{doctor.name}</h2>
          <span className="text-green-600 font-bold text-sm">🌿 {doctor.rating}</span>
        </div>
        <p className="text-green-700">{doctor.qualification}</p>
        <p className="text-emerald-700 font-semibold mt-1">{doctor.experience} Years Experience</p>
        <p className="text-green-600 mt-1 text-sm">📍 {doctor.location}</p>

        <div className="mt-4">
          <p className="font-semibold mb-1 text-green-800">Specialities</p>
          <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {doctor.speciality}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Book Ayurvedic Appointment
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
        >
          Call 📞 {doctor.contact}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
