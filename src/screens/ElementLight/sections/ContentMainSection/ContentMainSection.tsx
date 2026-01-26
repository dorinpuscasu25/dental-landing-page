import { useState, useRef } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    title: "Современные технологии",
    description:
      "Клиника и собственная зуботехническая лаборатория оборудованы по мировым стандартам.",
    badge: "Технологии",
    image: "/----------------------.png",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    title:
      "Опыт команды + Технологии = Высококачественные стоматологические услуги",
    badge: "Гарантии качества",
    bgColor: "bg-[#336699]",
    textColor: "text-white",
  },
  {
    title: "Индивидуальный подход",
    description:
      "Подберем команду врачей и предоставим персонального куратора именно для быстрого решения всех вопросов",
    badge: "Сервис",
    image: "/---------------------.png",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    title: "Более 20 специалистов",
    description: "по разным направлениям стоматологии и медицины",
    badge: "Эксперты в своей области",
    image: "/------20-------------.png",
    bgColor: "bg-[#ae955f1f]",
    hasOverlay: true,
  },
  {
    title: "Собственная лаборатория",
    description:
      "Полный цикл изготовления протезов под контролем наших специалистов",
    badge: "Качество",
    bgColor: "bg-[#ae955f1f]",
  },
  {
    title: "Гарантия на все работы",
    description:
      "Предоставляем официальную гарантию на все виды стоматологических услуг",
    badge: "Надежность",
    bgColor: "bg-[#336699]",
    textColor: "text-white",
  },
  {
    title: "Современное оборудование",
    description:
      "Используем новейшие технологии для точной диагностики и лечения",
    badge: "Инновации",
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
    category: "Cпасение вашей улыбки",
    title: "Лечение кариеса",
    description: "Бережное лечение и восстановление зубов",
    image: "/---------------.png",
    large: true,
  },
  {
    category: "Быстрое решение проблемы",
    title: "Удаление зубов",
    description:
      "Бережное и безболезненное удаление зубов даже в сложных случаях",
    image: "/--------------.png",
  },
  {
    category: "Восстановление вашей улыбки",
    title: "Имплантация зубов",
    description:
      "Установка аналога корня зуба с последующей установкой коронки на имплантат",
    image: "/-----------------.png",
  },
  {
    category: "Забота о вашей улыбке",
    title: "Профессиональная гигиена",
    description:
      "Эффективное очищение налета, подходит для чувствительных зубов и десен",
    image: "/------------------------.png",
  },
  {
    category: "Чтобы составить план лечения",
    title: "Комплексная консультация",
    description:
      "Всесторонняя оценка состояния ваших зубов и всей полости рта и составление вариантов решения проблем",
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
      <Card className="w-full bg-white rounded-[32px] overflow-hidden border-0">
        <CardContent className="flex items-start justify-center pl-4 pr-4 md:pr-[200px] lg:pr-[800px] pt-[402.75px] pb-4 relative p-0">
          <div className="absolute w-full h-full top-0 left-0" />
          <div className="gap-6 p-10 flex-1 backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] flex flex-col items-start relative bg-[#ffffffcc] rounded-[28px]">
            <h1 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-3xl md:text-[45.2px] tracking-[-1.92px] leading-[48px]">
              Стоматология АГАМИ
            </h1>
            <p className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-xl md:text-3xl tracking-[-0.50px] leading-8">
              Серьёзная клиника для серьёзного
              <br />
              лечения.
            </p>
            <div className="pt-10">
              <Button
                onClick={onOpenModal}
                className="h-12 gap-3 px-5 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl"
              >
                <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                  Записаться
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="p-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row min-h-52 gap-5">
              <div className="flex-1 flex items-center pt-10 px-10">
                <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-4xl md:text-[74.8px] tracking-[-3.20px] leading-[64px]">
                  О клинике
                </h2>
              </div>
              <div className="flex-1 flex gap-5">
                <Card className="flex-1 bg-[#ae955f1f] rounded-[28px] border-0">
                  <CardContent className="flex flex-col gap-12 p-10">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-5xl md:text-[73.1px] tracking-[-3.20px] leading-[64px]">
                      28 лет
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base">
                      Работаем для вас
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1 bg-[#ae955f1f] rounded-[28px] border-0">
                  <CardContent className="flex flex-col gap-12 p-10">
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-5xl md:text-[70.9px] tracking-[-3.20px] leading-[64px]">
                      60 000+
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base">
                      Благодарных пациентов
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex flex-col items-end gap-4">
                  <blockquote className="pl-10 pr-2.5 [font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-2xl md:text-[37.5px] tracking-[-1.60px] leading-10">
                    «Мы стремимся к высокому качеству услуг и создаем атмосферу
                    доверия для каждого пациента. Здоровая улыбка — наша общая
                    цель.»
                  </blockquote>
                  <div className="flex flex-col gap-2 pl-5">
                    <div className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d] text-lg">
                      Борис Павлович Агами
                    </div>
                    <div className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-sm opacity-40">
                      Основатель и руководитель клининики
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col justify-center pl-10">
                    <p className="text-[#1d252d99] text-base leading-6 [font-family:'Manrope',Helvetica] font-extralight mb-8">
                      Стоматологическая клиника АГАМИ — одна из ведущих в
                      столице — открыта в 1997 году доктором медицины и
                      имплантологом с мировым именем Борисом Павловичем Агами.
                    </p>
                    <Button
                      variant="secondary"
                      className="h-10 px-4 bg-[#33669914] hover:bg-[#33669914]/80 rounded-2xl w-fit"
                    >
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-base">
                        О клинике
                      </span>
                    </Button>
                  </div>
                  <div className="flex-1 rounded-[28px] bg-[url(/bg.png)] bg-cover bg-center min-h-[336px]" />
                </div>
              </div>
              <div className="flex-1 rounded-[28px] bg-[url(/bg-1.png)] bg-cover bg-center min-h-[602px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="flex flex-col gap-24 p-4">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 flex items-center pt-10 px-10">
              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-4xl md:text-[76.1px] tracking-[-3.20px] leading-[64px]">
                Наша команда
              </h2>
            </div>
            <Card className="flex-1 bg-[#336699] rounded-[28px] border-0">
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white text-2xl tracking-[-0.50px] leading-7 mb-12">
                      Более 22 квалифицированных
                      <br />
                      специалистов
                    </p>
                    <div className="flex items-center">
                      {avatarImages.map((img, index) => (
                        <Avatar
                          key={index}
                          className="w-[50px] h-[50px] -ml-2.5 first:ml-0 border-2 border-[#336699]"
                        >
                          <AvatarImage src={img} className="object-cover" />
                        </Avatar>
                      ))}
                      <div className="flex w-[50px] h-[50px] -ml-2.5 items-center justify-center bg-white rounded-full border-2 border-[#336699]">
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#336699] text-sm">
                          22 +
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-sm leading-5 mb-8">
                      Первоклассная команда врачей и всё необходимое
                      оборудование для проведения комплексного и качественного
                      лечения зубов.
                    </p>
                    <Button className="h-12 gap-3 px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-2xl">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                        Вся команда
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-end gap-8 pl-0 md:pl-10">
            <div className="flex flex-wrap gap-2 w-full">
              {specialtyFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant={filter.active ? "default" : "secondary"}
                  className={`min-h-10 px-4 py-3 rounded-2xl ${
                    filter.active
                      ? "bg-[#336699] hover:bg-[#336699]/90 text-white"
                      : "bg-[#3366990a] hover:bg-[#3366990a]/80 text-[#33669999]"
                  } [font-family:'Manrope',Helvetica] font-extralight text-base`}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>

            <div className="w-full overflow-hidden">
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-10 pl-14 pr-4">
                  {teamMembers.map((member, index) => (
                    <Card
                      key={index}
                      className="min-w-[530px] rounded-[32px] overflow-hidden border-0"
                    >
                      <CardContent className="p-0 relative">
                        <div
                          className="h-[382px] bg-cover bg-center"
                          style={{ backgroundImage: `url(${member.image})` }}
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-[#ffffff33] backdrop-blur-[22.5px] rounded-[32px] p-5">
                          <div className="flex flex-wrap gap-1 mb-4">
                            <Badge className="h-8 px-2.5 bg-white text-[#ae955f] hover:bg-white/90 rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-sm">
                              {member.experience}
                            </Badge>
                            {member.degree && (
                              <Badge className="h-8 px-2.5 bg-white text-[#ae955f] hover:bg-white/90 rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-sm">
                                {member.degree}
                              </Badge>
                            )}
                          </div>
                          <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-lg mb-2">
                            {member.name}
                          </h3>
                          <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#ffffffcc] text-base mb-4">
                            {member.role}
                          </p>
                          <Button
                            onClick={onOpenModal}
                            className="w-full h-12 px-4 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl"
                          >
                            <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                              Записаться
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <img className="w-full" alt="Container" src="/container-2.svg" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="p-4">
          <div className="pt-10 pb-6 px-10 flex items-center justify-between">
            <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-4xl md:text-[74.7px] tracking-[-3.20px] leading-[64px]">
              Почему нам доверяют?
            </h2>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => scrollTrust("left")}
                disabled={!canScrollLeft}
                className="w-14 h-14 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-2xl disabled:opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                size="icon"
                onClick={() => scrollTrust("right")}
                disabled={!canScrollRight}
                className="w-14 h-14 bg-[#336699] hover:bg-[#336699]/90 rounded-2xl disabled:opacity-30"
              >
                <ChevronRight className="w-6 h-6 text-white" />
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

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1 flex items-center pt-10 px-10">
              <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-2xl md:text-[37.2px] tracking-[-1.60px] leading-10">
                Высокие оценки и рейтинг АГАМИ -<br />
                показатель нашей работы
              </h2>
            </div>
            <Card className="flex-1 bg-[#336699] rounded-[28px] border-0">
              <CardContent className="p-10">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-2xl md:text-[29.9px] leading-8 mb-12">
                  Независимые рейтинги
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {ratingPlatforms.map((platform, index) => (
                    <Card
                      key={index}
                      className="bg-[#ffffff1f] rounded-[32px] border-0"
                    >
                      <CardContent className="flex flex-col justify-between p-6 min-h-[134px]">
                        <div
                          className="h-[22px] bg-cover bg-center"
                          style={{ backgroundImage: `url(${platform.logo})` }}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6" />
                            <span className="[font-family:'Manrope',Helvetica] font-normal text-white text-xl">
                              {platform.rating}
                            </span>
                          </div>
                          <div className="flex w-10 h-10 items-center justify-center bg-[#ffffff29] rounded-xl">
                            <div className="w-8 h-8" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#0035690a] rounded-[28px] border-0">
            <CardContent className="flex flex-col gap-12 p-10">
              <div className="flex items-center justify-between">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-2xl md:text-[30.4px] leading-8">
                  Награды и сертификаты
                </h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-14 h-14 bg-[#1d252d1f] hover:bg-[#1d252d1f]/80 rounded-2xl"
                  >
                    <div className="w-8 h-8 rotate-180" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-14 h-14 bg-[#336699] hover:bg-[#336699]/90 rounded-2xl"
                  >
                    <div className="w-8 h-8" />
                  </Button>
                </div>
              </div>
              <img className="w-full" alt="Container" src="/container-5.svg" />
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="flex flex-col items-center gap-12 pt-14 pb-4 px-4">
          <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-4xl md:text-[74.7px] tracking-[-3.20px] leading-[64px] w-full max-w-[1468px]">
            Какое лечение проводим?
          </h2>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-6 pl-0 md:pl-10">
                <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-2xl md:text-[37.5px] tracking-[-1.60px] leading-10 max-w-[580px]">
                  Все необходимое для здоровья
                  <br />
                  зубов в одной клинике
                </h3>
                <Button className="h-12 gap-3 px-5 bg-[#336699] hover:bg-[#336699]/90 rounded-2xl w-fit">
                  <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                    Все услуги
                  </span>
                </Button>
              </div>
              <Card className="flex-1 bg-[#0035690a] rounded-[28px] overflow-hidden border-0 relative min-h-80">
                <CardContent className="p-10 flex flex-col justify-between h-full">
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-lg">
                    {services[0].category}
                  </p>
                  <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-[22.3px] leading-7">
                    {services[0].title}
                  </h4>
                  <div className="absolute top-[calc(50%-105px)] right-0 w-[210px] h-[210px] bg-white rounded-[32px] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${services[0].image})` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(1).map((service, index) => (
                <Card
                  key={index}
                  className="bg-[#0035690a] rounded-[28px] overflow-hidden border-0 relative min-h-80"
                >
                  <CardContent className="p-10 flex flex-col justify-between h-full">
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-lg">
                      {service.category}
                    </p>
                    <h4 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-xl md:text-[22.3px] leading-7">
                      {service.title}
                    </h4>
                    <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-white rounded-3xl overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card className="bg-[#ae955f1f] rounded-[28px] border-0">
                <CardContent className="p-10 flex gap-5 min-h-[344px]">
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#ae955f] text-2xl md:text-[30.1px] leading-8 mb-6">
                      Прозрачное
                      <br />
                      ценообразование
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#1d252d99] text-sm leading-5 mb-12">
                      Наш подход к лечению пациента - формирование комплексного
                      плана при первом посещении клиники. Такой план лечения
                      включает все необходимые услуги, этапы и общую сумму. Мы
                      гарантируем, что стоимость останется итоговой. Никаких
                      скрытых расходов — только честное ценообразование.
                    </p>
                    <Button className="h-12 gap-3 px-5 bg-[#ae955f2e] hover:bg-[#ae955f2e]/80 rounded-2xl w-fit">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base">
                        Цены
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#336699] rounded-[40px] border-0 relative overflow-hidden">
                <CardContent className="p-10 flex gap-5 min-h-[344px]">
                  <div className="flex-1 flex flex-col justify-between z-10">
                    <h3 className="[font-family:'Inter',Helvetica] font-normal text-white text-2xl md:text-[29.9px] leading-8 mb-6">
                      Лечим зубы
                      <br />
                      во сне под седацией
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#ffffffcc] text-sm leading-5 mb-12">
                      Комфортное лечение зубов без страха, стресса и неприятных
                      воспоминаний под полным контролем врача-анестезиолога
                    </p>
                    <Button className="h-12 gap-3 px-5 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl w-fit">
                      <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                        Подробнее
                      </span>
                    </Button>
                  </div>
                  <div
                    className="absolute -top-8 right-2 w-[calc(50%+24px)] h-[calc(100%+64px)] rounded-[32px] bg-cover bg-center"
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

      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div
          className="flex-1 min-h-[500px] rounded-[28px] bg-cover bg-center"
          style={{ backgroundImage: "url(/--------------------.png)" }}
        />
        <Card className="flex-1 bg-white rounded-[28px] overflow-hidden border-0">
          <CardContent className="flex flex-col justify-between px-10 py-14 min-h-[500px]">
            <h3 className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d] text-2xl md:text-3xl leading-8 mb-6">
              Лечение зубов во сне
            </h3>
            <div className="mb-6">
              <p className="[font-family:'Inter',Helvetica] font-normal text-[45.6px] tracking-[-1.92px] leading-[50px]">
                <span className="text-[#ae955f]">
                  Скидка 15% на седацию
                  <br />
                </span>
                <span className="text-[#1d252d]">до 31 января 2026 года</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="[font-family:'Inter',Helvetica] font-normal text-[#1d252d99] text-sm max-w-[340px]">
                *В стоимость седации не включено само стоматологическое лечение
              </p>
              <Button className="h-12 gap-3 px-4 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl">
                <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                  Подробнее
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full bg-white rounded-[32px] border-0">
        <CardContent className="flex flex-col items-center gap-[77px] pt-14 pb-4 px-4">
          <h2 className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-4xl md:text-[75px] tracking-[-3.20px] leading-[64px] w-full max-w-[1468px]">
            Где мы находимся?
          </h2>

          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <div className="flex-1">
              <div className="relative h-[554px] rounded-[28px] overflow-hidden">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 left-0 w-px h-px flex bg-white bg-blend-saturation">
                    <div className="-mt-32 w-[1020px] h-[810px] -ml-32 bg-[url(/image.png)] bg-cover bg-center" />
                  </div>
                  <img
                    className="absolute top-[197px] left-[347px] w-[70px] h-20"
                    alt="Image"
                    src="/image-1.svg"
                  />
                  <img
                    className="absolute top-[108px] left-2.5 w-7 h-[206px]"
                    alt="Container"
                    src="/container-4.svg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start pl-[423.55px] pr-[3px]">
                    <div className="flex items-center gap-2 pb-2 px-2">
                      <div className="flex items-start h-6 bg-white rounded-[3px] overflow-hidden shadow-[0px_2px_5px_-3px_#00000026,0px_1px_2px_1px_#00000026]">
                        <img
                          className="w-[26px] h-6"
                          alt="Margin"
                          src="/margin.svg"
                        />
                        <span className="[font-family:'Inter',Helvetica] font-normal text-black text-[11.1px] leading-6 px-1.5">
                          Как добраться
                        </span>
                      </div>
                      <div className="flex items-start h-6 bg-white rounded-[3px] overflow-hidden shadow-[0px_2px_5px_-3px_#00000026,0px_1px_2px_1px_#00000026]">
                        <img
                          className="w-[30px] h-6"
                          alt="Margin"
                          src="/margin-1.svg"
                        />
                        <span className="[font-family:'Inter',Helvetica] font-normal text-black text-[11.1px] leading-6 px-1.5">
                          Доехать на такси
                        </span>
                      </div>
                      <div className="flex items-start pt-0 pb-px px-1 bg-[#ffffffb2] rounded-[3px]">
                        <span className="[font-family:'Inter',Helvetica] font-normal text-black text-xs underline">
                          API Карт
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-6 overflow-hidden">
                      <div className="flex items-center justify-center gap-0 relative top-px">
                        <div className="flex items-start pt-0 pb-px px-1 bg-[#ffffffbf] rounded-[3px]">
                          <span className="[font-family:'Inter',Helvetica] font-normal text-black text-[11px]">
                            © Яндекс
                          </span>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-black text-[11px] underline">
                            Условия использования
                          </span>
                        </div>
                        <img
                          className="w-[134px]"
                          alt="Container"
                          src="/container-1.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="flex-1 bg-[#3366990a] rounded-[28px] border-0">
              <CardContent className="p-4 flex flex-col gap-5 h-full">
                <Card className="bg-[#336699] rounded-3xl border-0">
                  <CardContent className="flex flex-col gap-12 p-10">
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-8 h-8" />
                        <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm">
                          г. Москва, ул. Советской Армии, 17/52
                        </span>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-8 h-8" />
                        <div className="flex flex-col gap-2">
                          <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm">
                            м. Марьина Роща
                          </span>
                          <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm">
                            5 минут пешком (400 метров)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="flex-1">
                        <p className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm leading-5">
                          Находимся с торца жилого дома со стороны Лазаревского
                          переулка.
                        </p>
                      </div>
                      <div className="flex-1">
                        <Button className="h-12 gap-3 px-5 bg-[#ffffff29] hover:bg-[#ffffff29]/80 rounded-2xl">
                          <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-base">
                            Контакты
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex-1 rounded-3xl bg-[url(/img-3.png)] bg-cover bg-center" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
