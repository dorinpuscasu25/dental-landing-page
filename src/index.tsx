import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ElementLight } from "./screens/ElementLight/ElementLight";
import { LanguageProvider } from "./contexts/LanguageContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <ElementLight />
    </LanguageProvider>
  </StrictMode>,
);
