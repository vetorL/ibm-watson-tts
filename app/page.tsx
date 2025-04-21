import TextToSpeechStepper from "@/components/text-to-speech-stepper";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-150 h-100">
        <h1 className="text-xl font-bold">IBM Watson Text to Speech</h1>

        <TextToSpeechStepper />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/vetorL/ibm-watson-tts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon aria-hidden width={16} height={16} />
          GitHub
        </a>
      </footer>
    </div>
  );
}
