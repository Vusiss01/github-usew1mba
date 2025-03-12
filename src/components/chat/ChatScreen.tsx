import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Send, Paperclip, Image, Mic } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "vendor" | "system";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
  image?: string;
}

const ChatScreen = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine if this is a delivery chat
  const isDeliveryChat = vendorId?.startsWith("delivery-");

  // Sample vendor data
  const vendorData = {
    id: vendorId || "burgers",
    name: isDeliveryChat ? "Michael (Delivery Partner)" : "Burgers & Co.",
    image: isDeliveryChat
      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
      : "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
    isOnline: true,
    lastSeen: "Just now",
  };

  // Initialize with sample messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        text: isDeliveryChat
          ? "Hi there! I'm your delivery partner for today. I'll be delivering your order from Burgers & Co."
          : "Welcome to Burgers & Co.! How can we help you today?",
        sender: "vendor",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
    ];

    if (isDeliveryChat) {
      initialMessages.push({
        id: "2",
        text: "I'm currently on my way. Your estimated delivery time is about 15 minutes.",
        sender: "vendor",
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      });
    }

    setMessages(initialMessages);
  }, [isDeliveryChat, vendorId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate vendor response after a delay
    setTimeout(() => {
      const vendorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: isDeliveryChat
          ? "Thanks for your message. I'll be there as soon as possible!"
          : "Thank you for your message. We'll get back to you shortly.",
        sender: "vendor",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, vendorResponse]);
    }, 1500);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={vendorData.image}
                  alt={vendorData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {vendorData.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium">{vendorData.name}</h2>
                <p className="text-xs text-gray-500">
                  {vendorData.isOnline
                    ? "Online"
                    : `Last seen ${vendorData.lastSeen}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Chat Messages */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender !== "user" && (
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={vendorData.image}
                      alt={vendorData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-xs mt-1 ${msg.sender === "user" ? "text-orange-100" : "text-gray-500"}`}
                  >
                    {formatTime(msg.timestamp)}
                    {msg.sender === "user" && msg.status && (
                      <span className="ml-2">
                        {msg.status === "read"
                          ? "Read"
                          : msg.status === "delivered"
                            ? "Delivered"
                            : "Sent"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center">
            <div className="flex space-x-2 mr-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Image className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Mic className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              className="ml-2 rounded-full p-2 h-auto w-auto bg-orange-500 hover:bg-orange-600"
              onClick={sendMessage}
              disabled={message.trim() === ""}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatScreen;
