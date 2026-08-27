"use client";
import ProjectCard from "./ProjectCard";

const resourceSections = [
  {
    id: "products",
    title: "Our Products",
    items: [
      {
        image: "/certitudeconsultancy.png",
        title: "Certitude Consultancy",
        url: "https://www.certitudeconsultancy.agency/",
      },
      {
        image: "/KweliVote.png",
        title: "KweliVote",
        url: "https://kwelivote.com",
      },
      {
        image: "/CertyPay.png",
        title: "CertyPay",
        url: "https://www.certypay.app",
      },
    ],
  },
  {
    id: "clients",
    title: "For Clients",
    items: [
      {
        image: "/findAndGet.png",
        title: "Find & Get",
        url: "https://findandgetgroup.com",
      },
      {
        image: "/tfpharma.png",
        title: "TF Pharma",
        url: "https://www.tfpharmaonline.com/",
      },
      {
        image: "/trfpledge.png",
        title: "TRF Pledger",
        url: "https://trfpledge.rotary9216.org/",
      },
    ],
  },
];

export default function Resources() {
  return (
    <section className="w-full border-b-2 border-amber-400 bg-slate-100 py-8">
      <h2 className="text-center text-2xl font-semibold mb-8">
        What We&apos;ve Built
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        {resourceSections.map((section, sectionIdx) => (
          <div
            key={`section-${sectionIdx}`}
            id={section.id}
            className="mb-12 scroll-mt-24 last:mb-0"
          >
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">
              {section.title}
            </h3>
            {section.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, idx) => {
                  return (
                    <ProjectCard
                      key={`${section.title}-${item.title}-${idx}`}
                      idx={idx}
                      {...item}
                      url={item.url}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 italic">
                Coming soon...
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
