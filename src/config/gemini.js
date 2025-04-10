import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-03-25",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result?.response;

  // Log text response
  if (response?.text) {
    console.log(response.text());
  }

  // Handle inline data (e.g., image or audio)
  if (response?.candidates) {
    response.candidates.forEach((candidate, cIndex) => {
      const parts = candidate?.content?.parts || [];
      parts.forEach((part, pIndex) => {
        if (part?.inlineData) {
          const { mimeType, data } = part.inlineData;
          const filename = `output_${cIndex}_${pIndex}.${mimeType.split("/")[1]}`;
          downloadBase64File(data, mimeType, filename);
        }
      });
    });
  }

  return response?.text?.() || null;
}

function downloadBase64File(base64Data, mimeType, filename) {
  const link = document.createElement("a");
  link.href = `data:${mimeType};base64,${base64Data}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default run;
