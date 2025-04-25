import React from "react";

const plans = [
  {
    title: "Basic",
    price: "$0",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Full Access to Landingfolio",
      "100 GB Free Storage",
      "Unlimited Visitors",
      "10 Agents",
      "Live Chat Support",
    ],
    buttonText: "Get 14 days free trial",
    isPopular: false,
  },
  {
    title: "Pro",
    price: "$49",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Full Access to Landingfolio",
      "100 GB Free Storage",
      "Unlimited Visitors",
      "10 Agents",
      "Live Chat Support",
    ],
    buttonText: "Get 14 days free trial",
    isPopular: true,
  },
  {
    title: "Exclusive",
    price: "$99",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Full Access to Landingfolio",
      "100 GB Free Storage",
      "Unlimited Visitors",
      "10 Agents",
      "Live Chat Support",
    ],
    buttonText: "Get 14 days free trial",
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="py-16 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold mb-4 text-green-600">
        Plans that scale with business
      </h2>
      <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
        Clarity gives you the blocks & components you need to create a truly
        professional website, landing page or admin panel for your SaaS.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            className={`relative p-8 rounded-2xl shadow-md border border-green-200 transition duration-300 hover:shadow-xl hover:bg-green-100/30 backdrop-blur-md ${
              plan.isPopular ? "border-green-500" : ""
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                Most popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-green-600">
              {plan.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
            <div className="text-4xl font-bold mb-4 text-green-600">
              {plan.price}
              <span className="text-base font-medium">/mo/user</span>
            </div>
            <button
              className={`w-full py-2 rounded-lg font-semibold text-sm transition ${
                plan.isPopular
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {plan.buttonText}
            </button>
            <div className="mt-6 text-xs font-semibold text-gray-500">
              BEST FOR FREE
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-600">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
