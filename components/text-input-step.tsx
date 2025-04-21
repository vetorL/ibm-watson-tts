import { Voice } from "@/lib/types";
import TextField from "@mui/material/TextField";

interface TextInputStepProps {
  text: string;
  setText: (text: string) => void;
  selectedVoice: Voice | null;
}

export default function TextInputStep({
  text,
  setText,
  selectedVoice,
}: TextInputStepProps) {
  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          - Write the text to be turned into audio
        </li>
        <li className="mb-2 tracking-[-.01em] text-gray-500">
          Note: you chose{" "}
          <i>
            <b>{selectedVoice?.name}</b>
          </i>{" "}
          as the voice, make sure to write in{" "}
          <i>
            <b>{selectedVoice?.language}</b>
          </i>{" "}
          for the best results.
        </li>
      </ul>

      <TextField
        id="outlined-basic"
        label="Text Input"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        helperText={`Number of chars: ${text.length}`}
      />
    </>
  );
}
