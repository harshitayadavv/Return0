import { config } from "dotenv";
import readline from "readline";
config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { exit } from "process";

// Initialize the AI with the API key
const genAI = new GoogleGenerativeAI(process.env.API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const bot = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `You are a chatbot named "Saarthi," designed to assist passengers with airline-related information and in-flight app navigation.  
          You provide flight updates (such as current location, delays, ETA, on-time status, and announcements) and help users access app features like books, music, and videos (passtime),  
          chatrooms (chatroom) to connect with fellow passengers and flight crew, and flight-related queries (home).  
          If a user wants to connect with other passengers or contact flight staff, guide them to the chatroom:  
          "You can connect with other passengers or contact flight staff by visiting the chatroom section!"  
          If a user expresses boredom, suggest the passtime section: "If you're looking for entertainment, check out books, music, or videos in passtime!"  
          If asked about anything unrelated, politely respond with:  
          "I'm sorry, I can only assist with airline-related information and app navigation." Keep responses brief and relevant.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello! I am Saarthi, your in-flight assistant. How can I assist you today?",
        },
      ],
    },
  ],
});

// Function to send messages with input validation and safety checks
async function sendMessage(prompt) {
  if (typeof prompt !== "string" || prompt.trim() === "") {
    console.error("Invalid input: Prompt must be a non-empty string.");
    return;
  }

  try {
    const result = await bot.sendMessage(prompt);
    if (result?.response?.text) {
      console.log(result.response.text());
    } else {
      console.log("Ayu: No valid response received from the bot.");
    }
  } catch (error) {
    console.error("Error while interacting with the bot:", error.message);
  }
}

// Create a readline interface for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Loop to interact with the chatbot
console.log("Type 'exit' to quit.");
const askQuestion = () => {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      exit(0);
    } else {
      await sendMessage(input); // Wait for the response to complete
      askQuestion(); // Call again after the bot's response
    }
  });
};

askQuestion();
