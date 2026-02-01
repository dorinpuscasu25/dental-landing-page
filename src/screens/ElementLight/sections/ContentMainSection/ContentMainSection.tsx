import { useState, useRef } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslations } from "../../../../translations";

const teamMembers = [
  {
    name: "Солоп Мария Владимировна",
    role: "Стоматолог-хирург, имплантолог, пародонтолог. Главный врач.",
    experience: "16 лет опыта",
    degree: "Кандидат медицинских наук",
    image: "/img.png",
  },
  {
    name: "Романовский Кирилл Владимирович",
    role: "Стоматолог-хирург, имплантолог.",
    experience: "15 лет опыта",
    image: "/img-1.png",
  },
  {
    name: "Карпович Радион Юрьевич",
    role: "Стоматолог-хирург, имплантолог.",
    experience: "12 лет опыта",
    image: "/img-2.png",
  },
];

const specialtyFilters = [
  { label: "Все (22)", active: true },
  { label: "Хирурги (4)", active: false },
  { label: "Ортопеды (4)", active: false },
  { label: "Терапевты (5)", active: false },
  { label: "Ортодонты (3)", active: false },
  { label: "Гигиенисты (3)", active: false },
  { label: "Гнатологи (1)", active: false },
  { label: "Анестезиологи-реаниматологи (3)", active: false },
  { label: "Рентгенологи (1)", active: false },
];

const trustReasons = [
  {
    title: "Calitate, nu cantitate",
    description:
      "Tratăm fiecare pacient cu timp, atenție și soluții corecte din prima, pentru rezultate sigure și durabile.",
    badge: "Calitate",
    image: "/----------------------.png",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    title:
      "Experiența echipei + Tehnologia = Servicii stomatologice de înaltă calitate.",
    badge: "Garanția calității",
    bgColor: "bg-[#336699]",
    textColor: "text-white",
  },
  {
    title: "Abordare individuală",
    description:
      "Selectăm echipa medicală potrivită pentru soluționarea rapidă și eficientă a tuturor solicitărilor tale.",
    badge: "Abordare individuală",
    image: "/---------------------.png",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    title: "5 specialiști",
    description: "în diferite ramuri ale stomatologiei și medicinei, dedicați tratamentelor sigure, personalizate și durabile.",
    badge: "Experți în domeniul lor",
    image: "/------20-------------.png",
    bgColor: "bg-[#ae955f1f]",
    hasOverlay: true,
  },
  {
    title: "Tehnologii moderne",
    description:
      "Clinica noastră este echipată conform standardelor internaționale, pentru tratamente precise și sigure.",
    badge: "Tehnologii moderne",
    bgColor: "bg-[#ae955f1f]",
  },
];

const ratingPlatforms = [
  { name: "Яндекс", rating: "4,9", logo: "/-----------.png" },
  { name: "Google", rating: "4,6", logo: "/google.png" },
  { name: "2GIS", rating: "4,8", logo: "/2gis.png" },
  { name: "ПроДокторов", rating: "4,8", logo: "/------.png" },
];

const services = [
  {
    category: "Salvarea zâmbetului tău",
    title: "Tratamentul cariilor",
    description: "Tratament atent și restaurarea dinților",
    image: "/---------------.png",
    large: true,
  },
  {
    category: "Soluție rapidă pentru problemă",
    title: "Extracții dentare",
    description:
      "Extracții dentare atente și nedureroase chiar și în cazuri complexe",
    image: "/--------------.png",
  },
  {
    category: "Refacerea zâmbetului tău",
    title: "Implanturi dentare",
    description:
      "Instalarea unui analog al rădăcinii dintelui cu instalarea ulterioară a coroanei pe implant",
    image: "/-----------------.png",
  },
  {
    category: "Grijă pentru zâmbetul tău",
    title: "Igienă profesională",
    description:
      "Curățare eficientă a plăcii bacteriene, potrivită pentru dinți și gingii sensibile",
    image: "/------------------------.png",
  },
  {
    category: "Pentru a stabili planul de tratament",
    title: "Consultație complexă",
    description:
      "Evaluare cuprinzătoare a stării dinților și a întregii cavități orale și elaborarea variantelor de rezolvare a problemelor",
    image: "/-------------------------1.png",
  },
];

const avatarImages = ["/i.png", "/i-1.png", "/i-2.png", "/i-3.png", "/i-4.png"];

interface ContentMainSectionProps {
  onOpenModal: () => void;
}

