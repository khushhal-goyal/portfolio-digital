import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Cursor, Loader, Sky, SmoothScroll } from "@/components/space/Experience";
import { About, Certifications, Contact, ExperienceSection, Footer, Hero, Navbar, Projects, Skills } from "@/components/space/Sections";
import { profile, socials } from "@/lib/portfolio";

const SpaceScene = lazy(() => import("@/components/space/SpaceScene"));

const title = "Khushhal Goyal — AI & Data Science Engineer";
const description = "Portfolio of Khushhal Goyal: AI & Data Science engineer, full stack developer and ML enthusiast building immersive web experiences.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "AI & Data Science Engineer",
          email: `mailto:${profile.email}`,
          url: profile.site,
          alumniOf: "JECRC University",
          sameAs: Object.values(socials),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <Sky />
      <ClientOnly fallback={null}>
        <Loader onDone={() => setReady(true)} />
        <SmoothScroll />
        <Cursor />
        <Suspense fallback={null}>{ready && <SpaceScene />}</Suspense>
      </ClientOnly>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExperienceSection />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
