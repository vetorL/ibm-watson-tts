export default function AudioOutputStep({
  audioUrl,
}: {
  audioUrl: string | null;
}) {
  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          - Audio generated successfully!
        </li>
      </ul>
      {audioUrl && <AudioPlayer src={audioUrl} />}
    </>
  );
}

function AudioPlayer({ src }: { src: string }) {
  return (
    <audio controls style={{ width: "100%" }}>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
