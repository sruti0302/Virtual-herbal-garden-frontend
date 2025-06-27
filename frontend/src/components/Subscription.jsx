import React from "react";

const plans = [
  {
    title: "Free",
    price: "₹0",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Full Access to Interactive 3D Models",
      "Access expert-written blogs and vibrant community forums",
      "Start your herbal journey at no cost",
    ],
    // buttonText: "Get 7 days free trial",
    isPopular: false,
  },
  {
    title: "Pro",
    price: "₹149",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Get 2 personalized herbal consultations every month",
      "Receive exclusive wellness tips and healthy living guides",
      "Get access to Gardening Tips and Videos",
      "Enjoy special discounts on premium herbal products",
    ],
    buttonText: "Get 7 days free trial",
    isPopular: true,
  },
  {
    title: "Elite",
    price: "₹399",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "All that you get in Pro plan",
      "Unlimited expert consultations whenever you need",
      "Access advanced health trackers to monitor your wellness",
      "Free delivery of herbs, with express 1-day shipping",
    ],
    buttonText: "Get 7 days free trial",
    isPopular: false,
  },
];

const herbalistsplans = [
  {
    title: "Free",
    price: "₹0",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Create and showcase your professional herbalist profile",
      "List up to 3 of your herbal products for free",
      "Connect with a growing community of herbal enthusiasts",
    ],
    // buttonText: "Get 7 days free trial",
    isPopular: false,
  },
  {
    title: "Pro",
    price: "₹249",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Publish up to 10 premium herbal product listings",
      "Host and attend 2 exclusive webinars to boost your knowledge and visibility",
      "Get featured in our trusted herbalist network",
    ],
    buttonText: "Get 7 days free trial",
    isPopular: true,
  },
  {
    title: "Elite",
    price: "₹599",
    description: "Lorem ipsum dolor sit amet, consec tetur adipis elit",
    features: [
      "Unlimited herbal product listings to grow your business without limits",
      "Attend up to 10 expert-led webinars for deep learning and networking",
      "Premium visibility among top herbalists and users",
    ],
    buttonText: "Get 7 days free trial",
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <div className="py-16 px-6  text-center rounded-3xl w-[96vw] mx-auto my-8 ">
      <h2 className="text-4xl font-bold mb-4 text-[#3b5d3b]">
        Flexible Plans for Every Herbal Journey
      </h2>
      <p className="text-[#6b705c] mb-10 max-w-2xl mx-auto">
        Choose a plan that grows with your wellness goals — from exploring herbs
        to expert consultations and exclusive benefits.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-[#3b5d3b]">
        For Normal Users :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-15">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative p-8 rounded-2xl shadow-md border border-[#d2e3c8] transition duration-300 hover:shadow-xl hover:bg-[#e6f4ea] backdrop-blur-md ${
              plan.isPopular ? "border-[#7ca982]" : ""
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#7ca982] text-white text-xs px-3 py-1 rounded-bl-lg">
                Most popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-[#3b5d3b]">
              {plan.title}
            </h3>

            <div className="text-4xl font-bold mb-4 text-[#3b5d3b]">
              {plan.price}
              <span className="text-base font-medium">/month</span>
            </div>
            <button
              className={`w-full py-2 rounded-lg font-semibold text-sm transition ${
                plan.isPopular
                  ? "bg-[#7ca982] text-white"
                  : "bg-[#f3f9f4] text-[#3b5d3b] border border-[#d2e3c8]"
              }`}
            >
              {plan.buttonText}
            </button>
            <div className="mt-6 text-xs font-semibold text-[#7ca982]">
              BENEFITS
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#7ca982]">✔</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-[#3b5d3b]">
        For Herbalists :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {herbalistsplans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative p-8 rounded-2xl shadow-md border border-[#d2e3c8] transition duration-300 hover:shadow-xl hover:bg-[#e6f4ea] backdrop-blur-md ${
              plan.isPopular ? "border-[#7ca982]" : ""
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#7ca982] text-white text-xs px-3 py-1 rounded-bl-lg">
                Most popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-[#3b5d3b]">
              {plan.title}
            </h3>

            <div className="text-4xl font-bold mb-4 text-[#3b5d3b]">
              {plan.price}
              <span className="text-base font-medium">/month</span>
            </div>
            <button
              className={`w-full py-2 rounded-lg font-semibold text-sm transition ${
                plan.isPopular
                  ? "bg-[#7ca982] text-white"
                  : "bg-[#f3f9f4] text-[#3b5d3b] border border-[#d2e3c8]"
              }`}
            >
              {plan.buttonText}
            </button>
            <div className="mt-6 text-xs font-semibold text-[#7ca982]">
              BENEFITS
            </div>
            <ul className="mt-4 space-y-2 text-sm text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#7ca982]">✔</span> {feature}
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
