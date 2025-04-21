import TextField from "@mui/material/TextField";

interface CredentialsStepProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  serviceUrl: string;
  setServiceUrl: (serviceUrl: string) => void;
}

export default function CredentialsStep({
  apiKey,
  setApiKey,
  serviceUrl,
  setServiceUrl,
}: CredentialsStepProps) {
  const helperText = (
    <span>
      You can find this in the{" "}
      <a
        href="https://cloud.ibm.com/catalog/services/text-to-speech"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-black"
      >
        IBM Cloud console<span aria-hidden>↗</span>
      </a>
    </span>
  );

  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          - Start by filling in the information about your instance of the
          service{" "}
        </li>
      </ul>

      <TextField
        id="api-key"
        label="API key"
        variant="outlined"
        helperText={helperText}
        type="password"
        fullWidth
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        sx={{ mb: 0.5 }}
      />

      <TextField
        id="service-url"
        label="Service URL"
        variant="outlined"
        helperText={helperText}
        fullWidth
        value={serviceUrl}
        onChange={(e) => setServiceUrl(e.target.value)}
      />
    </>
  );
}
