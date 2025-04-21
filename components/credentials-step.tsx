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
  return (
    <>
      <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2 tracking-[-.01em]">
          - Start by filling in the information about your instance of the
          service{" "}
        </li>
      </ul>

      <TextField
        id="outlined-basic"
        label="API key"
        variant="outlined"
        helperText="You can find your API key in the IBM Cloud console."
        type="password"
        fullWidth
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Service URL"
        variant="outlined"
        helperText="You can find the Service URL in the IBM Cloud console."
        fullWidth
        value={serviceUrl}
        onChange={(e) => setServiceUrl(e.target.value)}
      />
    </>
  );
}
