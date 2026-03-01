import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { LanguageSwitcher } from "../../../../components/LanguageSwitcher";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslations } from "../../../../translations";

interface NavigationHeaderSectionProps {
  onOpenModal: () => void;
}

export const NavigationHeaderSection = ({
  onOpenModal,
}: NavigationHeaderSectionProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: t.header.services, href: "/#services" },
    { label: t.header.team, href: "/team" },
    { label: t.header.prices, href: "/prices" },
    { label: t.header.aboutClinic },
    { label: t.header.contacts, href: "/#contacts" },
  ];
  return (
    <header className="flex flex-col w-full items-start px-4 md:px-8 lg:px-40 py-2.5 relative bg-transparent">
      <nav className="flex items-center justify-between px-3 md:px-6 py-4 md:py-5 relative self-stretch w-full bg-[#336699] rounded-2xl md:rounded-3xl shadow-[0px_6px_24px_#0000000d]">
        <Link href="/">
          <img className="relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity w-32 md:w-40 h-auto" alt="Topdentica Logo" src="/logo_alb.svg" />
        </Link>

        <div className="flex items-center justify-between relative flex-1 ml-3 md:ml-6">
          <div className="flex-1 hidden lg:flex items-center gap-0">
            {navigationItems.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="inline-flex items-center gap-1 px-2 py-2"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`font-extralight text-sm tracking-[0] leading-[14px] whitespace-nowrap transition-opacity hover:opacity-80 ${
                      pathname === item.href ? "text-white" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap cursor-default">
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </div>

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
            <LanguageSwitcher />
            <a
              href="tel:+37368303088"
              className="hidden md:block px-1 font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {t.header.phone}
            </a>
            <Button
              onClick={onOpenModal}
              className="h-8 md:h-10 px-3 md:px-4 bg-[#56B3EE] hover:bg-[#56B3EE]/90 text-white rounded-xl md:rounded-2xl font-extralight text-sm md:text-base leading-4"
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
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-3 px-4 rounded-lg hover:bg-[#f5f7fa] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-extralight text-[#336699] text-base">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <div className="block py-3 px-4 rounded-lg">
                    <span className="font-extralight text-[#336699] text-base">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <a
              href="tel:+37368303088"
              className="block py-3 px-4 rounded-lg hover:bg-[#f5f7fa] transition-colors md:hidden"
            >
              <span className=" font-extralight text-[#336699] text-base">
                {t.header.phone}
              </span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
