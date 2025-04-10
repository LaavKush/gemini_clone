// Context.jsx
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let currentPrompt = (prompt || input || "").toString();
    if (!currentPrompt.trim()) {
      setLoading(false);
      return;
    }

    if (!prompt) {
      setPrevPrompts((prev) => [...prev, currentPrompt]);
    }

    setRecentPrompt(currentPrompt);

    try {
      const response = await run(currentPrompt);

      let responseArray = response.split("**");
      let formattedResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          formattedResponse += "<b>" + responseArray[i] + "</b>";
        } else {
          formattedResponse += responseArray[i];
        }
      }

      let finalResponse = formattedResponse.split("*").join("</br>");
      let words = finalResponse.split(" ");
      words.forEach((word, index) => {
        delayPara(index, word + " ");
      });
    } catch (error) {
      console.error("Error fetching response:", error);
      setResultData("Something went wrong while fetching the response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    darkMode,
    toggleDarkMode,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
