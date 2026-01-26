import { AppWrapperSection } from "./sections/AppWrapperSection/AppWrapperSection";
import { ContentMainSection } from "./sections/ContentMainSection/ContentMainSection";
import { NavigationHeaderSection } from "./sections/NavigationHeaderSection";

export const ElementLight = (): JSX.Element => {
  return (
    <div className="bg-[linear-gradient(0deg,rgba(236,242,249,1)_0%,rgba(236,242,249,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-w-[1920px] min-h-screen flex flex-col relative">
      <NavigationHeaderSection />
      <ContentMainSection />
      <AppWrapperSection />
    </div>
  );
};
