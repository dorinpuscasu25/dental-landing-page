"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Card, CardContent } from "../../components/ui/card";
import { Language, useLanguage } from "../../contexts/LanguageContext";
import { SiteLayout } from "../shared/SiteLayout";

interface PriceItem {
  code: number;
  name: string;
  price: string;
}

interface PriceCategory {
  title: string;
  items: PriceItem[];
}

interface LocalizedPricesCopy {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  subtitle: string;
  updatedFromDoc: string;
  catalogTitle: string;
  catalogDescription: string;
  codeLabel: string;
  serviceLabel: string;
  priceLabel: string;
}

const PRICE_PAGE_COPY: Record<Language, LocalizedPricesCopy> = {
  ro: {
    breadcrumbHome: "Acasă",
    breadcrumbCurrent: "Prețuri",
    title: "Prețuri",
    subtitle:
      "Lista de prețuri a fost actualizată conform documentului clinicii. Planul complet de tratament și costul final se stabilesc după consultație.",
    updatedFromDoc: "Actualizat din documentul clinicii",
    catalogTitle: "Lista serviciilor",
    catalogDescription:
      "Mai jos găsești serviciile grupate pe categorii, exact cum apar în documentul de prețuri.",
    codeLabel: "Cod",
    serviceLabel: "Serviciu",
    priceLabel: "Preț",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Цены",
    title: "Цены",
    subtitle:
      "Прайс-лист обновлен по документу клиники. Полный план лечения и итоговая стоимость подтверждаются после консультации.",
    updatedFromDoc: "Обновлено по документу клиники",
    catalogTitle: "Список услуг",
    catalogDescription:
      "Ниже указаны услуги, сгруппированные по категориям, как в документе с ценами.",
    codeLabel: "Код",
    serviceLabel: "Услуга",
    priceLabel: "Цена",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Prices",
    title: "Prices",
    subtitle:
      "The price list has been updated from the clinic document. The full treatment plan and final cost are confirmed after the consultation.",
    updatedFromDoc: "Updated from the clinic document",
    catalogTitle: "Service list",
    catalogDescription:
      "Below you can find the services grouped by category, matching the clinic price document.",
    codeLabel: "Code",
    serviceLabel: "Service",
    priceLabel: "Price",
  },
};

