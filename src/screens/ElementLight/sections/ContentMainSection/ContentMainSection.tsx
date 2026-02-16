import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslations } from "../../../../translations";

const avatarImages = ["/i.png", "/i-1.png", "/i-2.png", "/i-3.png", "/i-4.png"];
const serviceImages = [
  "/---------------.png",
  "/--------------.png",
  "/-----------------.png",
  "/------------------------.png",
  "/-------------------------1.png",
];

interface ContentMainSectionProps {
  onOpenModal: () => void;
}

export const ContentMainSection = ({
  onOpenModal,
}: ContentMainSectionProps): JSX.Element => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      image: "/bloc1.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      button: t.hero.bookButton,
    },
  ];

  const trustReasons = t.trust.items ?? [];
  const services = (t.services.items ?? []).map((service, index) => ({
    ...service,
    image: serviceImages[index],
  }));
  const certificates = t.ratings.certificates ?? [];

  const canSlide = heroSlides.length > 1;

  const trustScrollRef = useRef<HTMLDivElement>(null);
  const certificatesScrollRef = useRef<HTMLDivElement>(null);
  const [trustCanScrollLeft, setTrustCanScrollLeft] = useState(false);
  const [trustCanScrollRight, setTrustCanScrollRight] = useState(false);
  const [certCanScrollLeft, setCertCanScrollLeft] = useState(false);
  const [certCanScrollRight, setCertCanScrollRight] = useState(false);

  const updateScrollState = (
    ref: RefObject<HTMLDivElement>,
    setLeft: (value: boolean) => void,
    setRight: (value: boolean) => void
  ) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setLeft(scrollLeft > 0);
    setRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState(trustScrollRef, setTrustCanScrollLeft, setTrustCanScrollRight);
  }, [trustReasons.length]);

  useEffect(() => {
    updateScrollState(certificatesScrollRef, setCertCanScrollLeft, setCertCanScrollRight);
  }, [certificates.length]);

  const scrollByAmount = (ref: RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (!ref.current) return;
    const amount = 360;
    ref.current.scrollTo({
      left: ref.current.scrollLeft + (direction === "right" ? amount : -amount),
      behavior: "smooth",
    });
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < heroSlides.length) {
      setHeroIndex(index);
    }
  };

  const prevSlide = () => {
    if (!canSlide) return;
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!canSlide) return;
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-0 relative">
      <Card className="w-full bg-white rounded-2xl md:rounded-[32px] overflow-hidden border-0">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${heroIndex * 100}%)` }}
            >
              {heroSlides.map((slide, index) => (
                <div key={index} className="relative w-full flex-shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[600px] flex items-end">
                    <div className="w-full px-4 md:px-8 lg:px-12 pb-6 md:pb-10 lg:pb-12">
                      <div className="max-w-[680px] gap-4 md:gap-6 p-6 md:p-10 flex flex-col items-start bg-[#ffffffcc] rounded-2xl md:rounded-[28px] backdrop-blur-[10px]">
                        <h1 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-3xl lg:text-[42px] tracking-[-1.2px] md:tracking-[-1.8px] leading-8 md:leading-[44px]">
                          {slide.title}
                        </h1>
                        <p className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-base md:text-xl lg:text-2xl tracking-[-0.30px] md:tracking-[-0.50px] leading-6 md:leading-8 whitespace-pre-line">
                          {slide.subtitle}
                        </p>
                        <Button
                          onClick={onOpenModal}
                          className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-xl md:rounded-2xl"
                        >
                          <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                            {slide.button}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-y-0 w-full flex items-center justify-between px-4 md:px-8">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevSlide}
                disabled={!canSlide}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-xl md:rounded-2xl disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                size="icon"
                onClick={nextSlide}
                disabled={!canSlide}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </Button>
            </div>

            <div className="absolute bottom-4 right-6 flex items-center gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === heroIndex ? "bg-[#336699]" : "bg-white/70"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
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
              <div className="flex-1 flex flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-3 md:gap-4">
                  <blockquote className="pl-5 md:pl-10 pr-2.5 [font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-base md:text-xl lg:text-2xl tracking-[-0.6px] md:tracking-[-1px] leading-6 md:leading-8">
                    {t.about.quote}
                  </blockquote>
                  <div className="flex flex-col gap-1.5 md:gap-2 pl-5 md:pl-10">
                    <div className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d] text-base md:text-lg">
                      {t.about.founderName}
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-xs md:text-sm opacity-40">
                      {t.about.founderTitle}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl md:rounded-[28px] bg-[url(/bloc2.jpg)] bg-cover bg-center min-h-[260px] md:min-h-[360px] lg:min-h-[460px]" />
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
          <div className="pt-6 md:pt-10 pb-4 md:pb-6 px-5 md:px-10 flex items-center justify-between gap-4">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-2xl md:text-4xl lg:text-[74.7px] tracking-[-1.5px] md:tracking-[-3.20px] leading-8 md:leading-[64px]">
              {t.trust.title}
            </h2>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => scrollByAmount(trustScrollRef, "left")}
                disabled={!trustCanScrollLeft}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-xl md:rounded-2xl disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                size="icon"
                onClick={() => scrollByAmount(trustScrollRef, "right")}
                disabled={!trustCanScrollRight}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </Button>
            </div>
          </div>
          <div
            ref={trustScrollRef}
            onScroll={() =>
              updateScrollState(trustScrollRef, setTrustCanScrollLeft, setTrustCanScrollRight)
            }
            className="flex gap-4 md:gap-5 px-4 md:px-10 pb-8 md:pb-10 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {trustReasons.map((reason, index) => (
              <Card
                key={index}
                className="min-w-[260px] md:min-w-[320px] bg-[#0035690a] rounded-2xl md:rounded-[24px] border-0"
              >
                <CardContent className="p-5 md:p-6 flex flex-col gap-3 min-h-[180px]">
                  <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-lg md:text-xl leading-6 md:leading-7">
                    {reason.title}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-xs md:text-sm leading-4 md:leading-5">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
              <CardContent className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img className="h-8 md:h-10" alt="Google" src="/google.png" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-white text-lg md:text-xl">
                      {t.ratings.googleLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                    <Star className="w-4 h-4 text-white" />
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base md:text-lg">
                      5.0
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-xl md:rounded-2xl w-fit"
                >
                  <a
                    href="https://www.google.com/maps/place/Topdentica+Clinic%C4%83+Stomatologic%C4%83/@47.0569171,28.889423,977m/data=!3m1!1e3!4m8!3m7!1s0x40c97d0020f4b831:0x2b265dfa3e639478!8m2!3d47.0569171!4d28.889423!9m1!1b1!16s%2Fg%2F11wj3lqwqz?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                      {t.ratings.googleButton}
                    </span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#0035690a] rounded-2xl md:rounded-[28px] border-0">
            <CardContent className="flex flex-col gap-6 md:gap-8 p-6 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-2xl lg:text-[30.4px] leading-7 md:leading-8">
                  {t.ratings.awards}
                </h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => scrollByAmount(certificatesScrollRef, "left")}
                    disabled={!certCanScrollLeft}
                    className="w-10 h-10 md:w-12 md:h-12 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-xl md:rounded-2xl disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => scrollByAmount(certificatesScrollRef, "right")}
                    disabled={!certCanScrollRight}
                    className="w-10 h-10 md:w-12 md:h-12 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </Button>
                </div>
              </div>
              <div
                ref={certificatesScrollRef}
                onScroll={() =>
                  updateScrollState(
                    certificatesScrollRef,
                    setCertCanScrollLeft,
                    setCertCanScrollRight
                  )
                }
                className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              >
                {certificates.map((label, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="min-w-[200px] md:min-w-[240px] h-24 md:h-28 rounded-2xl border border-dashed border-[#1d252d1f] bg-white/80 flex items-center justify-center"
                  >
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-xs md:text-sm text-[#1d252d66]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
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
                <Button
                  disabled
                  className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#336699] hover:bg-[#336699]/90 rounded-xl md:rounded-2xl w-fit disabled:opacity-60"
                >
                  <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                    {t.services.allServicesButton}
                  </span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-[#0035690a] rounded-2xl md:rounded-[28px] border-0"
                >
                  <CardContent className="p-6 md:p-8 flex flex-col gap-6 h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-base md:text-lg">
                          {service.tag}
                        </p>
                        <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-lg md:text-xl lg:text-[22.3px] leading-6 md:leading-7">
                          {service.title}
                        </h4>
                      </div>
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${service.image})` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-[#ae955f1f] rounded-2xl md:rounded-[32px] border-0">
              <CardContent className="p-8 md:p-12 flex flex-col gap-6 min-h-[280px] md:min-h-[340px]">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-2xl md:text-3xl lg:text-[38px] leading-8 md:leading-10">
                  {t.services.pricing}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-sm md:text-base lg:text-lg leading-5 md:leading-7 max-w-[900px]">
                  {t.services.pricingDescription}
                </p>
                <Button
                  disabled
                  className="h-11 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ae955f2e] hover:bg-[#ae955f2e]/80 rounded-xl md:rounded-2xl w-fit disabled:opacity-60"
                >
                  <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-sm md:text-base">
                    {t.services.pricesButton}
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

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

            <div className="flex-1 flex flex-col gap-4 md:gap-5">
              <Card className="bg-[#336699] rounded-2xl md:rounded-3xl border-0">
                <CardContent className="flex flex-col gap-6 md:gap-8 p-6 md:p-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 mt-2 rounded-full bg-white/70" />
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-xs md:text-sm">
                        {t.location.address}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 mt-2 rounded-full bg-white/70" />
                      <div className="flex flex-col">
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-white/70 text-xs md:text-sm">
                          {t.footer.phoneLabel}
                        </span>
                        <a
                          href="tel:+37368303088"
                          className="[font-family:'Manrope',Helvetica] font-normal text-white text-sm md:text-base"
                        >
                          {t.header.phone}
                        </a>
                      </div>
                    </div>
                    <p className="[font-family:'Manrope',Helvetica] font-extralight text-white/70 text-xs md:text-sm">
                      {t.footer.schedule}
                    </p>
                  </div>
                  <Button
                    asChild
                    className="h-10 md:h-12 gap-2 md:gap-3 px-4 md:px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-xl md:rounded-2xl w-fit"
                  >
                    <a
                      href="https://share.google/8IkzDmYShpjgye9u8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm md:text-base">
                        {t.location.contactsButton}
                      </span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <div
                className="flex-1 rounded-2xl md:rounded-3xl bg-cover bg-center min-h-[220px] md:min-h-[260px]"
                style={{ backgroundImage: "url(/bloc1.jpg)" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
