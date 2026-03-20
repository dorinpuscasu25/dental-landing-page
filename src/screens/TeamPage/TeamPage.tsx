"use client";

import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { Language, useLanguage } from "../../contexts/LanguageContext";
import { SiteLayout } from "../shared/SiteLayout";

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
  },
};

export const TeamPage = () => {
  const { language } = useLanguage();
  const copy = TEAM_PAGE_COPY[language];

  return (
    <SiteLayout headerSource="team_header" footerSource="team_footer">
      {() => (
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
        </div>
      )}
    </SiteLayout>
  );
};