const PRICE_CATEGORIES: PriceCategory[] = [
  {
    title: "Consultații",
    items: [
      {
        code: 1,
        name: "Consultanță",
        price: "0",
      },
    ],
  },
  {
    title: "Radiologie Viziograf",
    items: [
      {
        code: 2,
        name: "Radiografie -1 imagine",
        price: "100",
      },
      {
        code: 3,
        name: "Radiografie cu ac pe canal + rezultatul obținut -1 imagine",
        price: "100",
      },
    ],
  },
  {
    title: "Profilaxie",
    items: [
      {
        code: 4,
        name: "Periaj profesional dinți permanenți – toți dinții",
        price: "600",
      },
      {
        code: 5,
        name: "Detartraj+Periaj profesional – toți dinții",
        price: "1000",
      },
      {
        code: 6,
        name: "Sablare cu sistem Air Flow+Periaj profesional – toți dinții",
        price: "1000",
      },
    ],
  },
  {
    title: "Terapie",
    items: [
      {
        code: 7,
        name: "Anestezie Infiltrativă",
        price: "150",
      },
      {
        code: 8,
        name: "Obturație foto cu Gradia (plomba dentară)",
        price: "1000",
      },
      {
        code: 9,
        name: "Obturație Foto cu Estelite Asteria (plomba dentară). Clasa Premium",
        price: "1200",
      },
      {
        code: 10,
        name: "Obturație Foto cu Estelite Asteria 2-3 suprafete dentare (plomba dentară). Clasa Premium",
        price: "1500",
      },
      {
        code: 11,
        name: "Obturație Foto cu scop de protejare a dintelui (plomba dentară) cu material Estelite Asteria",
        price: "900",
      },
      {
        code: 12,
        name: "Obturație dentară Provizorie (plomba temporară)",
        price: "150",
      },
      {
        code: 13,
        name: "Obturație Foto (plomba) în axul coroanei (dupa fixarea ei pe implant dentar) cu material Estelite Asteria",
        price: "600",
      },
      {
        code: 14,
        name: "Înlăturarea pivotului vechi",
        price: "350",
      },
      {
        code: 15,
        name: "Pivot fibră de sticlă+Fixare pe ciment dentar Super Dur",
        price: "500",
      },
      {
        code: 16,
        name: "Medicamente endo dinte cu 1 canal radicular",
        price: "350",
      },
      {
        code: 17,
        name: "Medicamente endo dinte cu 2 canale radiculare",
        price: "450",
      },
      {
        code: 18,
        name: "Medicamente endo dinte cu 3 canale radiculare",
        price: "550",
      },
      {
        code: 19,
        name: "Medicamente endo dinte cu 4 canale radiculare",
        price: "650",
      },
      {
        code: 20,
        name: "Endo dinte cu 1 canal radicular",
        price: "800",
      },
      {
        code: 21,
        name: "Reendo dinte cu 1 canal radicular",
        price: "1000",
      },
      {
        code: 26,
        name: "Obturație Foto Zona Frontală cu Estelite Asteria (plomba dentară). Clasa Premium",
        price: "1400",
      },
      {
        code: 27,
        name: "Restaurare estetică cu Estelite Asteria. Clasa Premium",
        price: "1800",
      },
    ],
  },
  {
    title: "Estetică dentară",
    items: [
      {
        code: 22,
        name: "15 min. Albirea dentară în cabinet cu lampa Flash White Smile-Germania. Clasa Premium",
        price: "2400",
      },
      {
        code: 23,
        name: "30 min. Albirea dentară în cabinet cu lampa Flash White Smile-Germania. Clasa Premium",
        price: "4000",
      },
      {
        code: 24,
        name: "45-60 min. Albirea dentară în cabinet cu lampa Flash White Smile-Germania. Clasa Premium",
        price: "6000",
      },
      {
        code: 25,
        name: "Albirea Intracoronară/ dinte devital (per sedință)",
        price: "800",
      },
      {
        code: 28,
        name: "Corectarea estetică a dintelui, prin șlefuire selectivă",
        price: "350",
      },
    ],
  },
  {
    title: "Chirurgie",
    items: [
      {
        code: 29,
        name: "Incizii și drenaj (1 zonă)",
        price: "400",
      },
      {
        code: 30,
        name: "Extracție dinte Permanent (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "1000",
      },
      {
        code: 31,
        name: "Extracție dentară Complicată/cu grad crescut de dificultate (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "1500",
      },
      {
        code: 32,
        name: "Extracție dinte 8/Dinte de minte Maxila (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "1500",
      },
      {
        code: 33,
        name: "Extracție dinte 8/Dinte de minte Mandibular (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "1500",
      },
      {
        code: 34,
        name: "Extracție dinte 8 Semiinclus/Dinte de minte semiinclus (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "2500",
      },
      {
        code: 35,
        name: "Extracție dinte 8 Inclus/Dinte de minte inclus (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "3500",
      },
      {
        code: 36,
        name: "Extracție dinte Inclus. Cu cel mai mare grad de dificultate (Include: anestezie+extracție dinte+chiuretaj+burelet hemostatic+sutură+blocadă+gel medicamentos)",
        price: "7000",
      },
      {
        code: 37,
        name: "Plastie Gingivală – 1 maxilar",
        price: "2000",
      },
      {
        code: 38,
        name: "Gingivectomie si Gingivoplastie (1 zona) cu scop Estetic si Morfologic",
        price: "700",
      },
      {
        code: 39,
        name: "Gingivectomie si Gingivoplastie (toata zona frontala) cu scop Estetic si Morfologic (1 maxilar, 6-8 dinți din zona frontală)",
        price: "2000",
      },
      {
        code: 40,
        name: "Chiuretaj parodontal",
        price: "500",
      },
      {
        code: 41,
        name: "Rețetă Apicală – 1 dinte",
        price: "2000",
      },
      {
        code: 42,
        name: "Înlăturarea Suturilor/Firelor",
        price: "0",
      },
      {
        code: 66,
        name: "Reabilitare all on 4",
        price: "44000",
      },
      {
        code: 67,
        name: "Reabilitare all on 6",
        price: "58000",
      },
      {
        code: 68,
        name: "Reabilitare all on 8",
        price: "68000",
      },
    ],
  },
  {
    title: "Implantologie",
    items: [
      {
        code: 43,
        name: "Implant dentar ,,MegaGen” – Coreea. Clasa Premium",
        price: "7000",
      },
      {
        code: 44,
        name: "Fixare Conformator de gingii",
        price: "800",
      },
      {
        code: 45,
        name: "Adiție osoasă ( Îngroșare os cu material clasa Premium )",
        price: "1500",
      },
      {
        code: 46,
        name: "Sinus Lifting (închis)",
        price: "8000",
      },
      {
        code: 47,
        name: "Sinus Lifting (deschis)",
        price: "12000",
      },
    ],
  },
  {
    title: "Protetică",
    items: [
      {
        code: 48,
        name: "Amprentă dentară",
        price: "600",
      },
      {
        code: 49,
        name: "Coroana MC pe Bont Dentar",
        price: "2500",
      },
      {
        code: 50,
        name: "Coroana Zirconiu Stratificat pe bont dentar. Clasa Premium",
        price: "5000",
      },
      {
        code: 51,
        name: "Coroana Provizorie (temporară)",
        price: "1000",
      },
      {
        code: 52,
        name: "Coroana MC pe Implant",
        price: "5000",
      },
      {
        code: 53,
        name: "Coroana Zirconiu Stratificat pe Implant. Clasa Premium",
        price: "6000",
      },
      {
        code: 54,
        name: "Corp Acrilic Provizoriu (temporar) pe Implant dentar",
        price: "2000",
      },
      {
        code: 55,
        name: "Cimentare – 1 coroană dentară",
        price: "400",
      },
      {
        code: 56,
        name: "Recimentare – 1 coroană dentară",
        price: "400",
      },
      {
        code: 57,
        name: "Secționare și Inlaturarea Coroanei, de pe dinte natural",
        price: "600",
      },
      {
        code: 58,
        name: "Secționare și Inlaturarea Coroanei, de pe implant dentar",
        price: "800",
      },
      {
        code: 59,
        name: "Proteza acrilică cu Plasa metalică cu coroane individuale (mobilizabilă)",
        price: "0",
      },
      {
        code: 60,
        name: "Proteza flexibilă Biodent-Plast (mobilizabilă)",
        price: "0",
      },
      {
        code: 61,
        name: "Proteza Scheletată Mobilizabilă",
        price: "0",
      },
      {
        code: 62,
        name: "Proteza Scheletată + 2 elemente speciale de ancorare",
        price: "0",
      },
    ],
  },
  {
    title: "Parodontologie",
    items: [
      {
        code: 63,
        name: "Injectabil Plasmolifting",
        price: "1250",
      },
    ],
  },
  {
    title: "Pedodonție",
    items: [
      {
        code: 64,
        name: "Sigilarea fisurilor dentare",
        price: "250",
      },
      {
        code: 65,
        name: "Gel fluorizat – pentru dinți",
        price: "150",
      },
    ],
  },
];

