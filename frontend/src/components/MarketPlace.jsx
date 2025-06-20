import CardMP from "./cardMP";
import { useState } from "react";


const allPlants = [
  {
    id: 1,
    name: "Tulsi (Holy Basil)",
    photo: "https://i.pinimg.com/736x/f8/ec/f9/f8ecf93f3e9f86173faa92c7507e4d24.jpg",
    seller: "Green Leaf Nursery",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Aloe Vera",
    photo: "https://i.pinimg.com/736x/cc/fa/4f/ccfa4f423e877b85242b5c738c963fac.jpg",
    seller: "HerbKart",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Neem Plant",
    photo: "https://i.pinimg.com/736x/cf/4c/23/cf4c2322fa2243f278bc37fa2cdc88b5.jpg",
    seller: "AyurGreen",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Mint Leaves",
    photo: "https://i.pinimg.com/736x/64/82/47/64824751ec9ec9ec5bf7547820c5bc30.jpg",
    seller: "Mint Mart",
    rating: 4.0,
  },
  {
    id: 5,
    name: "Lavender",
    photo: "https://i.pinimg.com/736x/28/21/ff/2821ff2a7b86b7a97912fc432dc8c1fa.jpg",
    seller: "Purple Roots",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Lemongrass",
    photo: "https://i.pinimg.com/736x/2c/1f/c0/2c1fc011e77f054f56a2992815f8e332.jpg",
    seller: "AyurGreen",
    rating: 3.9,
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredPlants = allPlants.filter((plant) => {
    const matchesName = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = plant.rating >= minRating;
    return matchesName && matchesRating;
  });

  return (
    <div className="p-6 px-6 md:px-10 lg:px-16 font-poppins w-[95%]">

      {/* Banner */}
      <div className="bg-green-200 text-green-900 p-6 rounded-lg mb-6 shadow">
        <h1 className="text-3xl font-bold mb-1">🪴 Welcome to the Plant Marketplace</h1>
        <p className="text-sm">Browse and buy herbs, plants, and wellness greenery from trusted sellers!</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={minRating}
          onChange={(e) => setMinRating(parseFloat(e.target.value))}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4★ and up</option>
          <option value={4.5}>4.5★ and up</option>
          <option value={5}>5★ only</option>
        </select>
      </div>

      {/* Plant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <CardMP
              key={plant.id}
              name={plant.name}
              photo={plant.photo}
              seller={plant.seller}
              rating={plant.rating}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No plants found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}