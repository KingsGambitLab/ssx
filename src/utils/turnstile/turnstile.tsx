/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Turnstile from "react-turnstile";

interface TurnstileWidgetProps {
  onTokenObtained: (token: string) => void;
  appearance?: "always" | "interaction-only";
  onReset?: (widgetId: string, boundTurnstile: any) => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ 
  onTokenObtained, 
  appearance = "interaction-only",
  onReset 
}) => {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
      onVerify={onTokenObtained}
      onLoad={onReset}
      appearance={appearance}
      refreshExpired="auto"
      fixedSize
      theme="light"
    />
  );
};

export default TurnstileWidget;
