import { Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/shubhpatra-logo.jpg.asset.json";
import { brand } from "@/data/products";
import { whatsappLink } from "./enquiry";
import { BotanicalOrnament, GoldDivider, SectionHeading } from "./ornaments";

export function Contact() {
  return (
    <section id="contact" className="bg-green-deep py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <SectionHeading
          eyebrow="Enquire"
          title={
            <>
              Let us begin your <span className="font-display italic">shubh patra</span>
            </>
          }
          lead="Share your dates, ceremonies and the feeling you want your guests to hold in their hands. We reply within one working day."
          tone="dark"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Phone,
              label: "Call",
              value: brand.phone,
              href: `tel:${brand.phone.replace(/\s/g, "")}`,
            },
            { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
            { icon: MapPin, label: "Studios", value: brand.city },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="border-gold/35 border p-6">
              <Icon className="text-gold mx-auto h-5 w-5" />
              <p className="text-gold/80 mt-4 text-[0.6rem] tracking-[0.3em] uppercase">{label}</p>
              {href ? (
                <a href={href} className="text-ivory hover:text-gold mt-2 block text-sm">
                  {value}
                </a>
              ) : (
                <p className="text-ivory mt-2 text-sm">{value}</p>
              )}
            </div>
          ))}
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="bg-gold text-green-deep hover:bg-gold-bright mt-10 inline-block px-10 py-3.5 text-[0.72rem] tracking-[0.3em] uppercase transition-colors"
        >
          Start a WhatsApp Enquiry
        </a>

        <BotanicalOrnament className="mx-auto mt-12 opacity-70" />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-green-night border-gold/25 border-t py-12">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <img
          src={logo.url}
          alt={`${brand.name} crest`}
          width={64}
          height={64}
          className="border-gold/40 mx-auto h-14 w-14 rounded-full border object-cover"
        />
        <p className="text-ivory font-display mt-4 text-lg tracking-[0.4em]">{brand.name}</p>
        <p className="text-gold/80 mt-2 text-[0.6rem] tracking-[0.3em] uppercase">
          {brand.tagline}
        </p>
        <GoldDivider className="mt-6" />
        <p className="text-ivory/50 mt-6 text-[0.65rem] tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} {brand.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
