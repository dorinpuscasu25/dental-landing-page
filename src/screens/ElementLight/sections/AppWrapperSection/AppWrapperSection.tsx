import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslations } from "../../../../translations";

interface AppWrapperSectionProps {
  onOpenModal: () => void;
}

type FooterNavLink = {
  label: string;
  href: string;
};

type FooterActionLink = {
  label: string;
  action: () => void;
};

export const AppWrapperSection = ({
  onOpenModal,
}: AppWrapperSectionProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const sectionsLinks: FooterNavLink[] = [
    { label: t.header.services, href: "/#services" },
    { label: t.header.team, href: "/team" },
    { label: t.header.prices, href: "/prices" },
    { label: t.header.aboutClinic, href: "/#about" },
    { label: t.header.contacts, href: "/#contacts" },
  ];

  const patientsLinks: Array<FooterNavLink | FooterActionLink> =
    language === "ru"
      ? [
          { label: "Контакты", href: "/#contacts" },
          { label: "Цены на услуги", href: "/prices" },
          { label: "Подарочный сертификат", action: onOpenModal },
        ]
      : language === "en"
        ? [
            { label: "Contacts", href: "/#contacts" },
            { label: "Service prices", href: "/prices" },
            { label: "Gift certificate", action: onOpenModal },
          ]
        : [
            { label: "Contacte", href: "/#contacts" },
            { label: "Prețuri servicii", href: "/prices" },
            { label: "Certificat cadou", action: onOpenModal },
          ];

  return (
    <footer className="flex flex-col w-full items-start p-6 md:p-10 lg:p-14 relative bg-[#336699] rounded-2xl md:rounded-[32px]">
      <div className="mb-8 lg:mb-12">
        <img
          className="w-32 md:w-40 lg:w-48 h-auto"
          alt="Topdentica Logo"
          src="/logo_alb.svg"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-5 pt-0 pb-10 md:pb-[60px] px-0 relative self-stretch w-full flex-[0_0_auto]">
        <nav className="flex flex-col items-start gap-6 lg:gap-11 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch font-normal text-white text-lg md:text-xl lg:text-2xl leading-6 md:leading-7">
            {t.footer.sections}
          </h3>

          <ul className="flex flex-col items-start gap-2.5 lg:gap-3 relative self-stretch w-full flex-[0_0_auto]">
            {sectionsLinks.map((link) => (
              <li
                key={link.href}
                className="flex relative self-stretch w-full flex-[0_0_auto]"
              >
                <Link
                  href={link.href}
                  className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto] hover:opacity-80 transition-opacity"
                >
                  <span className="flex-1 font-extralight text-white text-sm md:text-base lg:text-lg leading-5">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col items-start gap-6 lg:gap-11 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch font-normal text-white text-lg md:text-xl lg:text-2xl leading-6 md:leading-7">
            {t.footer.patients}
          </h3>

          <ul className="flex flex-col items-start gap-2.5 lg:gap-3 relative self-stretch w-full flex-[0_0_auto]">
            {patientsLinks.map((link) => (
              <li
                key={link.label}
                className="flex relative self-stretch w-full flex-[0_0_auto]"
              >
                {"href" in link ? (
                  <Link
                    href={link.href}
                    className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto] hover:opacity-80 transition-opacity"
                  >
                    <span className="flex-1 font-extralight text-white text-sm md:text-base lg:text-lg leading-5">
                      {link.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={link.action}
                    className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto] text-left hover:opacity-80 transition-opacity"
                  >
                    <span className="flex-1 font-extralight text-white text-sm md:text-base lg:text-lg leading-5">
                      {link.label}
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-8 lg:gap-12 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch font-normal text-white text-lg md:text-xl lg:text-2xl leading-6 md:leading-7">
            {t.footer.contacts}
          </h3>

          <div className="flex flex-col items-start gap-6 lg:gap-10 relative self-stretch w-full flex-[0_0_auto]">
            <address className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] not-italic">
              <span className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4 self-stretch">
                {t.footer.addressLabel}
              </span>

              <p className="self-stretch font-extralight text-white text-sm md:text-base lg:text-lg leading-5">
                {t.header.address}
              </p>
            </address>

            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <span className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4 self-stretch">
                {t.footer.phoneLabel}
              </span>

              <a
                href="tel:+37368303088"
                className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto]"
              >
                <span className="flex-1 text-white text-sm md:text-base lg:text-lg leading-5 font-extralight">
                  {t.header.phone}
                </span>
              </a>

              <p className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4 self-stretch">
                {t.footer.schedule}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <span className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4">
                {t.footer.writeUs}
              </span>

              <div className="flex flex-wrap items-center gap-2 relative w-full flex-[0_0_auto]">
                <a
                  href="https://www.instagram.com/topdenticamd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center justify-center gap-2 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="font-extralight text-white text-sm leading-4 whitespace-nowrap">
                    Instagram
                  </span>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/37368303088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center justify-center gap-2 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="font-extralight text-white text-sm leading-4 whitespace-nowrap">
                    WhatsApp
                  </span>
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <Button
            onClick={onOpenModal}
            className="h-10 md:h-12 px-4 md:px-5 py-0 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-xl md:rounded-2xl w-full lg:w-auto"
          >
            <span className="font-extralight text-white text-sm md:text-base text-center leading-4">
              {t.footer.bookAppointment}
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-6 md:pt-8 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-t border-white/20">
        <div className="inline-flex flex-col md:flex-row flex-wrap items-start gap-3 md:gap-4 relative flex-[0_0_auto]">
          <p className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-60">
            <span className="text-[#ffffffcc] text-xs md:text-sm leading-4 font-extralight">
              {t.footer.copyright}
            </span>
          </p>

          <a
            href="#"
            className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-60"
          >
            <span className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4">
              {t.footer.privacy}
            </span>
          </a>

          <a
            href="/organigrama-web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4">
              {t.footer.organigram}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
