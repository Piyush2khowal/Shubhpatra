import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { faqs } from "@/data/site";
import { SectionHeading } from "./ornaments";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="font-display italic">answered</span>
            </>
          }
        />
        <div className="border-gold/30 mt-12 border-t">
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-gold/30 border-b">
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : index)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"
                >
                  <span className="text-cocoa min-w-0 text-base sm:text-lg">{item.q}</span>
                  {active ? (
                    <Minus className="text-gold h-4 w-4 shrink-0" />
                  ) : (
                    <Plus className="text-gold h-4 w-4 shrink-0" />
                  )}
                </button>
                {active ? (
                  <p className="text-brown/80 pb-6 text-sm leading-relaxed">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
