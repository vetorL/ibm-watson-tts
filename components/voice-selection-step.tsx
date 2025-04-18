import { Voice } from "@/lib/types";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";

interface VoiceSelectionStepProps {
  gender: "male" | "female";
  setGender: (gender: "male" | "female") => void;
  filteredVoices: Voice[];
  selectedVoice: Voice | null;
  setSelectedVoice: (voice: Voice | null) => void;
  availableLanguages: string[];
  setLanguage: (language: string | null) => void;
  language: string | null;
}

export default function VoiceSelectionStep({
  gender,
  setGender,
  filteredVoices,
  selectedVoice,
  setSelectedVoice,
  availableLanguages,
  setLanguage,
  language,
}: VoiceSelectionStepProps) {
  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">- Select the voice</li>
        <li className="mb-2 tracking-[-.01em] text-gray-500">
          Note: each voice has its own{" "}
          <i>
            <b>language</b>
          </i>{" "}
          and{" "}
          <i>
            <b>gender</b>
          </i>
          .
        </li>
      </ul>

      <RadioGroup
        row
        value={gender}
        onChange={(e) => {
          setGender(e.target.value as "male" | "female");
          setSelectedVoice(null); // Reset selected voice
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>

      <Autocomplete
        options={availableLanguages}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Choose a language" variant="outlined" />
        )}
        value={language}
        onChange={(e, newVal) => {
          setLanguage(newVal);
          setSelectedVoice(null); // Reset selected voice
        }}
      />

      <Autocomplete
        options={filteredVoices}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Choose a voice" variant="outlined" />
        )}
        value={selectedVoice}
        onChange={(e, newVal) => setSelectedVoice(newVal)}
      />
    </>
  );
}
