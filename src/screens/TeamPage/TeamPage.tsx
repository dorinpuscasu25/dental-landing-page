"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Language, useLanguage } from "../../contexts/LanguageContext";
import { SiteLayout } from "../shared/SiteLayout";

type TeamCategory =
  | "all"
  | "therapy"
  | "surgery"
  | "implantology"
  | "orthodontics"
  | "hygiene";

interface LocalizedTeamContent {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  teamLabel: string;
  teamDescription: string;
  doctorsTitle: string;
  doctorsSubtitle: string;
  bookButton: string;
  categories: Record<TeamCategory, string>;
}

type LocalizedText = Record<Language, string>;

interface DoctorProfile {
  id: string;
  name: string;
  role: LocalizedText;
  expertise: LocalizedText;
  categories: TeamCategory[];
  image: string;
}

const TEAM_PAGE_COPY: Record<Language, LocalizedTeamContent> = {
  ro: {
    breadcrumbHome: "Acasă",
    breadcrumbCurrent: "Echipa",
    title: "Echipa clinicii",
    subtitle:
      "O echipă puternică de medici și personal medical pentru a rezolva eficient cazurile de orice complexitate.",
    quote:
      "Am construit o echipă în care fiecare medic este expert în domeniul său. Împreună oferim tratamente sigure, precise și predictibile.",
    quoteAuthor: "Sineac Alexei",
    quoteRole: "Fondatorul și directorul clinicii",
    teamLabel: "Topdentica Team",
    teamDescription:
      "Specialiști cu experiență care lucrează coordonat, după protocoale moderne.",
    doctorsTitle: "Medicii noștri",
    doctorsSubtitle:
      "Alege specialistul potrivit și programează o consultație.",
    bookButton: "Programează-te",
    categories: {
      all: "Toți",
      therapy: "Terapie",
      surgery: "Chirurgie",
      implantology: "Implantologie",
      orthodontics: "Ortodonție",
      hygiene: "Profilaxie",
    },
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Команда",
    title: "Команда клиники",
    subtitle:
      "Сильная команда врачей и медицинского персонала для решения случаев любой сложности.",
    quote:
      "Мы собрали команду, где каждый врач является экспертом в своей области. Вместе мы обеспечиваем безопасное, точное и предсказуемое лечение.",
    quoteAuthor: "Синяк Алексей",
    quoteRole: "Основатель и руководитель клиники",
    teamLabel: "Topdentica Team",
    teamDescription:
      "Опытные специалисты, которые работают слаженно по современным протоколам.",
    doctorsTitle: "Наши врачи",
    doctorsSubtitle:
      "Выберите подходящего специалиста и запишитесь на консультацию.",
    bookButton: "Записаться",
    categories: {
      all: "Все",
      therapy: "Терапия",
      surgery: "Хирургия",
      implantology: "Имплантация",
      orthodontics: "Ортодонтия",
      hygiene: "Профгигиена",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Team",
    title: "Clinic Team",
    subtitle:
      "A strong team of doctors and medical staff ready to handle cases of any complexity.",
    quote:
      "We built a team where every doctor is an expert in their field. Together, we deliver safe, precise, and predictable treatment.",
    quoteAuthor: "Sineac Alexei",
    quoteRole: "Clinic founder and director",
    teamLabel: "Topdentica Team",
    teamDescription:
      "Experienced specialists working in sync with modern treatment protocols.",
    doctorsTitle: "Our Doctors",
    doctorsSubtitle: "Choose the right specialist and book a consultation.",
    bookButton: "Book appointment",
    categories: {
      all: "All",
      therapy: "Therapy",
      surgery: "Surgery",
      implantology: "Implantology",
      orthodontics: "Orthodontics",
      hygiene: "Hygiene",
    },
  },
};

const DOCTORS: DoctorProfile[] = [
  {
    id: "sineac-alexei",
    name: "Sineac Alexei",
    role: {
      ro: "Stomatolog ortoped, implantolog",
      ru: "Стоматолог-ортопед, имплантолог",
      en: "Prosthodontist, implantologist",
    },
    expertise: {
      ro: "Plan complet de tratament",
      ru: "Комплексный план лечения",
      en: "Comprehensive treatment planning",
    },
    categories: ["implantology", "therapy"],
    image: "/img.png",
  },
  {
    id: "cristian-bivol",
    name: "Bîvol Cristian",
    role: {
      ro: "Medic chirurg dento-alveolar",
      ru: "Стоматолог-хирург",
      en: "Oral surgeon",
    },
    expertise: {
      ro: "Extracții atraumatice",
      ru: "Атравматичное удаление",
      en: "Atraumatic extractions",
    },
    categories: ["surgery"],
    image: "/img-1.png",
  },
  {
    id: "radu-carp",
    name: "Carp Radu",
    role: {
      ro: "Medic implantolog",
      ru: "Стоматолог-имплантолог",
      en: "Dental implantologist",
    },
    expertise: {
      ro: "Implanturi dentare",
      ru: "Дентальная имплантация",
      en: "Dental implants",
    },
    categories: ["implantology", "surgery"],
    image: "/img-2.png",
  },
  {
    id: "stogniev-igor",
    name: "Stogniev Igor",
    role: {
      ro: "Medic ortoped",
      ru: "Стоматолог-ортопед",
      en: "Prosthodontist",
    },
    expertise: {
      ro: "Refacerea zâmbetului",
      ru: "Восстановление улыбки",
      en: "Smile restoration",
    },
    categories: ["therapy", "implantology"],
    image: "/img-3.png",
  },
  {
    id: "maria-salova",
    name: "Salova Maria",
    role: {
      ro: "Medic ortodont",
      ru: "Врач-ортодонт",
      en: "Orthodontist",
    },
    expertise: {
      ro: "Corectarea mușcăturii",
      ru: "Исправление прикуса",
      en: "Bite correction",
    },
    categories: ["orthodontics"],
    image: "/i.png",
  },
  {
    id: "veronica-melnicenko",
    name: "Melnicenko Veronica",
    role: {
      ro: "Medic terapeut",
      ru: "Врач-терапевт",
      en: "Therapist",
    },
    expertise: {
      ro: "Tratamentul cariilor",
      ru: "Лечение кариеса",
      en: "Caries treatment",
    },
    categories: ["therapy"],
    image: "/i-1.png",
  },
  {
    id: "irina-ponomari",
    name: "Ponomari Irina",
    role: {
      ro: "Medic endodont",
      ru: "Врач-эндодонтист",
      en: "Endodontist",
    },
    expertise: {
      ro: "Tratament de canal",
      ru: "Лечение каналов",
      en: "Root canal treatment",
    },
    categories: ["therapy"],
    image: "/i-2.png",
  },
  {
    id: "olga-balan",
    name: "Balan Olga",
    role: {
      ro: "Medic profilaxie",
      ru: "Специалист по профгигиене",
      en: "Hygiene specialist",
    },
    expertise: {
      ro: "Igienă profesională",
      ru: "Профессиональная гигиена",
      en: "Professional hygiene",
    },
    categories: ["hygiene"],
    image: "/i-3.png",
  },
  {
    id: "maria-ceban",
    name: "Ceban Maria",
    role: {
      ro: "Medic profilaxie",
      ru: "Специалист по профгигиене",
      en: "Hygiene specialist",
    },
    expertise: {
      ro: "Prevenție și profilaxie",
      ru: "Профилактика и уход",
      en: "Preventive care",
    },
    categories: ["hygiene"],
    image: "/i-4.png",
  },
  {
    id: "valeriu-ciobanu",
    name: "Ciobanu Valeriu",
    role: {
      ro: "Medic chirurg",
      ru: "Стоматолог-хирург",
      en: "Dental surgeon",
    },
    expertise: {
      ro: "Chirurgie orală",
      ru: "Оральная хирургия",
      en: "Oral surgery",
    },
    categories: ["surgery"],
    image: "/img-1.png",
  },
  {
    id: "dmitrii-krivos",
    name: "Krivoi Dmitrii",
    role: {
      ro: "Medic ortodont",
      ru: "Врач-ортодонт",
      en: "Orthodontist",
    },
    expertise: {
      ro: "Aparate dentare",
      ru: "Ортодонтические аппараты",
      en: "Orthodontic appliances",
    },
    categories: ["orthodontics"],
    image: "/img-2.png",
  },
  {
    id: "stanislav-poleacov",
    name: "Poleacov Stanislav",
    role: {
      ro: "Medic implantolog",
      ru: "Стоматолог-имплантолог",
      en: "Dental implantologist",
    },
    expertise: {
      ro: "Reabilitare pe implanturi",
      ru: "Реабилитация на имплантах",
      en: "Implant rehabilitation",
    },
    categories: ["implantology", "surgery"],
    image: "/img-3.png",
  },
];

const CATEGORY_ORDER: TeamCategory[] = [
  "all",
  "therapy",
  "surgery",
  "implantology",
  "orthodontics",
  "hygiene",
];

export const TeamPage = () => {
  const { language } = useLanguage();
  const copy = TEAM_PAGE_COPY[language];

  const [activeCategory, setActiveCategory] = useState<TeamCategory>("all");

  const filteredDoctors = useMemo(() => {
    if (activeCategory === "all") {
      return DOCTORS;
    }

    return DOCTORS.filter((doctor) => doctor.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <SiteLayout headerSource="team_header" footerSource="team_footer">
      {(openModal) => (
      <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-6 md:py-10">
        <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
          <CardContent className="p-3 md:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
              <div className="bg-[#f5f7fa] rounded-2xl md:rounded-[28px] p-6 md:p-10 flex flex-col gap-5 md:gap-6">
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

                <h1 className="font-normal text-[#336699] text-4xl md:text-5xl lg:text-[74px] tracking-[-2px] md:tracking-[-3.2px] leading-10 md:leading-[64px]">
                  {copy.title}
                </h1>

                <p className="font-normal text-[#1d252d] text-xl md:text-2xl leading-7 md:leading-9 max-w-[620px]">
                  {copy.subtitle}
                </p>

                <Card className="bg-[#33669912] rounded-2xl md:rounded-[24px] border-0">
                  <CardContent className="p-5 md:p-6 flex flex-col gap-3">
                    <p className="font-normal text-[#1d252d] text-base md:text-lg leading-6 md:leading-7">
                      {`“${copy.quote}”`}
                    </p>
                    <div>
                      <p className="font-normal text-[#1d252d] text-base md:text-lg">
                        {copy.quoteAuthor}
                      </p>
                      <p className="font-extralight text-[#1d252d99] text-sm md:text-base">
                        {copy.quoteRole}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative overflow-hidden rounded-2xl md:rounded-[28px] min-h-[340px] md:min-h-[540px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(/bloc2.jpg)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003569c7] via-[#00356945] to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5 md:p-8 gap-3">
                  <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-[#ffffffd9] text-[#336699] text-xs md:text-sm font-medium">
                    {copy.teamLabel}
                  </span>
                  <p className="font-normal text-white text-lg md:text-2xl leading-7 md:leading-8 max-w-[420px]">
                    {copy.teamDescription}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
          <CardContent className="p-5 md:p-10">
            <div className="flex flex-col gap-5 md:gap-7">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h2 className="font-normal text-[#336699] text-3xl md:text-5xl lg:text-[58px] tracking-[-2px] md:tracking-[-2.6px] leading-10 md:leading-[56px]">
                    {copy.doctorsTitle}
                  </h2>
                  <p className="font-extralight text-[#1d252d99] text-sm md:text-base leading-5 mt-2">
                    {copy.doctorsSubtitle}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center px-3 py-2 rounded-xl bg-[#33669912] text-[#336699] text-sm md:text-base font-medium">
                  {filteredDoctors.length}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {CATEGORY_ORDER.map((category) => {
                  const isActive = category === activeCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`h-10 px-4 rounded-xl whitespace-nowrap transition-colors text-sm md:text-base ${
                        isActive
                          ? "bg-[#336699] text-white"
                          : "bg-[#f5f7fa] text-[#1d252db2] hover:bg-[#33669912]"
                      }`}
                    >
                      {copy.categories[category]}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {filteredDoctors.map((doctor) => (
                  <article
                    key={doctor.id}
                    className="relative overflow-hidden rounded-2xl md:rounded-[24px] min-h-[360px] md:min-h-[420px]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${doctor.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003569e6] via-[#0035698a] to-transparent" />
                    <div className="relative h-full flex flex-col justify-end p-4 md:p-5 gap-3">
                      <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-[#ffffffde] text-[#336699] text-xs md:text-sm">
                        {doctor.expertise[language]}
                      </span>

                      <div>
                        <h3 className="font-medium text-white text-xl md:text-2xl leading-7 md:leading-8">
                          {doctor.name}
                        </h3>
                        <p className="font-extralight text-white/90 text-sm md:text-base leading-5 mt-1">
                          {doctor.role[language]}
                        </p>
                      </div>

                      <Button
                        type="button"
                        onClick={() => openModal(`team_${doctor.id}`)}
                        className="h-10 md:h-11 w-full justify-between px-4 bg-[#56B3EE] hover:bg-[#56B3EE]/90 text-white rounded-xl"
                      >
                        <span className="font-extralight text-sm md:text-base">
                          {copy.bookButton}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      )}
    </SiteLayout>
  );
};
