import React from "react";
import Card from "./Card";

function MyHerbs({ savedHerbs, onRemove }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">My Herbs</h1>
      {savedHerbs.length === 0 ? (
        <p className="text-gray-600">
          No herbs saved yet. Start bookmarking your favorite herbs!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedHerbs.map((herb, index) => (
            <Card
              key={index}
              image={herb.image}
              title={herb.title}
              type={herb.type}
              onBuyNow={() => alert(`Buying ${herb.title}`)}
              onSave={() => onRemove(herb)} // Allow removing herbs from saved list
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyHerbs;
