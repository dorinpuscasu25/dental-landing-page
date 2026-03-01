"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const syncModalQuery = (open: boolean, source?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set(POPUP_QUERY_KEY, POPUP_QUERY_VALUE);
      if (source) params.set(POPUP_SOURCE_KEY, source);
    } else {
      params.delete(POPUP_QUERY_KEY);
      params.delete(POPUP_SOURCE_KEY);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
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
    if (searchParams.get(POPUP_QUERY_KEY) === POPUP_QUERY_VALUE) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="bg-[linear-gradient(0deg,rgba(236,242,249,1)_0%,rgba(236,242,249,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-h-screen flex flex-col relative overflow-x-hidden">
      <NavigationHeaderSection onOpenModal={() => openModal(headerSource)} />
      <main className="flex-1 w-full">{children(openModal)}</main>
      {withFooter && <AppWrapperSection onOpenModal={() => openModal(footerSource)} />}
      <AppointmentModal open={isModalOpen} onOpenChange={handleModalChange} />
    </div>
  );
};