export const ContentMainSection = ({
  onOpenModal,
}: ContentMainSectionProps): JSX.Element => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const trustScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollTrust = (direction: "left" | "right") => {
    if (trustScrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        trustScrollRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      trustScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(() => {
        if (trustScrollRef.current) {
          setCanScrollLeft(trustScrollRef.current.scrollLeft > 0);
          setCanScrollRight(
            trustScrollRef.current.scrollLeft <
              trustScrollRef.current.scrollWidth -
                trustScrollRef.current.clientWidth
          );
        }
      }, 300);
    }
  };

  return (
    <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-0 relative">
      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] overflow-hidden border-0">
        <CardContent className="flex items-start justify-center pl-4 pr-4 md:pr-[200px] lg:pr-[800px] pt-[250px] md:pt-[350px] lg:pt-[402.75px] pb-4 relative p-0">
          <div className="absolute w-full h-full top-0 left-0 bg-[url(/bloc1_copy.jpg)] bg-cover bg-center" />
          <div className="gap-4 md:gap-6 p-6 md:p-10 flex-1 backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] flex flex-col items-start relative bg-[#ffffffcc] rounded-2xl md:rounded-[28px]">
            <h1 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-3xl lg:text-[45.2px] tracking-[-1.2px] md:tracking-[-1.92px] leading-8 md:leading-[48px]">
              {t.hero.title}
            </h1>
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-lg md:text-xl lg:text-3xl tracking-[-0.30px] md:tracking-[-0.50px] leading-6 md:leading-8 whitespace-pre-line">
              {t.hero.subtitle}
            </p>
            <div className="pt-4 md:pt-10">
              <Button
                onClick={onOpenModal}
                className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-xl md:rounded-2xl"
              >
                <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                  {t.hero.bookButton}
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-col lg:flex-row min-h-32 md:min-h-52 gap-4 md:gap-5">
              <div className="flex-1 flex items-center pt-6 md:pt-10 px-5 md:px-10">
                <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-3xl md:text-5xl lg:text-[74.8px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px]">
                  {t.about.title}
                </h2>
              </div>
              <div className="flex-1 flex gap-3 md:gap-5">
                <Card className="flex-1 bg-[#ae955f1f] rounded-2xl md:rounded-[28px] border-0">
                  <CardContent className="flex flex-col gap-6 md:gap-12 p-5 md:p-10">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-3xl md:text-5xl lg:text-[73.1px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px]">
                      {t.about.years}
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-sm md:text-base">
                      {t.about.yearsText}
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1 bg-[#ae955f1f] rounded-2xl md:rounded-[28px] border-0">
                  <CardContent className="flex flex-col gap-6 md:gap-12 p-5 md:p-10">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-3xl md:text-5xl lg:text-[70.9px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px]">
                      {t.about.patients}
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-sm md:text-base">
                      {t.about.patientsText}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
              <div className="flex-1 flex flex-col gap-5 md:gap-8">
                <div className="flex flex-col items-end gap-3 md:gap-4">
                  <blockquote className="pl-5 md:pl-10 pr-2.5 [font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-lg md:text-2xl lg:text-[37.5px] tracking-[-1px] md:tracking-[-1.60px] leading-7 md:leading-10">
                    {t.about.quote}
                  </blockquote>
                  <div className="flex flex-col gap-1.5 md:gap-2 pl-5">
                    <div className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d] text-base md:text-lg">
                      {t.about.founderName}
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-xs md:text-sm opacity-40">
                      {t.about.founderTitle}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                  <div className="flex-1 flex flex-col justify-center pl-5 md:pl-10">
                    {t.about.description && (
                      <p className="text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 [font-family:'Manrope',Helvetica] font-extralight mb-6 md:mb-8">
                        {t.about.description}
                      </p>
                    )}
                    <Button
                      variant="secondary"
                      className="h-9 md:h-10 px-3 md:px-4 bg-[#33669914] hover:bg-[#33669914]/80 rounded-xl md:rounded-2xl w-fit"
                    >
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-sm md:text-base">
                        {t.about.moreButton}
                      </span>
                    </Button>
                  </div>
                  <div className="flex-1 rounded-2xl md:rounded-[28px] bg-[url(/bg.png)] bg-cover bg-center min-h-[250px] md:min-h-[336px]" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl md:rounded-[28px] bg-[url(/bg-1.png)] bg-cover bg-center min-h-[400px] md:min-h-[602px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="flex flex-col gap-12 md:gap-24 p-3 md:p-4">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
            <div className="flex-1 flex items-center pt-6 md:pt-10 px-5 md:px-10">
              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-3xl md:text-5xl lg:text-[76.1px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px]">
                {t.team.title}
              </h2>
            </div>
            <Card className="flex-1 bg-[#336699] rounded-2xl md:rounded-[28px] border-0">
              <CardContent className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                  <div className="flex-1">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white text-lg md:text-2xl tracking-[-0.30px] md:tracking-[-0.50px] leading-6 md:leading-7 mb-8 md:mb-12 whitespace-pre-line">
                      {t.team.specialists}
                    </p>
                    <div className="flex items-center">
                      {avatarImages.map((img, index) => (
                        <Avatar
                          key={index}
                          className="w-10 h-10 md:w-[50px] md:h-[50px] -ml-2 md:-ml-2.5 first:ml-0 border-2 border-[#336699]"
                        >
                          <AvatarImage src={img} className="object-cover" />
                        </Avatar>
                      ))}
                      <div className="flex w-10 h-10 md:w-[50px] md:h-[50px] -ml-2 md:-ml-2.5 items-center justify-center bg-white rounded-full border-2 border-[#336699]">
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-xs md:text-sm">
                          5 +
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-xs md:text-sm leading-4 md:leading-5 mb-6 md:mb-8">
                      {t.team.description}
                    </p>
                    <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-xl md:rounded-2xl">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                        {t.team.allTeamButton}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="p-3 md:p-4">
          <div className="pt-6 md:pt-10 pb-4 md:pb-6 px-5 md:px-10 flex items-center justify-between">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-4xl lg:text-[74.7px] tracking-[-1.5px] md:tracking-[-3.20px] leading-8 md:leading-[64px]">
              {t.trust.title}
            </h2>
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => scrollTrust("left")}
                disabled={!canScrollLeft}
                className="w-12 h-12 md:w-14 md:h-14 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-xl md:rounded-2xl disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                size="icon"
                onClick={() => scrollTrust("right")}
                disabled={!canScrollRight}
                className="w-12 h-12 md:w-14 md:h-14 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </Button>
            </div>
          </div>
          <div className="w-full relative">
            <div
              ref={trustScrollRef}
              className="flex gap-5 pl-4 md:pl-14 pr-4 pb-10 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {trustReasons.map((reason, index) => (
                  <Card
                    key={index}
                    className={`min-w-[300px] max-w-[300px] ${reason.bgColor} rounded-[24px] overflow-hidden border-0 flex-shrink-0`}
                  >
                    <CardContent className="p-1 flex flex-col relative min-h-[260px]">
                      {reason.image && (
                        <div
                          className="relative h-[120px] rounded-[20px] overflow-hidden z-[1] bg-cover bg-center"
                          style={{ backgroundImage: `url(${reason.image})` }}
                        >
                          <Badge
                            className="absolute top-2 left-2 h-6 px-2 bg-white hover:bg-white/90 rounded-xl [font-family:'Manrope',Helvetica] font-extralight text-xs"
                            style={{
                              color:
                                reason.textColor === "text-white"
                                  ? "#336699"
                                  : "#ae955f",
                            }}
                          >
                            {reason.badge}
                          </Badge>
                        </div>
                      )}
                      {!reason.image && (
                        <div className="relative h-px z-[1]">
                          <Badge className="absolute top-2 left-2 h-6 px-2 bg-white hover:bg-white/90 rounded-xl [font-family:'Manrope',Helvetica] font-extralight text-xs text-[#336699]">
                            {reason.badge}
                          </Badge>
                        </div>
                      )}
                      <div
                        className={`flex-1 flex flex-col ${reason.hasOverlay ? "justify-end pt-[140px]" : "justify-start pt-3"} pb-3 px-3 z-0`}
                      >
                        {reason.hasOverlay ? (
                          <div className="p-3 backdrop-blur-[27px] bg-[#ffffffcc] rounded-[20px]">
                            <h3
                              className={`[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-base tracking-[-0.50px] leading-6 mb-2`}
                            >
                              {reason.title}
                            </h3>
                            {reason.description && (
                              <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-xs leading-4">
                                {reason.description}
                              </p>
                            )}
                          </div>
                        ) : (
                          <>
                            <h3
                              className={`[font-family:'Inter',Helvetica] font-normal ${reason.textColor || "text-[#ae955f]"} text-base tracking-[-0.50px] leading-6 mb-2`}
                            >
                              {reason.title}
                            </h3>
                            {reason.description && (
                              <p
                                className={`[font-family:'Manrope',Helvetica] font-extralight ${reason.textColor === "text-white" ? "text-white" : "text-[#1d252d]"} text-xs leading-4`}
                              >
                                {reason.description}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      {reason.hasOverlay && (
                        <div
                          className="absolute w-full h-full top-0 left-0 z-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${reason.image})` }}
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="flex flex-col gap-4 p-3 md:p-4">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
            <div className="flex-1 flex items-center pt-6 md:pt-10 px-5 md:px-10">
              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-2xl lg:text-[37.2px] tracking-[-1px] md:tracking-[-1.60px] leading-7 md:leading-10 whitespace-pre-line">
                {t.ratings.title}
              </h2>
            </div>
            <Card className="flex-1 bg-[#336699] rounded-2xl md:rounded-[28px] border-0">
              <CardContent className="p-6 md:p-10">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[29.9px] leading-7 md:leading-8 mb-8 md:mb-12">
                  {t.ratings.independent}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {ratingPlatforms.map((platform, index) => (
                    <Card
                      key={index}
                      className="bg-[#ffffff1f] rounded-2xl md:rounded-[32px] border-0"
                    >
                      <CardContent className="flex flex-col justify-between p-4 md:p-6 min-h-[110px] md:min-h-[134px]">
                        <div
                          className="h-[18px] md:h-[22px] bg-contain bg-no-repeat bg-center"
                          style={{ backgroundImage: `url(${platform.logo})` }}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-lg md:text-xl">
                              {platform.rating}
                            </span>
                          </div>
                          <div className="flex w-8 h-8 md:w-10 md:h-10 items-center justify-center bg-[#ffffff29] rounded-lg md:rounded-xl">
                            <div className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#0035690a] rounded-2xl md:rounded-[28px] border-0">
            <CardContent className="flex flex-col gap-8 md:gap-12 p-6 md:p-10">
              <div className="flex items-center justify-between">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-2xl lg:text-[30.4px] leading-7 md:leading-8">
                  {t.ratings.awards}
                </h3>
                <div className="hidden md:flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-12 h-12 md:w-14 md:h-14 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-xl md:rounded-2xl"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rotate-180" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 md:w-14 md:h-14 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8" />
                  </Button>
                </div>
              </div>
              <img className="w-full" alt="Container" src="/container-5.svg" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="flex flex-col items-center gap-8 md:gap-12 pt-8 md:pt-14 pb-4 px-4">
          <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-3xl md:text-5xl lg:text-[74.7px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px] w-full max-w-[1468px]">
            {t.services.title}
          </h2>

          <div className="flex flex-col gap-4 md:gap-5 w-full">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
              <div className="flex-1 flex flex-col gap-4 md:gap-6 pl-0 md:pl-10">
                {t.services.subtitle && (
                  <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-2xl lg:text-[37.5px] tracking-[-1px] md:tracking-[-1.60px] leading-7 md:leading-10 max-w-[580px] whitespace-pre-line">
                    {t.services.subtitle}
                  </h3>
                )}
                <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl w-fit">
                  <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                    {t.services.allServicesButton}
                  </span>
                </Button>
              </div>
              <Card className="flex-1 bg-[#0035690a] rounded-2xl md:rounded-[28px] overflow-hidden border-0 relative min-h-64 md:min-h-80">
                <CardContent className="p-6 md:p-10 flex flex-col justify-between h-full">
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-base md:text-lg">
                    {services[0].category}
                  </p>
                  <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-lg md:text-xl lg:text-[22.3px] leading-6 md:leading-7">
                    {services[0].title}
                  </h4>
                  <div className="absolute top-[calc(50%-80px)] md:top-[calc(50%-105px)] right-0 w-[160px] h-[160px] md:w-[210px] md:h-[210px] bg-white rounded-2xl md:rounded-[32px] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${services[0].image})` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {services.slice(1).map((service, index) => (
                <Card
                  key={index}
                  className="bg-[#0035690a] rounded-2xl md:rounded-[28px] overflow-hidden border-0 relative min-h-64 md:min-h-80"
                >
                  <CardContent className="p-6 md:p-10 flex flex-col justify-between h-full">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-base md:text-lg">
                      {service.category}
                    </p>
                    <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-lg md:text-xl lg:text-[22.3px] leading-6 md:leading-7">
                      {service.title}
                    </h4>
                    <div className="absolute top-0 right-0 w-20 h-20 md:w-[100px] md:h-[100px] bg-white rounded-2xl md:rounded-3xl overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
              <Card className="bg-[#ae955f1f] rounded-2xl md:rounded-[28px] border-0">
                <CardContent className="p-6 md:p-10 flex gap-5 min-h-[280px] md:min-h-[344px]">
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-xl md:text-2xl lg:text-[30.1px] leading-7 md:leading-8 mb-4 md:mb-6 whitespace-pre-line">
                      {t.services.pricing}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-xs md:text-sm leading-4 md:leading-5 mb-8 md:mb-12">
                      {t.services.pricingDescription}
                    </p>
                    <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ae955f2e] hover:bg-[#ae955f2e]/80 rounded-xl md:rounded-2xl w-fit">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-sm md:text-base">
                        {t.services.pricesButton}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#336699] rounded-2xl md:rounded-[40px] border-0 relative overflow-hidden">
                <CardContent className="p-6 md:p-10 flex gap-5 min-h-[280px] md:min-h-[344px]">
                  <div className="flex-1 flex flex-col justify-between z-10">
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-xl md:text-2xl lg:text-[29.9px] leading-7 md:leading-8 mb-4 md:mb-6">
                      Лечим зубы
                      <br />
                      во сне под седацией
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ffffffcc] text-xs md:text-sm leading-4 md:leading-5 mb-8 md:mb-12">
                      Комфортное лечение зубов без страха, стресса и неприятных
                      воспоминаний под полным контролем врача-анестезиолога
                    </p>
                    <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-xl md:rounded-2xl w-fit">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                        Подробнее
                      </span>
                    </Button>
                  </div>
                  <div
                    className="hidden md:block absolute -top-8 right-2 w-[calc(50%+24px)] h-[calc(100%+64px)] rounded-[32px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(/------------br---------------------.png)",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
        <div
          className="flex-1 min-h-[300px] md:min-h-[500px] rounded-2xl md:rounded-[28px] bg-cover bg-center"
          style={{ backgroundImage: "url(/--------------------.png)" }}
        />
        <Card className="flex-1 bg-white rounded-2xl md:rounded-[28px] overflow-hidden border-0">
          <CardContent className="flex flex-col justify-between px-6 md:px-10 py-8 md:py-14 min-h-[300px] md:min-h-[500px]">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-2xl lg:text-3xl leading-7 md:leading-8 mb-4 md:mb-6">
              Лечение зубов во сне
            </h3>
            <div className="mb-4 md:mb-6">
              <p className="[font-family:'Inter',Helvetica] font-normal text-2xl md:text-3xl lg:text-[45.6px] tracking-[-1.2px] md:tracking-[-1.92px] leading-8 md:leading-[50px]">
                <span className="text-[#ae955f]">
                  Скидка 15% на седацию
                  <br />
                </span>
                <span className="text-[#1d252d]">до 31 января 2026 года</span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d99] text-xs md:text-sm max-w-[340px]">
                *В стоимость седации не включено само стоматологическое лечение
              </p>
              <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-xl md:rounded-2xl">
                <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                  Подробнее
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
        <CardContent className="flex flex-col items-center gap-8 md:gap-12 lg:gap-[77px] pt-8 md:pt-14 pb-4 px-4">
          <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-3xl md:text-5xl lg:text-[75px] tracking-[-2px] md:tracking-[-3.20px] leading-10 md:leading-[64px] w-full max-w-[1468px]">
            {t.location.title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full">
            <div className="flex-1">
              <div className="relative h-[300px] md:h-[400px] lg:h-[554px] rounded-2xl md:rounded-[28px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.9431382019707!2d28.889423!3d47.05691709999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d0020f4b831%3A0x2b265dfa3e639478!2sTopdentica%20Clinic%C4%83%20Stomatologic%C4%83!5e1!3m2!1sen!2s!4v1769987820310!5m2!1sen!2s"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <Card className="flex-1 bg-[#3366990a] rounded-2xl md:rounded-[28px] border-0">
              <CardContent className="p-3 md:p-4 flex flex-col gap-4 md:gap-5 h-full">
                <Card className="bg-[#336699] rounded-2xl md:rounded-3xl border-0">
                  <CardContent className="flex flex-col gap-8 md:gap-12 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm">
                          {t.location.address}
                        </span>
                      </div>
                      {(t.location.metro || t.location.walking) && (
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8" />
                          <div className="flex flex-col gap-1.5 md:gap-2">
                            {t.location.metro && (
                              <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm">
                                {t.location.metro}
                              </span>
                            )}
                            {t.location.walking && (
                              <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm">
                                {t.location.walking}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                      {t.location.description && (
                        <div className="flex-1">
                          <p className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm leading-4 md:leading-5">
                            {t.location.description}
                          </p>
                        </div>
                      )}
                      <div className="flex-1">
                        <Button className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-xl md:rounded-2xl">
                          <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                            {t.location.contactsButton}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex-1 rounded-2xl md:rounded-3xl bg-[url(/img-3.png)] bg-cover bg-center min-h-[150px]" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
