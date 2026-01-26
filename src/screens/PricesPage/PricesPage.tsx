import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { NavigationHeaderSection } from "../ElementLight/sections/NavigationHeaderSection";
import { AppointmentModal } from "../../components/AppointmentModal";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslations } from "../../translations";

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  description?: string;
  items: ServiceItem[];
  includes?: string[];
}

const pricingPolicyItems = [
  {
    badge: "Не изменяем цены в процессе",
    title: "Фиксируем цены",
    description:
      "Стоимость услуг после подписания сметы останется неизменной на протяжении всего лечения, даже если оно займет несколько месяцев или даже лет.",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    badge: "Все включено",
    title: "Нет скрытых платежей",
    description:
      "Наши цены сразу включают все необходимые сопутствующие манипуляции, которые не оплачиваются отдельно.",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    badge: "Поэтапная оплата",
    title: "Индивидуальный план оплаты",
    description:
      "Оплата происходит по этапам. План оплат составляется индивидуально вместе с планом лечения.",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    badge: "Все платежи официально",
    title: "Налоговый вычет",
    description:
      "Подготовим и предоставим все необходимые документы для получения налогового вычета.",
    bgColor: "bg-[#ae955f1f]",
  },
];

const servicesData: ServiceCategory[] = [
  {
    title: "Консультация стоматолога",
    items: [
      { name: "Комплексная консультация стоматолога", price: "3 000 ₽" },
      {
        name: "Повторная консультация стоматолога (для пациентов, ранее уже проходивших лечение в АГАМИ)",
        price: "Бесплатно",
      },
      {
        name: "Комплексная консультация главного врача клиники, кандидата медицинских наук Солоп М.В.",
        price: "5 000 ₽",
      },
      { name: "Компьютерная томография (КТ)", price: "5 600 ₽" },
    ],
    includes: [
      "Панорамный и прицельные рентгенологические снимки (при необходимости)",
      "Комплексная консультация стоматолога с привлечением всех необходимых узких специалистов - терапевта, ортопеда, хирурга, пародонтолога.",
      "Осмотр полости рта с подробной консультацией и постановкой диагноза",
      "Фотопротоколирование и 3D-сканирование полости рта (при необходимости)",
      "Составление подробных вариантов плана и сметы лечения по вашему случаю",
    ],
  },
  {
    title: "Компьютерная томография зубов",
    items: [{ name: "Компьютерная томография зубов", price: "5 600 ₽" }],
  },
  {
    title:
      "Консультация главного врача, кандидата медицинских наук Солоп М.В.",
    items: [
      {
        name: "Консультация главного врача, кандидата медицинских наук Солоп М.В.",
        price: "5 000 ₽",
      },
    ],
  },
];

const therapeuticServicesData: ServiceCategory[] = [
  {
    title: "Лечение кариеса",
    items: [
      { name: "Лечение кариеса (1 поверхность)", price: "от 9 200 ₽" },
      { name: "Лечение кариеса (2 поверхности)", price: "от 10 800 ₽" },
      { name: "Лечение кариеса (3 поверхности)", price: "от 12 400 ₽" },
    ],
  },
  {
    title: "Распломбирование каналов (эндодонтия)",
    items: [
      {
        name: "Распломбирование 1 канала пастой",
        price: "от 14 400 ₽",
      },
      {
        name: "Распломбирование 1 канала цементом",
        price: "от 17 200 ₽",
      },
    ],
  },
  {
    title: "Пломбирование каналов (эндодонтия)",
    items: [
      { name: "Пломбирование 1 канала", price: "от 17 200 ₽" },
      { name: "Пломбирование 2 каналов", price: "от 23 600 ₽" },
      { name: "Пломбирование 3 каналов", price: "от 29 200 ₽" },
    ],
  },
];

interface PricesPageProps {
  onOpenModal: () => void;
}

