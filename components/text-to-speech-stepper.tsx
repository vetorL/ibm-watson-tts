"use client";

import { Voice } from "@/lib/types";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useMemo, useState } from "react";
import AudioOutputStep from "./audio-output-step";
import CredentialsStep from "./credentials-step";
import HelpModal from "./help-modal"; // adjust path accordingly
import StepperControls from "./stepper-controls";
import TextInputStep from "./text-input-step";
import VoiceSelectionStep from "./voice-selection-step";

const steps = ["Credentials", "Voice Selection", "Text Input", "Audio Output"];

export default function TextToSpeechStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [gender, setGender] = useState<"male" | "female">("female");
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<string | null>("");
  const [voices, setVoices] = useState<Voice[]>([]); // Store the voices
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleHelp = () => {
    setHelpOpen(true);
  };

  // Function to fetch voices from the server
  const fetchVoices = async (apikey: string, serviceUrl: string) => {
    try {
      const response = await fetch("/api/voices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apikey, serviceUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched voices:", data);
        setVoices(data);
        return true;
      } else {
        console.error("Error fetching voices:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const generateSpeech = async (
    apikey: string,
    serviceUrl: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apikey,
          serviceUrl,
          text,
          voice: selectedVoice?.name,
        }),
      });

      if (!response.ok) {
        console.error("Text-to-speech request failed:", response.statusText);
        return false;
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      return true;
    } catch (error) {
      console.error("Error generating speech:", error);
      return false;
    }
  };

  const availableLanguages = Array.from(
    new Set(Array.isArray(voices) ? voices.map((voice) => voice.language) : [])
  );

  const filteredVoices = Array.isArray(voices)
    ? voices.filter(
        (voice) => voice.gender === gender && voice.language === language
      )
    : [];

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

  const resetForNewGeneration = () => {
    setGender("female");
    setSelectedVoice(null);
    setText("");
    setLanguage("");
    setAudioUrl(null);
    setActiveStep(1); // Volta para seleção de voz
  };

  const handleNext = async () => {
    if (!isStepValid) return;

    // Skip all async logic if we're regenerating
    if (activeStep === 3) {
      resetForNewGeneration();
      return;
    }

    if (activeStep === 0) {
      setLoading(true);
      const success = await fetchVoices(apiKey, serviceUrl);
      setLoading(false);
      if (!success) {
        alert("Failed to fetch voices. Please check your credentials.");
        return;
      }
    }

    if (activeStep === 2) {
      setLoading(true);
      const success = await generateSpeech(apiKey, serviceUrl);
      setLoading(false);
      if (!success) {
        alert("Failed to synthesize audio.");
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
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

        {activeStep === 3 && <AudioOutputStep audioUrl={audioUrl} />}
      </div>
      <StepperControls
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleHelp={handleHelp}
        handleBack={handleBack}
        handleNext={handleNext}
        isStepValid={isStepValid}
        loading={loading}
      />

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
