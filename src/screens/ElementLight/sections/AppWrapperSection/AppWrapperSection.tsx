import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const sectionsLinks = ["Услуги", "О клинике", "Врачи", "Лечение во сне"];

const patientsLinks = [
  "Контакты",
  "Лечение по ДМС",
  "Налоговый вычет",
  "Цены на услуги",
  "Подарочный сертификат",
  "Юридическая информация",
];

const messagingButtons = [{ label: "В Telegram" }, { label: "В WhatsApp" }];

interface AppWrapperSectionProps {
  onOpenModal: () => void;
}

export const AppWrapperSection = ({
  onOpenModal,
}: AppWrapperSectionProps): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start p-6 md:p-10 lg:p-14 relative bg-[#336699] rounded-2xl md:rounded-[32px]">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-5 pt-0 pb-10 md:pb-[60px] px-0 relative self-stretch w-full flex-[0_0_auto]">
        <img
          className="hidden lg:block relative flex-1 self-stretch grow"
          alt="Container"
          src="/container.svg"
        />

        <nav className="flex flex-col items-start gap-6 lg:gap-11 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[30.4px] tracking-[0] leading-6 md:leading-8">
            Разделы
          </h3>

          <ul className="flex flex-col items-start gap-3 lg:gap-[13px] relative self-stretch w-full flex-[0_0_auto]">
            {sectionsLinks.map((link, index) => (
              <li
                key={index}
                className="flex relative self-stretch w-full flex-[0_0_auto]"
              >
                <a
                  href="#"
                  className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto]"
                >
                  <span className="flex-1 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight text-white text-base md:text-lg lg:text-xl tracking-[0] leading-5">
                    {link}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col items-start gap-6 lg:gap-11 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[30.5px] tracking-[0] leading-6 md:leading-8">
            Пациентам
          </h3>

          <ul className="flex flex-col items-start gap-3 lg:gap-[13px] relative self-stretch w-full flex-[0_0_auto]">
            {patientsLinks.map((link, index) => (
              <li
                key={index}
                className="flex relative self-stretch w-full flex-[0_0_auto]"
              >
                <a
                  href="#"
                  className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto]"
                >
                  <span className="flex-1 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight text-white text-base md:text-lg lg:text-xl tracking-[0] leading-5">
                    {link}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-8 lg:gap-12 relative flex-1 self-stretch w-full lg:grow">
          <h3 className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[29.8px] tracking-[0] leading-6 md:leading-8">
            Контакты
          </h3>

          <div className="flex flex-col items-start gap-6 lg:gap-10 relative self-stretch w-full flex-[0_0_auto]">
            <address className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] not-italic">
              <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-sm md:text-base tracking-[0] leading-4 self-stretch mt-[-1.00px]">
                Адрес
              </span>

              <p className="self-stretch mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight text-white text-base md:text-lg lg:text-xl tracking-[0] leading-5">
                Москва,ул. Советской Армии, 17/52
              </p>

              <div className="flex items-center gap-3 pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-5 h-5 md:w-6 md:h-6" />
                <span className="w-fit [font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base tracking-[0] leading-4">
                  м. Марьина Роща
                </span>
              </div>
            </address>

            <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-sm md:text-base tracking-[0] leading-4 self-stretch mt-[-1.00px]">
                Телефон
              </span>

              <a
                href="tel:+74950856646"
                className="flex items-start px-0 py-[3.5px] relative self-stretch w-full flex-[0_0_auto]"
              >
                <span className="flex-1 text-white text-base md:text-lg lg:text-xl leading-5 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
                  8 (495) 085-66-46
                </span>
              </a>

              <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-sm md:text-base tracking-[0] leading-4 self-stretch mt-[-1.00px] pt-px">
                Пн-пт: 08:00 - 21:00; Сб-вс: 09:00 - 21:00
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-sm md:text-base tracking-[0] leading-4 self-stretch mt-[-1.00px]">
                Напишите нам
              </span>

              <div className="flex flex-wrap items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                {messagingButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="inline-flex min-h-9 md:min-h-10 items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-[#ffffff29] rounded-xl md:rounded-2xl hover:bg-[#ffffff40]"
                  >
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base tracking-[0] leading-4 whitespace-nowrap">
                      {button.label}
                    </span>
                    <div className="relative w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={onOpenModal}
            className="h-10 md:h-12 px-4 md:px-5 py-0 bg-[#ae955f] hover:bg-[#9a8354] rounded-xl md:rounded-2xl w-full lg:w-auto"
          >
            <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base text-center tracking-[0] leading-4">
              Записаться на прием
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 md:pt-8 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] border-t border-white/20">
        <div className="inline-flex flex-col md:flex-row flex-wrap items-start gap-3 md:gap-4 relative flex-[0_0_auto]">
          <p className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-60">
            <span className="text-[#ffffffcc] text-xs md:text-sm lg:text-base leading-4 mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
              Стоматология АГАМИ © 1997-2026
            </span>
          </p>

          <a
            href="#"
            className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-60"
          >
            <span className="mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-xs md:text-sm lg:text-base tracking-[0] leading-4">
              Политика конфиденциальности
            </span>
          </a>
        </div>

        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <div className="inline-flex items-center pt-0 pb-px px-0 relative">
            <span className="mt-[-1.50px] opacity-60 [font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base lg:text-xl tracking-[0] leading-5">
              Сделано в
            </span>
            <a
              href="#"
              className="inline-flex items-start px-0 py-[3.5px] relative flex-[0_0_auto] mt-[-4.00px] mb-[-4.00px]"
            >
              <span className="mt-[-1.00px] [font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base lg:text-xl tracking-[0] leading-5">
                everest
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
