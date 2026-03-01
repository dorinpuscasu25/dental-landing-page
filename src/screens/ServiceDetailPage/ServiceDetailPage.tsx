"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { SiteLayout } from "../shared/SiteLayout";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Check,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";

const stats = [
  { value: "6300+", label: "dinți restaurați cu succes" },
  { value: "40+", label: "luni experiență clinică" },
  { value: "15+", label: "tehnologii moderne" },
  { value: "3", label: "pași până la rezultat" },
];

const benefits = [
  {
    title: "Stabilitate pe termen lung",
    description:
      "Lucrăm după un plan complet de tratament, cu rezultate previzibile.",
    icon: ShieldCheck,
  },
  {
    title: "Estetică naturală",
    description:
      "Alegem forma și nuanța potrivită pentru un zâmbet echilibrat și natural.",
    icon: Sparkles,
  },
  {
    title: "Confort în tratament",
    description:
      "Proceduri minim invazive și control atent al fiecărei etape.",
    icon: Stethoscope,
  },
  {
    title: "Protocol clar",
    description:
      "Primești etapele, costurile și timpul estimat înainte de începerea tratamentului.",
    icon: BadgeCheck,
  },
];

const steps = [
  {
    title: "Consultație și planificare",
    description:
      "Evaluare clinică, investigații și plan personalizat cu opțiuni de tratament.",
  },
  {
    title: "Intervenția principală",
    description:
      "Aplicarea soluției recomandate, în condiții controlate și cu materiale premium.",
  },
  {
    title: "Finalizare și monitorizare",
    description:
      "Ajustări finale, recomandări și program de control pentru rezultate stabile.",
  },
];

