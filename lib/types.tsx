export interface Voice {
  name: string;
  language: string;
  gender: "male" | "female";
  description: string;
  customizable: boolean;
  supported_features: {
    custom_pronunciation: boolean;
    voice_transformation: boolean;
  };
  url: string;
}
