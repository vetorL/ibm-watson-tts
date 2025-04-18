"use client";

import { Voice } from "@/lib/types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";
import AudioOutputStep from "./audio-output-step";
import CredentialsStep from "./credentials-step";
import TextInputStep from "./text-input-step";
import VoiceSelectionStep from "./voice-selection-step";

const steps = ["Credentials", "Voice Selection", "Text Input", "Audio Output"];

const mockVoices: Voice[] = [
  {
    name: "es-ES_LauraV3Voice",
    language: "es-ES",
    gender: "female",
    description:
      "Laura: Castilian Spanish (español castellano) female voice. Dnn technology.",
    customizable: true,
    supported_features: {
      custom_pronunciation: true,
      voice_transformation: false,
    },
    url: "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/.../v1/voices/es-ES_LauraV3Voice",
  },
  {
    name: "en-US_MichaelV3Voice",
    language: "en-US",
    gender: "male",
    description: "Michael: American English male voice. Dnn technology.",
    customizable: true,
    supported_features: {
      custom_pronunciation: true,
      voice_transformation: true,
    },
    url: "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/.../v1/voices/en-US_MichaelV3Voice",
  },
  // ... add more voices as needed
];

export default function TextToSpeechStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [gender, setGender] = useState<"male" | "female">("female");
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<string | null>("");

  const availableLanguages = Array.from(
    new Set(mockVoices.map((voice) => voice.language))
  );

  const filteredVoices = mockVoices.filter(
    (voice) => voice.gender === gender && voice.language === language
  );

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log({
        apiKey,
        serviceUrl,
        gender,
        language,
        selectedVoice,
        text,
      });
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="flex gap-2 flex-col w-full">
        {activeStep === 0 && (
          <CredentialsStep
            apiKey={apiKey}
            setApiKey={setApiKey}
            serviceUrl={serviceUrl}
            setServiceUrl={setServiceUrl}
          />
        )}

        {activeStep === 1 && (
          <VoiceSelectionStep
            gender={gender}
            setGender={setGender}
            filteredVoices={filteredVoices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
            availableLanguages={availableLanguages}
            setLanguage={setLanguage}
            language={language}
          />
        )}

        {activeStep === 2 && (
          <TextInputStep
            text={text}
            setText={setText}
            selectedVoice={selectedVoice}
          />
        )}

        {activeStep === 3 && <AudioOutputStep />}
      </div>
      <div className="flex gap-4 items-center flex-row justify-between w-full">
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] 
          transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
          hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full 
          sm:w-auto md:w-[158px] cursor-pointer"
          onClick={handleBack}
          rel="noopener noreferrer"
        >
          Back
        </a>

        <a
          className="rounded-full border border-solid border-transparent transition-colors 
          flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] 
          dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto
          cursor-pointer"
          onClick={handleNext}
          rel="noopener noreferrer"
        >
          <NavigateNextIcon className="dark:invert" width={20} height={20} />
          Next
        </a>
      </div>
    </div>
  );
}
