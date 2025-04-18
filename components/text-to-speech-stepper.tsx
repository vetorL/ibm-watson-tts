"use client";

import { Voice } from "@/lib/types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useMemo, useState } from "react";
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

  const isStepValid = useMemo(() => {
    switch (activeStep) {
      case 0:
        return apiKey.trim() !== "" && serviceUrl.trim() !== "";
      case 1:
        return !!language && !!selectedVoice;
      case 2:
        return text.trim() !== "" && !!selectedVoice;
      default:
        return true;
    }
  }, [activeStep, apiKey, serviceUrl, language, selectedVoice, text]);

  const handleNext = () => {
    if (!isStepValid) return;

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
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{
            borderRadius: "9999px",
            textTransform: "none",
            height: { xs: 40, sm: 48 },
            px: { xs: 4, sm: 5 },
            width: { xs: "100%", sm: "auto", md: 158 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            backgroundColor: "white",
            color: "text.primary",
            borderColor: "rgba(0, 0, 0, 0.08)",
            "&:hover": {
              backgroundColor: "#f5f5f5", // a soft gray hover color
              borderColor: "transparent",
            },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isStepValid}
          sx={{
            borderRadius: "9999px",
            textTransform: "none",
            height: { xs: 40, sm: 48 },
            px: { xs: 4, sm: 5 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            width: { xs: "100%", sm: "auto" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "text.primary",
            color: "white",
            "&:hover": {
              bgcolor: "#383838",
            },
            "&.Mui-disabled": {
              opacity: 0.5,
            },
          }}
        >
          <NavigateNextIcon />
          Next
        </Button>
      </div>
    </div>
  );
}
