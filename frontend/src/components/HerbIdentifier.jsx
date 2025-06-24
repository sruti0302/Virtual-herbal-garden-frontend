import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { CheckCircle } from "lucide-react";


const ai = new GoogleGenAI({ apiKey: "AIzaSyA8_1LBdhfFkzEXqq4rOtfTvEjkejzR06k" });
const star="*";

const herbalFacts = [
  "Aloe Vera gel contains over 75 active ingredients including vitamins, enzymes, and amino acids.",
  "Turmeric contains curcumin, a powerful anti-inflammatory compound.",
  "Peppermint is not just refreshing but also helps relieve indigestion and headaches.",
  "Ashwagandha is known as Indian Ginseng and is used to manage stress and anxiety.",
  "Neem leaves are used in Ayurvedic medicine for their anti-bacterial and skin-healing properties."
];

const steps = [
    "Capture or upload a clear image of the herb showing leaves, flowers, or distinctive features",
    "Our botanical AI analyzes the plant morphology against thousands of species",
    "Get detailed information including scientific name, medicinal properties, and growing conditions",
    "Learn about traditional uses and fascinating folklore surrounding the plant",
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
    <>
          <div className="my-8 border-t border-green-200" />
    <div className="min-h-screen w-full  flex flex-col items-center justify-center p-4">


      <div className="min-h-screen bg-white  rounded-2xl p-8  w-full ">
          <h1 className="text-6xl font-extrabold text-[#45ad01] mb-[-0.05rem] text-center">BotanIQ</h1>
          <p className="text-center text-[#45ad01] mb-8 italic font-semibold"><small>Your Pocket Herbalist, Powered by AI.</small></p>

          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">
          {/* Left Column: Content */}
          <div className="flex flex-col items-center text-gray-700 text-lg space-y-4 w-[100%] ">
            <img src="https://cdn-icons-png.flaticon.com/512/5382/5382875.png" alt="" className="w-20 md:w-25 sm:w-22 "/>
            <p className="font-bold text-4xl text-[#54bc11] mb-10"><strong>"Let's Identify Your Herb,,     </strong></p>
            {/* <p>
              <strong>Welcome to BotanIQ</strong> – an AI-powered plant and herb identification system designed to reconnect you with nature.
            </p>
            
            <p className="mt-12">
              It’s more than identification – it's a bridge between tradition and technology, powered by cutting-edge AI and a deep respect for the healing world of herbs.
            </p>
            <p className="font-bold text-green-700 font-mono italic mt-12 ">
              Snap a leaf • Upload the image • Learn the wisdom of nature
            </p> */}

            <div className="flex flex-col  rounded-lg bg-green-100 p-6 shadow-md w-full ">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
              <h2 className="font-bold text-2xl text-gray-700">The Identification Process</h2>
              </div>
              
              <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-5">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
            </div>
            

        {fact && (
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h2 className="font-semibold text-yellow-700 mb-1">🌱 Fun Herbal Fact</h2>
            <p className="text-gray-700 text-sm">{fact}</p>
          </div>
        )}
          </div>

          {/* Right Column: Image Upload and Result */}
        <div>

          <div className=" flex items-center justify-center  ">
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-full mb-2 ">
    
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 mb-4"
    />
    {!previewImage && (
      <div className="mb-4 rounded-xl w-64 h-72 border-2 border-gray-300 text-center pt-[10%]">
        No image selected. Please upload an image of a herb or plant.
      </div>
    )}

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

{!result && (
          <div className="min-h-70 font-semibold bg-green-100 p-4 rounded-lg border border-green-200 text-emerald-800 whitespace-pre-wrap">
     
          💡 How to get the best result?
          <ul className="list-disc list-inside mt-2">
            <li>Capture the herb in good lighting (preferably daylight).</li>
            <li>Avoid background clutter or multiple plants.</li>
            <li>Ensure the image is not blurry or overexposed.</li>
            <li>Leaf close-ups work better for identification.</li>
          </ul>
 
          </div>
        )}


  {result && (
          <div className="text-left font-semibold bg-green-100 p-4 rounded-lg border border-green-200 text-emerald-800 whitespace-pre-wrap">
            {result.replaceAll("*" , " ").split("|").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        
        

        
        </div>
        </div>

      </div>
    </div>
              <div className="my-8 border-t border-green-200" />

    </>
  );
}
