"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
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
  onSuccess: () => void;
}

export const AppointmentModal = ({
  open,
  onOpenChange,
  onSuccess,
}: AppointmentModalProps) => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("MD");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const countryNames = useMemo(
    () => new Intl.DisplayNames([language], { type: "region" }),
    [language],
  );

  const phoneCountries = useMemo(
    () =>
      getCountries()
        .map((country) => ({
          code: country,
          name: countryNames.of(country) ?? country,
          callingCode: getCountryCallingCode(country),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, language)),
    [countryNames, language],
  );

  const normalizedPhone = useMemo(() => {
    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      return "";
    }

    return parsePhoneNumberFromString(trimmedPhone, phoneCountry)?.number ?? "";
  }, [phone, phoneCountry]);

  const isPhoneValid = phone.trim().length > 0 && isValidPhoneNumber(phone, phoneCountry);
  const showPhoneError = phoneTouched && phone.trim().length > 0 && !isPhoneValid;

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

  const phoneMessages = {
    ro: "Introduceți un număr de telefon valid.",
    ru: "Введите корректный номер телефона.",
    en: "Please enter a valid phone number.",
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPhoneValid) {
      setPhoneTouched(true);
      setStatus("error");
      setErrorMessage(phoneMessages[language]);
      return;
    }

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
          phone: normalizedPhone,
          language,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        throw new Error(
          typeof responseBody?.details === "string"
            ? responseBody.details
            : "Telegram request failed",
        );
      }

      setName("");
      setPhone("");
      setPhoneTouched(false);
      setConsent(false);
      setStatus("idle");
      onSuccess();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message !== "Telegram request failed"
          ? `${errorMessages[language]} ${error.message}`
          : errorMessages[language],
      );
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
            <div className="flex flex-col gap-1.5">
              <div
                className={`flex h-12 md:h-14 overflow-hidden rounded-2xl border bg-white transition-colors ${
                  showPhoneError
                    ? "border-red-500"
                    : "border-[#1d252d1f] focus-within:border-[#56B3EE]"
                }`}
              >
                <select
                  aria-label={t.modal.phonePlaceholder}
                  value={phoneCountry}
                  onChange={(event) => {
                    setPhoneCountry(event.target.value as CountryCode);
                    setPhoneTouched(true);
                  }}
                  className="w-[112px] shrink-0 border-0 border-r border-[#1d252d1f] bg-white px-3 font-extralight text-base text-[#1d252d] outline-none"
                >
                  {phoneCountries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} +{country.callingCode}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder={t.modal.phonePlaceholder}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onBlur={() => setPhoneTouched(true)}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setPhoneTouched(true);
                    if (status === "error") {
                      setErrorMessage("");
                      setStatus("idle");
                    }
                  }}
                  required
                  aria-invalid={showPhoneError}
                  className="h-full rounded-none border-0 bg-white px-4 md:px-6 font-extralight text-base placeholder:text-[#1d252d99] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              {showPhoneError && (
                <p className="font-extralight text-red-600 text-xs md:text-sm">
                  {phoneMessages[language]}
                </p>
              )}
            </div>
          </div>

          <Button
            className="w-full h-12 md:h-14 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-2xl font-extralight text-white text-base md:text-lg"
            disabled={status === "loading" || !isPhoneValid}
          >
            {status === "loading" ? "..." : t.modal.submitButton}
          </Button>

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