const packages = [
  {
    name: "Start",
    price: "2.050€",
    oldPrice: "2.700€",
    features: [
      "Consultație complexă",
      "CT + plan tratament",
      "Intervenție de bază",
      "Control post-tratament",
    ],
  },
  {
    name: "Advanced",
    price: "3.042€",
    oldPrice: "4.150€",
    features: [
      "Tot din pachetul Start",
      "Materiale premium",
      "Anestezie modernă",
      "2 controale incluse",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "5.398€",
    oldPrice: "6.490€",
    features: [
      "Tot din pachetul Advanced",
      "Plan extins de reabilitare",
      "Monitorizare 6 luni",
      "Prioritate la programări",
    ],
  },
];

const faqItems = [
  {
    question: "Cât durează tratamentul?",
    answer:
      "Durata exactă depinde de situația clinică. După consultație primești calendar clar pe etape.",
  },
  {
    question: "Este dureros?",
    answer:
      "Protocolul nostru include tehnici moderne de anestezie, astfel tratamentul este confortabil.",
  },
  {
    question: "Pot plăti în etape?",
    answer:
      "Da. Pentru fiecare plan stabilim un grafic de plată pe etape, transparent și predictibil.",
  },
  {
    question: "Ce include prețul?",
    answer:
      "În pachetele noastre sunt incluse consultația, planul, procedurile principale și controalele indicate.",
  },
];

const doctors = [
  { name: "Sineac Alexei", role: "Medic coordonator", image: "/img.png" },
  {
    name: "Bîvol Cristian",
    role: "Medic chirurg dento-alveolar",
    image: "/img-1.png",
  },
  { name: "Carp Radu", role: "Medic implantolog", image: "/img-2.png" },
  { name: "Stogniev Igor", role: "Medic ortoped", image: "/img-3.png" },
];

const reviews = [
  {
    author: "Elena C.",
    text: "Am primit explicații clare și tratament fără surprize. Rezultatul arată foarte natural.",
  },
  {
    author: "Mihai R.",
    text: "Programarea a fost rapidă, iar echipa a lucrat foarte atent la fiecare detaliu.",
  },
  {
    author: "Tatiana S.",
    text: "Mi-a plăcut că am avut plan complet de la început, inclusiv costuri și etape.",
  },
];

export const ServiceDetailPage = () => {
  return (
    <SiteLayout headerSource="service_header" footerSource="service_footer">
      {(openModal) => (
        <div className="flex flex-col w-full items-start gap-5 px-4 md:px-8 lg:px-[170px] py-6 md:py-10">
          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[420px]">
                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between bg-[#336699]">
                  <div className="flex items-center gap-2 text-xs md:text-sm mb-6">
                    <Link
                      href="/"
                      className="text-white/70 font-extralight hover:text-white transition-colors"
                    >
                      Acasă
                    </Link>
                    <span className="text-white/70">|</span>
                    <span className="text-white font-normal">Serviciu exemplu</span>
                  </div>

                  <div className="max-w-[640px]">
                    <h1 className="font-normal text-white text-4xl md:text-5xl lg:text-[66px] tracking-[-2px] md:tracking-[-3px] leading-tight mb-4 md:mb-6">
                      Reabilitare dentară completă
                    </h1>
                    <p className="font-extralight text-white/90 text-base md:text-xl leading-6 md:leading-8 mb-6 md:mb-8">
                      Pagină demo pentru structură: beneficii, etape, pachete și
                      întrebări frecvente, în stilul vizual Topdentica.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        onClick={() => openModal("service_hero")}
                        className="h-11 md:h-12 px-4 md:px-5 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-xl md:rounded-2xl"
                      >
                        <span className="font-extralight text-white text-sm md:text-base">
                          Programează consultația
                        </span>
                      </Button>
                      <Button
                        asChild
                        className="h-11 md:h-12 px-4 md:px-5 bg-white/10 hover:bg-white/20 rounded-xl md:rounded-2xl"
                      >
                        <Link href="/prices">
                          <span className="font-extralight text-white text-sm md:text-base">
                            Vezi prețurile
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-cover bg-center min-h-[260px]"
                  style={{ backgroundImage: "url(/bloc2.jpg)" }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((item) => (
              <Card
                key={item.label}
                className="bg-white rounded-2xl md:rounded-[24px] border-0 shadow-none"
              >
                <CardContent className="p-4 md:p-6 flex flex-col gap-2">
                  <span className="font-normal text-[#336699] text-2xl md:text-3xl lg:text-4xl leading-tight">
                    {item.value}
                  </span>
                  <span className="font-extralight text-[#1d252d99] text-xs md:text-sm leading-5">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="font-normal text-[#336699] text-3xl md:text-5xl lg:text-[58px] tracking-[-2px] md:tracking-[-2.6px] leading-tight">
                    Zâmbetul pe care îl meriți
                  </h2>
                  <p className="font-extralight text-[#1d252d99] text-sm md:text-base mt-2">
                    Exemple vizuale înainte / după tratament
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {["/img.png", "/img-1.png", "/img-2.png"].map((image, index) => (
                  <div
                    key={image}
                    className="relative min-h-[260px] md:min-h-[320px] rounded-2xl overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003569d4] to-transparent" />
                    <div className="relative h-full flex items-end p-4">
                      <span className="inline-flex px-3 py-1.5 rounded-full bg-[#ffffffdd] text-[#336699] text-xs md:text-sm">
                        Caz {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10">
              <h2 className="font-normal text-[#1d252d] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px] mb-6 md:mb-8">
                Beneficii principale
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <Card
                      key={benefit.title}
                      className="bg-[#0035690a] rounded-2xl md:rounded-[24px] border-0 shadow-none"
                    >
                      <CardContent className="p-5 md:p-6 flex flex-col gap-3">
                        <span className="inline-flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-xl bg-[#56B3EE]/20 text-[#336699]">
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </span>
                        <h3 className="font-normal text-[#336699] text-lg md:text-xl leading-7">
                          {benefit.title}
                        </h3>
                        <p className="font-extralight text-[#1d252d99] text-sm leading-6">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
              <h2 className="font-normal text-[#336699] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px]">
                Ce spun pacienții noștri
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {reviews.map((review) => (
                  <Card
                    key={review.author}
                    className="bg-[#f5f7fa] rounded-2xl md:rounded-[24px] border-0 shadow-none"
                  >
                    <CardContent className="p-5 md:p-6 flex flex-col gap-4">
                      <div className="flex items-center gap-1 text-[#56B3EE]">
                        {[0, 1, 2, 3, 4].map((idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="font-extralight text-[#1d252d] text-sm md:text-base leading-6">
                        {review.text}
                      </p>
                      <span className="font-normal text-[#336699] text-sm md:text-base">
                        {review.author}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
              <h2 className="font-normal text-[#1d252d] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px]">
                Etape de tratament
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {steps.map((step, index) => (
                  <Card
                    key={step.title}
                    className="bg-[#336699] rounded-2xl md:rounded-[24px] border-0 shadow-none"
                  >
                    <CardContent className="p-5 md:p-6 flex flex-col gap-4">
                      <span className="font-normal text-[#56B3EE] text-4xl md:text-5xl leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-normal text-white text-lg md:text-xl leading-7">
                        {step.title}
                      </h3>
                      <p className="font-extralight text-white/80 text-sm leading-6">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="font-normal text-[#336699] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px]">
                  Alege pachetul potrivit
                </h2>
                <Link
                  href="/prices"
                  className="inline-flex items-center gap-2 text-[#336699] hover:opacity-80 transition-opacity"
                >
                  <span className="font-extralight text-sm md:text-base">Vezi toate prețurile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {packages.map((pack) => (
                  <Card
                    key={pack.name}
                    className={`rounded-2xl md:rounded-[24px] border-0 shadow-none ${
                      pack.featured ? "bg-[#336699]" : "bg-[#0035690a]"
                    }`}
                  >
                    <CardContent className="p-5 md:p-6 flex flex-col h-full gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={`font-normal text-xl md:text-2xl ${
                            pack.featured ? "text-white" : "text-[#336699]"
                          }`}
                        >
                          {pack.name}
                        </h3>
                        {pack.featured && (
                          <span className="inline-flex h-8 px-3 items-center rounded-full bg-[#56B3EE] text-white text-xs">
                            Recomandat
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-normal text-3xl md:text-4xl ${
                            pack.featured ? "text-white" : "text-[#1d252d]"
                          }`}
                        >
                          {pack.price}
                        </span>
                        <span
                          className={`font-extralight line-through text-sm ${
                            pack.featured ? "text-white/70" : "text-[#1d252d80]"
                          }`}
                        >
                          {pack.oldPrice}
                        </span>
                      </div>

                      <ul className="flex flex-col gap-2">
                        {pack.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex items-start gap-2 text-sm ${
                              pack.featured ? "text-white/90" : "text-[#1d252d]"
                            }`}
                          >
                            <Check className="w-4 h-4 mt-0.5" />
                            <span className="font-extralight leading-6">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => openModal(`service_package_${pack.name.toLowerCase()}`)}
                        className={`mt-auto h-11 rounded-xl ${
                          pack.featured
                            ? "bg-[#56B3EE] hover:bg-[#56B3EE]/90"
                            : "bg-[#336699] hover:bg-[#336699]/90"
                        }`}
                      >
                        <span className="font-extralight text-white">Programează-te</span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-[#336699] rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-8">
              <div>
                <h2 className="font-normal text-white text-2xl md:text-4xl lg:text-[42px] tracking-[-1px] mb-3">
                  Programează o consultație
                </h2>
                <p className="font-extralight text-white/80 text-sm md:text-base mb-6">
                  Lasă datele tale și revenim cu un apel în cel mai scurt timp.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Nume"
                    className="h-11 bg-white border-0 text-[#1d252d] placeholder:text-[#1d252d66]"
                  />
                  <Input
                    placeholder="Telefon"
                    className="h-11 bg-white border-0 text-[#1d252d] placeholder:text-[#1d252d66]"
                  />
                  <Input
                    placeholder="Email"
                    className="h-11 bg-white border-0 text-[#1d252d] placeholder:text-[#1d252d66]"
                  />
                  <Input
                    placeholder="Serviciu"
                    className="h-11 bg-white border-0 text-[#1d252d] placeholder:text-[#1d252d66]"
                  />
                </div>

                <Button
                  onClick={() => openModal("service_contact_form")}
                  className="mt-4 h-11 md:h-12 px-5 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-xl"
                >
                  <span className="font-extralight text-white">Trimite cererea</span>
                </Button>
              </div>

              <div className="rounded-2xl overflow-hidden min-h-[240px] bg-[#ffffff12] p-4 md:p-6 flex flex-col justify-between">
                <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs md:text-sm">
                  <CalendarCheck2 className="w-4 h-4" />
                  Programare rapidă
                </div>
                <p className="font-extralight text-white/85 text-sm md:text-base leading-6">
                  Consultația include evaluare inițială, estimarea etapelor și
                  recomandări personalizate pentru cazul tău.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10">
              <h2 className="font-normal text-[#1d252d] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px] mb-4 md:mb-6">
                Întrebări frecvente
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-normal text-[#336699] text-base md:text-lg hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#1d252d99] text-sm md:text-base leading-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="w-full bg-white rounded-2xl md:rounded-[32px] border-0">
            <CardContent className="p-6 md:p-10">
              <h2 className="font-normal text-[#336699] text-2xl md:text-4xl lg:text-[42px] tracking-[-1px] mb-6">
                Echipa implicată în tratament
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.name}
                    className="rounded-2xl overflow-hidden bg-[#0035690a]"
                  >
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${doctor.image})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-normal text-[#1d252d] text-base md:text-lg">
                        {doctor.name}
                      </h3>
                      <p className="font-extralight text-[#1d252d99] text-sm mt-1">
                        {doctor.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </SiteLayout>
  );
};
