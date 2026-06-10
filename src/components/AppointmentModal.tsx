"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslations } from "../translations";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AppointmentModal = ({
  open,
  onOpenChange,
}: AppointmentModalProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const successMessages = {
    ro: "Mulțumim! Cererea a fost trimisă.",
    ru: "Спасибо! Заявка отправлена.",
    en: "Thank you! Your request has been sent.",
  };

  const errorMessages = {
    ro: "Nu am putut trimite cererea. Încercați din nou.",
    ru: "Не удалось отправить заявку. Попробуйте еще раз.",
    en: "We could not send your request. Please try again.",
  };

  const consentMessages = {
    ro: "Vă rugăm să acceptați prelucrarea datelor personale.",
    ru: "Пожалуйста, подтвердите согласие на обработку персональных данных.",
    en: "Please accept the personal data processing consent.",
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!consent) {
      setStatus("error");
      setErrorMessage(consentMessages[language]);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Telegram request failed");
      }

      setStatus("success");
      setName("");
      setPhone("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMessage(errorMessages[language]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[800px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px] md:rounded-[32px] p-4 sm:p-6 md:p-10">
        <DialogHeader className="space-y-4 md:space-y-6 pr-8">
          <DialogTitle className=" font-normal text-[#336699] text-[28px] md:text-[40px] tracking-[-1.2px] md:tracking-[-1.92px] leading-[34px] md:leading-[48px] text-left">
            {t.modal.title}
          </DialogTitle>
          <DialogDescription className=" font-extralight text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 text-left whitespace-pre-line">
            {t.modal.description}
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-5 md:gap-6 mt-6 md:mt-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <Input
              placeholder={t.modal.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="h-12 md:h-14 rounded-2xl border border-[#1d252d1f] bg-white px-4 md:px-6 font-extralight text-sm md:text-base placeholder:text-[#1d252d99]"
            />
            <Input
              placeholder={t.modal.phonePlaceholder}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              className="h-12 md:h-14 rounded-2xl border border-[#1d252d1f] bg-white px-4 md:px-6 font-extralight text-sm md:text-base placeholder:text-[#1d252d99]"
            />
          </div>

          <Button
            className="w-full h-12 md:h-14 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-2xl font-extralight text-white text-base md:text-lg"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : t.modal.submitButton}
          </Button>

          {status === "success" && (
            <p className="font-extralight text-[#336699] text-sm md:text-base">
              {successMessages[language]}
            </p>
          )}

          {status === "error" && (
            <p className="font-extralight text-red-600 text-sm md:text-base">
              {errorMessage || errorMessages[language]}
            </p>
          )}

          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              className="mt-1"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
            />
            <label
              htmlFor="consent"
              className=" font-extralight text-[#1d252d99] text-xs md:text-sm leading-5 cursor-pointer"
            >
              {t.modal.consent.split('Politica de prelucrare și protecție a datelor cu caracter personal').join('')}
              {t.modal.consent.includes('Politica de prelucrare și protecție a datelor cu caracter personal') && (
                <>
                  <a
                    href="#"
                    className="underline hover:no-underline"
                  >
                    Politica de prelucrare și protecție a datelor cu caracter personal
                  </a>
                  .
                </>
              )}
              {t.modal.consent.includes('Политикой обработки и защиты персональных данных') && (
                <>
                  {' '}
                  <a
                    href="#"
                    className="underline hover:no-underline"
                  >
                    Политикой обработки и защиты персональных данных.
                  </a>
                </>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-3 pt-2 md:pt-4">
            <p className=" font-extralight text-[#1d252d] text-sm md:text-base">
              {t.modal.orWriteUs}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="h-11 md:h-12 px-5 md:px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl font-extralight text-[#ae955f] text-sm md:text-base"
                asChild
              >
                <a href="https://www.instagram.com/topdenticamd/" target="_blank" rel="noopener noreferrer">
                  {t.modal.telegram}
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-11 md:h-12 px-5 md:px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl font-extralight text-[#ae955f] text-sm md:text-base"
                asChild
              >
                <a href="https://wa.me/37368303088" target="_blank" rel="noopener noreferrer">
                  {t.modal.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
