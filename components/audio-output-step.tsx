export default function AudioOutputStep() {
  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          - Audio generated succesfully!
        </li>
      </ul>
      <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
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
