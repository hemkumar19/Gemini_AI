import { createContext, useState } from "react";
import run from "../config/gemini";

export const ConText = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Helper to delay text display
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // New chat clears the states
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData(""); // Reset result data when starting a new chat
    setInput(""); // Clear input
  };

  // Function to send prompt to the API
  const onSent = async (prompt) => {
    setResultData(""); // Clear the current result
    setLoading(true);  // Set loading to true
    setShowResult(true);

    let response;
    try {
      if (prompt !== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }

      // Process response and display it with bold formatting and line breaks
      let formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold texts between double asterisks
        .replace(/\*/g, "<br>"); // Replace single asterisk with line break

      const words = formattedResponse.split(" ");
      words.forEach((word, i) => {
        delayPara(i, word + " ");
      });
    } catch (error) {
      console.error("Error fetching the response: ", error);
      setResultData("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading to false once the API call finishes
    }

    setInput(""); // Clear the input after sending the message
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <ConText.Provider value={contextValue}>
      {props.children}
    </ConText.Provider>
  );
};

export default ContextProvider;
