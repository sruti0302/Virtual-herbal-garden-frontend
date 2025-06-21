import { useState } from "react";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: "AIzaSyA8_1LBdhfFkzEXqq4rOtfTvEjkejzR06k" });
const star="*";

const herbalFacts = [
  "Aloe Vera gel contains over 75 active ingredients including vitamins, enzymes, and amino acids.",
  "Turmeric contains curcumin, a powerful anti-inflammatory compound.",
  "Peppermint is not just refreshing but also helps relieve indigestion and headaches.",
  "Ashwagandha is known as Indian Ginseng and is used to manage stress and anxiety.",
  "Neem leaves are used in Ayurvedic medicine for their anti-bacterial and skin-healing properties."
];

export default function HerbIdentifier() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fact, setFact] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
  if (!selectedImage) return;
  setLoading(true);
  setResult("");

  try {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64ImageFile = reader.result.split(",")[1]; // Remove data prefix

      const contents = [
        {
          inlineData: {
            mimeType: selectedImage.type,
            data: base64ImageFile,
          },
        },
        {
          text: `Identify the herb or plant shown in the image. Provide the following details in a clean, bullet-point format:
• Common Name
• Scientific Name
• Brief Description
• Key Medicinal Uses (3 to 5 points)
Keep the total response within 200 words. Do not include any extra text outside the bullet points.Use | as delimeter to separate lines or bullets
If No herb or plant is visible in the image then just return the response as No herb or plant is visible in the image.`,
        },
      ];

      const ai = new GoogleGenAI({
        apiKey: "AIzaSyA8_1LBdhfFkzEXqq4rOtfTvEjkejzR06k",
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
      });

      const resultText = await response.text;
      setResult(resultText);

      const randomFact = herbalFacts[Math.floor(Math.random() * herbalFacts.length)];
      setFact(randomFact);

      setLoading(false);
    };

    reader.readAsDataURL(selectedImage);
  } catch (err) {
    console.error(err);
    setResult("Failed to identify the herb. Please try again.");
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full  flex flex-col items-center justify-center p-4">

      <div className="min-h-screen bg-white shadow-xl rounded-2xl p-8  w-full bg-gradient-to-br from-gray-50 to-gray-100">
          <h1 className="text-6xl font-extrabold text-green-800 mb-[-0.4rem] text-center">~BotanIQ~</h1>
          <p className="text-center text-green-600 mb-8 italic"><small>Your Pocket Herbalist, Powered by AI.</small></p>

          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">
          {/* Left Column: Content */}
          <div className="text-gray-700 text-lg space-y-4 w-[100%]">
            <p className="font-bold text-4xl text-emerald-800 mb-10"><strong>"Discover Nature with AI,,     </strong></p>
            <p className="font-mono ">
              <strong>Welcome to BotanIQ</strong> – an AI-powered plant and herb identification system designed to reconnect you with nature.
            </p>
            <p className="font-mono mt-12">
              Whether you're a gardening enthusiast, a student of Ayurveda, or just curious about the green wonders around you, HerbWise helps you discover detailed insights into plants simply by uploading a photo.
            </p>
            <p className="font-mono mt-12">
              It’s more than identification – it's a bridge between tradition and technology, powered by cutting-edge AI and a deep respect for the healing world of herbs.
            </p>
            <p className="font-bold text-green-700 font-mono italic mt-12 ">
              Snap a leaf • Upload the image • Learn the wisdom of nature
            </p>
            <details className="mt-6 bg-green-100 p-4 rounded-lg text-sm text-green-800">
          <summary className="font-semibold cursor-pointer">💡 How to get the best result?</summary>
          <ul className="list-disc list-inside mt-2">
            <li>Capture the herb in good lighting (preferably daylight).</li>
            <li>Avoid background clutter or multiple plants.</li>
            <li>Ensure the image is not blurry or overexposed.</li>
            <li>Leaf close-ups work better for identification.</li>
          </ul>
        </details>
          </div>

          {/* Right Column: Image Upload and Result */}
        <div>

          <div className=" flex items-center justify-center  ">
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-full  ">
    
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 mb-4"
    />

    {previewImage && (
      <div className="mb-4">
        <img
          src={previewImage}
          alt="Preview"
          className="rounded-xl w-64 h-72 object-cover mx-auto"
        />
      </div>
    )}

    <button
      onClick={handleSubmit}
      disabled={loading || !selectedImage}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg mb-2"
    >
      {loading ? "Identifying..." : "Identify Herb"}
    </button>

  </div>
</div>

        {result && (
          <div className="text-left font-semibold text bg-green-100 p-4 rounded-lg border border-green-200 text-emerald-800 whitespace-pre-wrap">
            {result.replaceAll("*" , " ").split("|").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        {fact && (
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h2 className="font-semibold text-yellow-700 mb-1">🌱 Fun Herbal Fact</h2>
            <p className="text-gray-700 text-sm">{fact}</p>
          </div>
        )}

        
        </div>
        </div>

      </div>
    </div>
  );
}
