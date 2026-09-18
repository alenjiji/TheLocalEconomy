import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pageMetadata } from "@/lib/seo";
import { PROGRAMME_PAGES, programmePage, programmeHref } from "@/lib/programmePages";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import ProgrammeDetail from "@/components/programme/ProgrammeDetail";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";

type Params = { params: Promise<{ slug: string }> };

/* A static export, so every page that exists is built up front and nothing
   else answers. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMME_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = programmePage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: `${page.name} — The Local Economy`,
    description: page.summary,
    path: programmeHref(page.slug),
  });
}

export default async function ProgrammeRoute({ params }: Params) {
  const page = programmePage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <ProgrammeDetail page={page} />
      </main>
      <SiteFooter />
      {/* Both no-op on the pointer type they are not for. */}
      <Cursor />
      <TouchFeedback />
    </>
  );
}
