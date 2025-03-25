import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface VoiceOrderButtonProps {
  className?: string;
  showTooltip?: boolean;
  onTranscript?: (text: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceOrderButton = ({
  className = "",
  showTooltip = false,
  onTranscript = () => {},
}: VoiceOrderButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showTooltipState, setShowTooltipState] = useState(showTooltip);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition on component mount
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        console.log("Transcript received:", currentTranscript);
        onTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
      };
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Handle recording state changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.start();
        console.log("Started voice recording");
      } catch (e) {
        console.error("Error starting speech recognition:", e);
        setIsRecording(false);
      }
    } else {
      try {
        recognitionRef.current.stop();
        console.log("Stopped voice recording");
      } catch (e) {
        console.error("Error stopping speech recognition:", e);
      }
    }
  }, [isRecording]);

  const toggleRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsRecording(!isRecording);
      console.log("Recording state toggled to:", !isRecording);
    } else {
      console.log('Speech recognition not supported');
    }
  };

  const buttonContent = (
    <button
      className={`p-2 rounded-full relative ${isRecording ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"} hover:bg-gray-200 transition-colors ${className}`}
      onClick={toggleRecording}
      aria-label="Voice search"
      style={isRecording ? { animation: "pulse 2s infinite" } : {}}
    >
      <Mic className="h-5 w-5" />
      {isRecording && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </button>
  );

  if (showTooltipState) {
    return (
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Try voice ordering!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
};

export default VoiceOrderButton;
