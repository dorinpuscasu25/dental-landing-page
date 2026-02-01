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
          <img className="relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity w-32 md:w-40 h-auto" alt="Topdentica Logo" src="/logo_alb.svg" />
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
              href="tel:+37368303088"
              className="hidden md:block pr-2.5 [font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {t.header.phone}
            </a>
            <a
              href="https://www.instagram.com/topdenticamd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
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
              href="tel:+37368303088"
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
