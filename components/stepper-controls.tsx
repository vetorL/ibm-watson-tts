import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface StepperControlsProps {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  handleHelp: () => void;
  handleBack: () => void;
  handleNext: () => void;
  isStepValid: boolean;
  loading: boolean;
}

export default function StepperControls({
  activeStep,
  handleHelp,
  handleBack,
  handleNext,
  isStepValid,
  loading,
}: StepperControlsProps) {
  return (
    <div className="flex gap-4 items-center flex-row justify-between w-full">
      {activeStep === 0 ? (
        <Button
          variant="outlined"
          onClick={handleHelp}
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
          <HelpOutlineIcon sx={{ marginRight: 1 }} />
          Help
        </Button>
      ) : (
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
      )}

      <Button
        variant="contained"
        onClick={handleNext}
        disabled={!isStepValid && activeStep !== 3}
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
        loading={loading}
      >
        {activeStep === 3 ? (
          <>
            <ReplayIcon />
            Generate another
          </>
        ) : (
          <>
            <NavigateNextIcon />
            Next
          </>
        )}
      </Button>
    </div>
  );
}
