"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppointmentModal } from "../../components/AppointmentModal";
import { AppWrapperSection } from "../ElementLight/sections/AppWrapperSection/AppWrapperSection";
import { NavigationHeaderSection } from "../ElementLight/sections/NavigationHeaderSection";

const POPUP_QUERY_KEY = "popup";
const POPUP_QUERY_VALUE = "appointment";
const POPUP_SOURCE_KEY = "popup_source";

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
  const router = useRouter();
  const pathname = usePathname();

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
    } else {
      params.delete(POPUP_QUERY_KEY);
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

  useEffect(() => {
    const syncModalStateFromUrl = () => {
      const params = getCurrentSearchParams();
      setIsModalOpen(params.get(POPUP_QUERY_KEY) === POPUP_QUERY_VALUE);
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
      <AppointmentModal open={isModalOpen} onOpenChange={handleModalChange} />
    </div>
  );
};
