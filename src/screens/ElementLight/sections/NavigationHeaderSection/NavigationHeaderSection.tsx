import { ChevronDownIcon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: t.header.services, hasDropdown: false, link: "#" },
    { label: t.header.team, hasDropdown: false, link: "#" },
    { label: t.header.prices, hasDropdown: false, link: "/prices" },
    { label: t.header.blog, hasDropdown: false, link: "#" },
    { label: t.header.aboutClinic, hasDropdown: false, link: "#" },
    { label: t.header.contacts, hasDropdown: false, link: "#" },
  ];
  return (
    <header className="flex flex-col w-full items-start px-4 md:px-8 lg:px-40 py-2.5 relative bg-transparent">
      <nav className="flex items-center justify-between px-3 md:px-6 py-4 md:py-5 relative self-stretch w-full bg-[#336699] rounded-2xl md:rounded-3xl shadow-[0px_6px_24px_#0000000d]">
        <Link to="/">
          <img className="relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity w-20 md:w-auto" alt="Link" src="/link.svg" />
        </Link>

        <div className="flex items-center justify-between relative flex-1 ml-3 md:ml-6">
          <NavigationMenu className="flex-1 hidden lg:block">
            <NavigationMenuList className="flex items-center gap-0">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.link.startsWith("/") ? (
                    <Link to={item.link}>
                      <NavigationMenuLink className="inline-flex items-center gap-1 px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                          {item.label}
                        </span>
                        {item.hasDropdown && (
                          <ChevronDownIcon className="w-4 h-4 text-white" />
                        )}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <NavigationMenuLink className="inline-flex items-center gap-1 px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDownIcon className="w-4 h-4 text-white" />
                      )}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="lg:hidden text-white p-2 hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <a
              href="tel:+74950856646"
              className="hidden md:block pr-2.5 [font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {t.header.phone}
            </a>
            <img
              className="hidden md:block flex-shrink-0"
              alt="List margin"
              src="/list-margin.svg"
            />
            <LanguageSwitcher />
            <Button
              onClick={onOpenModal}
              className="h-8 md:h-10 px-3 md:px-4 bg-[#ae955f] hover:bg-[#9d8454] text-white rounded-xl md:rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-sm md:text-base leading-4"
            >
              {t.header.bookAppointment}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-white rounded-2xl shadow-lg mt-2 p-4 animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-3">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.link.startsWith("/") ? (
                  <Link
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-[#f5f7fa] transition-colors"
                  >
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-base">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    className="block py-3 px-4 rounded-lg hover:bg-[#f5f7fa] transition-colors"
                  >
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-base">
                      {item.label}
                    </span>
                  </a>
                )}
              </div>
            ))}
            <a
              href="tel:+74950856646"
              className="block py-3 px-4 rounded-lg hover:bg-[#f5f7fa] transition-colors md:hidden"
            >
              <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-base">
                {t.header.phone}
              </span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
