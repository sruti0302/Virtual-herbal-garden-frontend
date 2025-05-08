import React, { useState } from 'react';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  const handleTranslate = async () => {
    // Example: dummy translation logic
    setTranslatedText(`Translated (${targetLang}): ${inputText}`);
    
    // You can replace with an actual API call like:
    // const response = await fetch('YOUR_TRANSLATION_API', { method: 'POST', body: ... });
    // const data = await response.json();
    // setTranslatedText(data.translation);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-semibold mb-4">Language Translator</h2>

      <div className="flex justify-between mb-2">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="p-2 border rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>

        <span className="mx-2">→</span>

        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="p-2 border rounded">
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
        </select>
      </div>

      <textarea
        rows="4"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter text to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <button onClick={handleTranslate} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Translate
      </button>

      {translatedText && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Output:</strong>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
