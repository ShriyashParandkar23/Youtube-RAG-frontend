import React, { useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";

const YoutubeRag = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [messages, setMessages] = useState([]); // [{ sender: "user" | "bot", text: "..." }]
  const [userInput, setUserInput] = useState("");
  const [transcript, setTranscript] = useState("");

  const getBotReply = (userInput, transcript, Message) => {};
  const handleChatClick = () => {
    const id = extractVideoId(videoUrl);
    setVideoId(id);
    setMessages([]);
  };

  const extractVideoId = async (url) => {
    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (!videoId) throw new Error("Invalid YouTube URL");

      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      setTranscript(transcript);

      return videoId;
    } catch (error) {
      console.error("Failed to extract transcript:", error);
      return null;
    }
  };
  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Simulate/Call backend for response
    const response = await getBotReply(userInput, transcript); // Your logic here
    setMessages([...newMessages, { sender: "bot", text: response }]);
  };
  return (
    <section className="w-full px-10 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Chat With Youtube Video! 😍
        </h2>

        {/* Search Section */}
        <div className="search-section flex gap-6 flex-wrap">
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="bg-slate-800 border border-[#05b6d3] p-5 flex-1 min-w-[300px] h-12 rounded text-white"
          />
          <button
            onClick={handleChatClick}
            className="bg-[#05b6d3] p-3 px-6 rounded-xl font-bold text-black"
          >
            Chat
          </button>
        </div>

        {/* YouTube Embed */}
        {videoId && (
          <div className="mt-12 flex justify-center">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
              className="rounded-xl shadow-xl"
            ></iframe>
          </div>
        )}

        {/* Chatbot Section */}
        {videoId && (
          <div className="chatbot-section mt-16 bg-slate-900 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ask Something About This Video 🎤
            </h3>
            <div className="chat-box h-64 overflow-y-auto bg-slate-800 p-4 rounded text-white mb-4 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-md ${
                    msg.sender === "user"
                      ? "bg-[#05b6d3] text-black font-medium self-end ml-auto w-fit px-4 rounded-2xl max-w-[70%]"
                      : "bg-slate-700 text-white font-medium self-start mr-auto w-fit px-4 rounded-2xl max-w-[70%]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Type your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 h-12 px-4 rounded bg-slate-700 text-white border border-[#05b6d3]"
              />
              <button
                onClick={handleSend}
                className="bg-[#05b6d3] px-6 rounded-xl font-bold text-black"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default YoutubeRag;