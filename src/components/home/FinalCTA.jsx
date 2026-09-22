import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { finalCtaSection } from "../../constants/site";

function FinalCTA() {
  return (
    <section id="contact" className="py-10 sm:py-14 lg:py-20">
      <Container>
        <GlassCard
          strong
          className="relative overflow-hidden border-orange-300/10 p-8 text-center sm:p-12 lg:p-16"
        >
          {/* Orange Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl"
          />

          {/* Cyan Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/[6%] blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-label">{finalCtaSection.eyebrow}</p>

            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {finalCtaSection.title}
            </h2>

            <p className="mt-5 text-lg font-medium text-white/65 sm:text-xl">
              {finalCtaSection.description}
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                href={finalCtaSection.buttonHref}
                className="min-w-44 bg-pryda-orange shadow-[0_0_35px_rgba(255,122,47,0.18)] hover:bg-pryda-orange-hover hover:shadow-[0_0_45px_rgba(255,122,47,0.25)]"
              >
                {finalCtaSection.buttonLabel}
              </Button>
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}

export default FinalCTA;