const formatPrice = (value: string) =>
  `${Number(value).toLocaleString("ro-RO")} MDL`;

export const PricesPage = () => {
  const { language } = useLanguage();
  const copy = PRICE_PAGE_COPY[language];

  return (
    <SiteLayout headerSource="prices_header" footerSource="prices_footer">
      {() => (
        <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-6 md:py-10 relative">
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Link
              href="/"
              className="text-[#1d252d99] font-extralight hover:text-[#336699] transition-colors"
            >
              {copy.breadcrumbHome}
            </Link>
            <span className="text-[#1d252d99]">|</span>
            <span className="text-[#336699] font-normal">
              {copy.breadcrumbCurrent}
            </span>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <div>
              <h1 className="font-normal text-[#336699] text-5xl md:text-7xl lg:text-[120px] tracking-[-3px] md:tracking-[-5px] leading-tight md:leading-[100px] mb-4 md:mb-6">
                {copy.title}
              </h1>
            </div>
            <div className="flex items-start lg:items-end">
              <p className="font-normal text-[#336699] text-lg md:text-2xl lg:text-[32px] tracking-[-0.5px] md:tracking-[-1px] leading-6 md:leading-[38px]">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0 mt-6 md:mt-10">
            <CardContent className="p-5 md:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-[#33669912] text-[#336699] text-xs md:text-sm font-medium mb-4">
                    {copy.updatedFromDoc}
                  </span>
                  <h2 className="font-normal text-[#336699] text-2xl md:text-3xl lg:text-[42px] tracking-[-0.5px] md:tracking-[-1px] leading-8 md:leading-[48px]">
                    {copy.catalogTitle}
                  </h2>
                </div>
                <p className="font-extralight text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 max-w-[520px]">
                  {copy.catalogDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-5 md:p-8 lg:p-10">
              <Accordion type="multiple" className="w-full space-y-4">
                {PRICE_CATEGORIES.map((category) => (
                  <AccordionItem
                    key={category.title}
                    value={category.title}
                    className="border-0 bg-[#f5f7fa] rounded-2xl md:rounded-[24px] overflow-hidden data-[state=open]:bg-[#336699]"
                  >
                    <AccordionTrigger className="px-4 md:px-6 py-4 md:py-5 hover:no-underline [&[data-state=open]]:text-white [&[data-state=closed]]:text-[#336699]">
                      <div className="flex items-center justify-between gap-4 w-full pr-2 md:pr-4 text-left">
                        <span className="font-normal text-base md:text-xl lg:text-2xl tracking-[-0.5px] leading-6 md:leading-7">
                          {category.title}
                        </span>
                        <span className="font-light text-sm md:text-base whitespace-nowrap">
                          {category.items.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 md:px-6 pb-5 md:pb-6">
                      <div className="hidden md:grid md:grid-cols-[80px,1fr,140px] gap-4 pb-3 border-b border-white/20">
                        <span className="text-white/80 text-sm font-light">
                          {copy.codeLabel}
                        </span>
                        <span className="text-white/80 text-sm font-light">
                          {copy.serviceLabel}
                        </span>
                        <span className="text-white/80 text-sm font-light text-right">
                          {copy.priceLabel}
                        </span>
                      </div>

                      <div className="space-y-3 md:space-y-0">
                        {category.items.map((item) => (
                          <div
                            key={item.code}
                            className="grid grid-cols-1 md:grid-cols-[80px,1fr,140px] gap-2 md:gap-4 py-3 md:py-4 border-b border-white/15 last:border-b-0"
                          >
                            <div className="flex items-center gap-2 md:block">
                              <span className="md:hidden text-white/70 text-xs">
                                {copy.codeLabel}:
                              </span>
                              <span className="text-white text-sm md:text-base font-light">
                                {item.code}
                              </span>
                            </div>

                            <div className="flex items-start gap-2 md:block">
                              <span className="md:hidden text-white/70 text-xs">
                                {copy.serviceLabel}:
                              </span>
                              <span className="text-white text-sm md:text-base font-light leading-5 md:leading-6">
                                {item.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 md:justify-end">
                              <span className="md:hidden text-white/70 text-xs">
                                {copy.priceLabel}:
                              </span>
                              <span className="text-white text-sm md:text-base font-normal whitespace-nowrap">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}
    </SiteLayout>
  );
};
