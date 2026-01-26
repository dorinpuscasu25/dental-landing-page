import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { LanguageSwitcher } from "../../../../components/LanguageSwitcher";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslations } from "../../../../translations";

interface NavigationHeaderSectionProps {
  onOpenModal: () => void;
}

export const NavigationHeaderSection = ({
  onOpenModal,
}: NavigationHeaderSectionProps): JSX.Element => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const navigationItems = [
    { label: t.header.services, hasDropdown: true },
    { label: t.header.aboutClinic, hasDropdown: false },
    { label: t.header.team, hasDropdown: false },
    { label: t.header.sleepTreatment, hasDropdown: false },
    { label: t.header.forPatients, hasDropdown: true },
    { label: t.header.prices, hasDropdown: false },
    { label: t.header.contacts, hasDropdown: false },
  ];
  return (
    <header className="flex flex-col w-full items-start px-40 py-2.5 relative bg-transparent">
      <nav className="flex items-center justify-between px-6 py-5 relative self-stretch w-full bg-[#336699] rounded-3xl shadow-[0px_6px_24px_#0000000d]">
        <img className="relative flex-shrink-0" alt="Link" src="/link.svg" />

        <div className="flex items-center justify-between relative flex-1 ml-6">
          <NavigationMenu className="flex-1">
            <NavigationMenuList className="flex items-center gap-0">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink className="inline-flex items-center gap-1 px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDownIcon className="w-4 h-4 text-white" />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 px-[30px]">
            <span className="text-white text-sm leading-3 whitespace-nowrap [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
              {t.header.address}
            </span>
            <div className="w-px h-6 bg-white opacity-40" />
            <span className="text-white text-sm leading-3 whitespace-nowrap [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
              {t.header.metro}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="pr-2.5 [font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
              {t.header.phone}
            </span>
            <img
              className="flex-shrink-0"
              alt="List margin"
              src="/list-margin.svg"
            />
            <LanguageSwitcher />
            <Button
              onClick={onOpenModal}
              className="h-10 px-4 bg-[#ae955f] hover:bg-[#9d8454] text-white rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-base leading-4"
            >
              {t.header.bookAppointment}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
