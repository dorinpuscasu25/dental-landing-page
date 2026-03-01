"use client";

import { ContentMainSection } from "./sections/ContentMainSection/ContentMainSection";
import { SiteLayout } from "../shared/SiteLayout";

export const ElementLight = () => {
  return (
    <SiteLayout headerSource="header" footerSource="footer">
      {(openModal) => (
        <ContentMainSection onOpenModal={() => openModal("hero")} />
      )}
    </SiteLayout>
  );
};
