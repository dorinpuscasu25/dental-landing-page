"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppointmentModal } from "../../components/AppointmentModal";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslations } from "../../translations";
import { AppWrapperSection } from "../ElementLight/sections/AppWrapperSection/AppWrapperSection";
import { NavigationHeaderSection } from "../ElementLight/sections/NavigationHeaderSection";

const POPUP_QUERY_KEY = "popup";
const POPUP_QUERY_VALUE = "appointment";
const POPUP_SOURCE_KEY = "popup_source";
const SUCCESS_POPUP_VALUE = "success";
const FORM_STATUS_KEY = "form_status";
const FORM_STATUS_SUCCESS_VALUE = "success";

interface SiteLayoutProps {
  children: (openModal: (source?: string) => void) => ReactNode;
  headerSource?: string;
  footerSource?: string;
  withFooter?: boolean;
}

export const SiteLayout = ({
  children,
  headerSource = "header",
  footerSource = "footer",
  withFooter = true,
}: SiteLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = useTranslations(language);

  const getCurrentSearchParams = () => {
    if (typeof window === "undefined") {
      return new URLSearchParams();
    }

    return new URLSearchParams(window.location.search);
  };

  const syncModalQuery = (open: boolean, source?: string) => {
    const params = getCurrentSearchParams();

    if (open) {
      params.set(POPUP_QUERY_KEY, POPUP_QUERY_VALUE);
      if (source) params.set(POPUP_SOURCE_KEY, source);
      params.delete(FORM_STATUS_KEY);
    } else {
      if (params.get(POPUP_QUERY_KEY) === POPUP_QUERY_VALUE) {
        params.delete(POPUP_QUERY_KEY);
      }
      params.delete(POPUP_SOURCE_KEY);
    }

    const query = params.toString();
    const safePathname = pathname || "/";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(
      query ? `${safePathname}?${query}${hash}` : `${safePathname}${hash}`,
      { scroll: false },
    );
  };

  const openModal = (source?: string) => {
    syncModalQuery(true, source);
    setIsModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      syncModalQuery(false);
    }
  };

  const handleAppointmentSuccess = () => {
    const params = getCurrentSearchParams();
    params.set(POPUP_QUERY_KEY, SUCCESS_POPUP_VALUE);
    params.delete(POPUP_SOURCE_KEY);
    params.set(FORM_STATUS_KEY, FORM_STATUS_SUCCESS_VALUE);

    const query = params.toString();
    const safePathname = pathname || "/";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${safePathname}?${query}${hash}`, { scroll: false });

    setIsModalOpen(false);
    setIsSuccessOpen(true);
  };

  const handleSuccessChange = (open: boolean) => {
    setIsSuccessOpen(open);

    if (!open) {
      const params = getCurrentSearchParams();
      if (params.get(POPUP_QUERY_KEY) === SUCCESS_POPUP_VALUE) {
        params.delete(POPUP_QUERY_KEY);
      }
      params.delete(POPUP_SOURCE_KEY);

      const query = params.toString();
      const safePathname = pathname || "/";
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.replace(
        query ? `${safePathname}?${query}${hash}` : `${safePathname}${hash}`,
        { scroll: false },
      );
    }
  };

  useEffect(() => {
    const syncModalStateFromUrl = () => {
      const params = getCurrentSearchParams();
      setIsModalOpen(params.get(POPUP_QUERY_KEY) === POPUP_QUERY_VALUE);
      setIsSuccessOpen(params.get(POPUP_QUERY_KEY) === SUCCESS_POPUP_VALUE);
    };

    syncModalStateFromUrl();
    window.addEventListener("popstate", syncModalStateFromUrl);

    return () => {
      window.removeEventListener("popstate", syncModalStateFromUrl);
    };
  }, []);

  return (
    <div className="bg-[linear-gradient(0deg,rgba(236,242,249,1)_0%,rgba(236,242,249,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-h-screen flex flex-col relative overflow-x-hidden">
      <NavigationHeaderSection onOpenModal={() => openModal(headerSource)} />
      <main className="flex-1 w-full">{children(openModal)}</main>
      {withFooter && <AppWrapperSection onOpenModal={() => openModal(footerSource)} />}
      <AppointmentModal
        open={isModalOpen}
        onOpenChange={handleModalChange}
        onSuccess={handleAppointmentSuccess}
      />
      <Dialog open={isSuccessOpen} onOpenChange={handleSuccessChange}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[520px] bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10">
          <DialogHeader className="space-y-4 pr-8">
            <DialogTitle className="font-normal text-[#336699] text-[28px] md:text-[40px] tracking-[-1.2px] md:tracking-[-1.92px] leading-[34px] md:leading-[48px] text-left">
              {t.modal.successTitle}
            </DialogTitle>
            <DialogDescription className="font-extralight text-[#1d252d99] text-sm md:text-base leading-5 md:leading-6 text-left">
              {t.modal.successDescription}
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => handleSuccessChange(false)}
            className="mt-4 h-12 md:h-14 bg-[#56B3EE] hover:bg-[#56B3EE]/90 rounded-2xl font-extralight text-white text-base md:text-lg"
          >
            {t.modal.successButton}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
