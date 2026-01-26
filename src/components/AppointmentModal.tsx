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

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AppointmentModal = ({
  open,
  onOpenChange,
}: AppointmentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] bg-white rounded-[32px] p-12">
        <DialogHeader className="space-y-6">
          <DialogTitle className="[font-family:'Inter',Helvetica] font-normal text-[#336699] text-[40px] tracking-[-1.92px] leading-[48px] text-left">
            Запись на консультацию
          </DialogTitle>
          <DialogDescription className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-base leading-6 text-left">
            Перезвоним в течение 15 минут (работаем по будням с 8 до 21,
            <br />
            по выходным с 9 до 21).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Имя*"
              className="h-14 rounded-2xl border border-[#1d252d1f] bg-white px-6 [font-family:'Manrope',Helvetica] font-extralight text-base placeholder:text-[#1d252d99]"
            />
            <Input
              placeholder="Номер телефона*"
              type="tel"
              className="h-14 rounded-2xl border border-[#1d252d1f] bg-white px-6 [font-family:'Manrope',Helvetica] font-extralight text-base placeholder:text-[#1d252d99]"
            />
          </div>

          <Button className="w-full h-14 bg-[#ae955f] hover:bg-[#ae955f]/90 rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-white text-lg">
            Отправить
          </Button>

          <div className="flex items-start gap-3">
            <Checkbox id="consent" className="mt-1" />
            <label
              htmlFor="consent"
              className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d99] text-sm leading-5 cursor-pointer"
            >
              Даю согласие ООО МЦ «АГАМИ» на обработку моих персональных данных в
              соответствии с требованиями ФЗ от 27.07.2006г. № 152-ФЗ «О персональных
              данных» и{" "}
              <a
                href="#"
                className="underline hover:no-underline"
              >
                Политикой обработки и защиты персональных данных.
              </a>
            </label>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <p className="[font-family:'Manrope',Helvetica] font-extralight text-[#1d252d] text-base">
              Или напишите нам
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-12 px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base"
              >
                В Telegram 📱
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 bg-white border border-[#1d252d1f] hover:bg-[#f5f5f5] rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-[#ae955f] text-base"
              >
                В WhatsApp 💬
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
