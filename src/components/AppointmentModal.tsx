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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] bg-white rounded-[32px] p-12">
        <DialogHeader className="space-y-6">
          <DialogTitle className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-[40px] tracking-[-1.92px] leading-[48px] text-left">
            {t.modal.title}
          </DialogTitle>
          <DialogDescription className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-base leading-6 text-left whitespace-pre-line">
            {t.modal.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder={t.modal.namePlaceholder}
              className="h-14 rounded-2xl border border-[#1d252d1f] bg-white px-6 [font-family:'Manrope',Helvetica] font-extralight text-base placeholder:text-[#1d252d99]"
            />
            <Input
              placeholder={t.modal.phonePlaceholder}
              type="tel"
              className="h-14 rounded-2xl border border-[#1d252d1f] bg-white px-6 [font-family:'Manrope',Helvetica] font-extralight text-base placeholder:text-[#1d252d99]"
            />
          </div>

          <Button className="w-full h-14 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-white text-lg">
            {t.modal.submitButton}
          </Button>

          <div className="flex items-start gap-3">
            <Checkbox id="consent" className="mt-1" />
            <label
              htmlFor="consent"
              className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-sm leading-5 cursor-pointer"
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

          <div className="flex flex-col gap-3 pt-4">
            <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-base">
              {t.modal.orWriteUs}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base"
                asChild
              >
                <a href="https://www.instagram.com/topdenticamd/" target="_blank" rel="noopener noreferrer">
                  {t.modal.telegram}
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base"
                asChild
              >
                <a href="https://wa.me/37368303088" target="_blank" rel="noopener noreferrer">
                  {t.modal.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
