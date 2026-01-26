import { ChevronDownIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

const navigationItems = [
  { label: "Услуги", hasDropdown: true },
  { label: "О клинике", hasDropdown: false },
  { label: "Команда", hasDropdown: false },
  { label: "Лечение во сне", hasDropdown: false },
  { label: "Пациентам", hasDropdown: true },
  { label: "Цены", hasDropdown: false },
  { label: "Контакты", hasDropdown: false },
];

export const NavigationHeaderSection = (): JSX.Element => {
  return (
    <header className="flex flex-col w-full items-start px-40 py-2.5 relative bg-transparent">
      <nav className="flex items-center justify-between px-6 py-5 relative self-stretch w-full bg-[#003569] rounded-3xl shadow-[0px_6px_24px_#0000000d]">
        <img className="relative flex-shrink-0" alt="Link" src="/link.svg" />

        <div className="flex items-center justify-between relative flex-1 ml-6">
          <NavigationMenu className="flex-1">
            <NavigationMenuList className="flex items-center gap-0">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink className="inline-flex items-center gap-1 px-2 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="[font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDownIcon className="w-4 h-4 text-white" />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 px-[30px]">
            <span className="text-white text-sm leading-3 whitespace-nowrap [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
              Москва,ул. Советской Армии, 17/52
            </span>
            <div className="w-px h-6 bg-white opacity-40" />
            <span className="text-white text-sm leading-3 whitespace-nowrap [font-family:'Manrope',Helvetica] font-extralight tracking-[0]">
              м. Марьина Роща
            </span>
          </div>

          <div className="flex items-center gap-0">
            <span className="pr-2.5 [font-family:'Manrope',Helvetica] font-extralight text-white text-sm tracking-[0] leading-[14px] whitespace-nowrap">
              8 (495) 085-66-46
            </span>
            <img
              className="flex-shrink-0"
              alt="List margin"
              src="/list-margin.svg"
            />
            <Button className="h-10 px-4 bg-[#ae955f] hover:bg-[#9d8454] text-white rounded-2xl [font-family:'Manrope',Helvetica] font-extralight text-base leading-4">
              Записаться
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
