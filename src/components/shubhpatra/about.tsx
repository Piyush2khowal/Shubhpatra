import archImage from "@/assets/cat-physical.jpg";
import { about } from "@/data/site";
import { BotanicalOrnament, GoldDivider } from "./ornaments";
import { useReveal } from "./use-reveal";

export function About() {
  const { ref } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="bg-beige/50 py-20 sm:py-28">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8"
      >
        <div className="border-gold/30 relative border p-3">
          <img
            src={archImage}
            alt="Cream laser-cut wedding card with muted gold detail"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>
        <div className="min-w-0">
          <p className="text-taupe text-[0.7rem] tracking-[0.45em] uppercase">{about.eyebrow}</p>
          <h2 className="text-cocoa mt-4 text-3xl leading-tight sm:text-4xl">{about.title}</h2>
          <GoldDivider className="mt-6 justify-start" />
          {about.paragraphs.map((text) => (
            <p key={text} className="text-brown/80 mt-5 text-sm leading-relaxed sm:text-base">
              {text}
            </p>
          ))}
          <dl className="border-gold/30 mt-8 grid gap-6 border-t pt-8 sm:grid-cols-3">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-brown font-display text-3xl">{stat.value}</dt>
                <dd className="text-taupe mt-1 text-[0.6rem] tracking-[0.28em] uppercase">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
          <BotanicalOrnament className="mt-8 opacity-60" />
        </div>
      </div>
    </section>
  );
}