export const PricesPage = ({ onOpenModal }: PricesPageProps): JSX.Element => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [activeTab, setActiveTab] = useState("consultation");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: "consultation", label: "Консультация и диагностика" },
    { id: "therapeutic", label: "Терапевтическое лечение" },
    { id: "surgery", label: "Хирургическая стоматология" },
    { id: "implants", label: "Имплантация зубов" },
    { id: "orthopedics", label: "Остеопластика и синуслифтинг" },
    { id: "prosthetics", label: "Протезирование зубов" },
  ];

  return (
    <>
      <NavigationHeaderSection onOpenModal={() => setIsModalOpen(true)} />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex flex-col w-full min-h-screen bg-[#f5f7fa]">
        <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-6 md:py-10 relative">
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <Link to="/" className="text-[#1d252d99] [font-family:'Manrope',Helvetica] font-extralight hover:text-[#336699] transition-colors">
            Главная
          </Link>
          <span className="text-[#1d252d99]">|</span>
          <span className="text-[#336699] [font-family:'Manrope',Helvetica] font-normal">
            Цены
          </span>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div>
            <h1 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-5xl md:text-7xl lg:text-[120px] tracking-[-3px] md:tracking-[-5px] leading-tight md:leading-[100px] mb-4 md:mb-6">
              Цены
            </h1>
          </div>
          <div className="flex items-start lg:items-end">
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-lg md:text-2xl lg:text-[32px] tracking-[-0.5px] md:tracking-[-1px] leading-6 md:leading-[38px]">
              Ниже указаны цены по основным направлениям, после консультации
              составим индивидуальный план и смету
            </p>
          </div>
        </div>

        <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0 mt-6 md:mt-10">
          <CardContent className="p-5 md:p-10">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-3xl lg:text-[42px] tracking-[-0.5px] md:tracking-[-1px] leading-8 md:leading-[48px] mb-6 md:mb-10">
              Наша ценовая политика
              <br />
              отличается от большинства клиник
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {pricingPolicyItems.map((item, index) => (
                <Card
                  key={index}
                  className={`${item.bgColor} rounded-2xl md:rounded-[24px] border-0`}
                >
                  <CardContent className="p-5 md:p-6 flex flex-col min-h-[240px] md:min-h-[280px]">
                    <Badge className="h-6 md:h-7 px-2.5 md:px-3 bg-white hover:bg-white/90 rounded-lg md:rounded-xl [font-family:'Manrope',Helvetica] font-extralight text-[10px] md:text-xs text-[#ae955f] mb-3 md:mb-4 w-fit">
                      {item.badge}
                    </Badge>
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-lg md:text-xl tracking-[-0.5px] leading-6 md:leading-7 mb-2 md:mb-3">
                      {item.title}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-xs md:text-sm leading-5">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0 mt-4 md:mt-5">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="flex gap-3 md:gap-4 px-5 md:px-10 pt-6 md:pt-10 pb-4 md:pb-6 border-b border-[#1d252d1f] min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 md:px-4 py-2 rounded-lg [font-family:'Manrope',Helvetica] text-xs md:text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-[#336699] text-white font-normal"
                        : "text-[#1d252d99] font-extralight hover:bg-[#1d252d0d]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 md:px-10 py-5 md:py-6">
              {activeTab === "consultation" && (
                <div className="space-y-4">
                  <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-3xl lg:text-[42px] tracking-[-0.5px] md:tracking-[-1px] leading-8 md:leading-[48px] mb-4 md:mb-6">
                    Консультация и диагностика
                  </h2>
                  <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 mb-6 md:mb-8">
                    Комплексная консультация стоматолога по всем имеющимся
                    проблемам в полости рта
                  </p>

                  {servicesData.map((category, idx) => (
                    <ServiceAccordion
                      key={idx}
                      category={category}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {activeTab === "therapeutic" && (
                <div className="space-y-4">
                  <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-3xl lg:text-[42px] tracking-[-0.5px] md:tracking-[-1px] leading-8 md:leading-[48px] mb-4 md:mb-6">
                    Терапевтическое лечение
                  </h2>
                  <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 mb-6 md:mb-8">
                    Восстановление и реставрация зубов при незначительных
                    повреждениях зубов.
                  </p>

                  {therapeuticServicesData.map((category, idx) => (
                    <ServiceAccordion
                      key={idx}
                      category={category}
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
};

const ServiceAccordion = ({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={`item-${index}`}
        className="border-0 bg-[#f5f7fa] rounded-2xl md:rounded-[20px] mb-3 md:mb-4 overflow-hidden data-[state=open]:bg-[#336699]"
      >
        <AccordionTrigger className="px-4 md:px-6 py-4 md:py-5 hover:no-underline [&[data-state=open]]:text-white [&[data-state=closed]]:text-[#336699]">
          <div className="flex items-center justify-between w-full pr-2 md:pr-4">
            <span className="[font-family:'Inter',Helvetica] font-normal text-base md:text-xl lg:text-2xl tracking-[-0.5px] leading-6 md:leading-7 text-left">
              {category.title}
            </span>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="[font-family:'Manrope',Helvetica] font-light text-sm md:text-lg whitespace-nowrap">
                {category.items.length === 1
                  ? category.items[0].price
                  : `от ${category.items[0].price}`}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 md:px-6 pb-5 md:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-3 md:space-y-4">
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-start justify-between gap-3 md:gap-4 py-2 md:py-3"
                >
                  <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm leading-5 flex-1">
                    {item.name}
                  </span>
                  <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm md:text-base whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {category.includes && (
              <div className="bg-[#ae955f1f] rounded-2xl md:rounded-[20px] p-4 md:p-6">
                <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-base md:text-lg tracking-[-0.5px] leading-6 mb-3 md:mb-4">
                  Что входит в цену услуги?
                </h4>
                <div className="space-y-2.5 md:space-y-3">
                  {category.includes.map((item, includeIdx) => (
                    <div key={includeIdx} className="flex items-start gap-2.5 md:gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#ae955f] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                      </div>
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-xs md:text-sm leading-5">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
