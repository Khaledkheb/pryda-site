import { useState } from "react";

import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

import { services, servicesSection } from "../../constants/services";

function Services() {
  const [activeService, setActiveService] = useState(
    servicesSection.activeService,
  );

  const activeServiceData =
    services.find((service) => service.id === activeService) ?? services[0];

  return (
    <section id="services" className="py-10 sm:py-14 lg:py-20">
      <Container>
        <GlassCard strong className="p-6 sm:p-8 lg:p-10">
          {/* =========================
              SECTION HEADING
          ========================== */}
          <SectionHeading
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.title}
            description={servicesSection.description}
          />

          {/* =================================================
              DESKTOP TABS
          ================================================== */}
          <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[0.35fr_0.65fr]">
            {/* Tabs */}
            <div>
              <div
                role="tablist"
                aria-label="Services"
                className="flex flex-col gap-2"
              >
                {services.map((service) => {
                  const isActive = service.id === activeService;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`service-panel-${service.id}`}
                      onClick={() => setActiveService(service.id)}
                      className={`
                        group
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-md
                        border
                        px-4
                        py-4
                        text-left
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-cyan-300/25 bg-cyan-300/[8%] text-white shadow-[0_0_25px_rgba(36,215,232,0.08)]"
                            : "border-transparent bg-white/[2%] text-white/50 hover:border-white/10 hover:bg-white/[4%] hover:text-white/80"
                        }
                      `}
                    >
                      <span className="text-sm font-bold">{service.title}</span>

                      <span
                        aria-hidden="true"
                        className={`
                          transition-transform
                          duration-300
                          ${
                            isActive
                              ? "translate-x-0 text-cyan-200"
                              : "text-white/20 group-hover:text-cyan-200/60"
                          }
                        `}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Content */}
            <div
              id={`service-panel-${activeServiceData.id}`}
              role="tabpanel"
              aria-label={activeServiceData.title}
              className="
                rounded-lg
                border
                border-white/10
                bg-white/[2.5%]
                p-6
                sm:p-8
              "
            >
              <p className="text-label">{activeServiceData.shortTitle}</p>

              <h3 className="text-heading mt-3">{activeServiceData.title}</h3>

              <p className="text-body mt-5 max-w-2xl">
                {activeServiceData.description}
              </p>

              {/* Platforms */}
              {activeServiceData.platforms.length > 0 && (
                <div className="mt-8">
                  <p className="text-small mb-3">
                    {servicesSection.platformsLabel}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activeServiceData.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/[4%]
                            px-3
                            py-2
                            text-xs
                            text-white/65
                            backdrop-blur-sm
                          "
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Button href={servicesSection.ctaHref} className="mt-8">
                {servicesSection.ctaLabel}
              </Button>
            </div>
          </div>

          {/* =================================================
              MOBILE ACCORDION
          ================================================== */}
          <div className="mt-8 lg:hidden">
            <div className="space-y-3">
              {services.map((service) => {
                const isActive = service.id === activeService;

                return (
                  <div
                    key={service.id}
                    className={`
                      overflow-hidden
                      rounded-md
                      border
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "border-cyan-300/20 bg-cyan-300/[4%]"
                          : "border-white/10 bg-white/[2%]"
                      }
                    `}
                  >
                    {/* Accordion Button */}
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() =>
                        setActiveService(isActive ? "" : service.id)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        px-4
                        py-4
                        text-left
                      "
                    >
                      <span
                        className={`
                          text-sm
                          font-bold
                          transition-colors
                          ${isActive ? "text-white" : "text-white/60"}
                        `}
                      >
                        {service.title}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          text-sm
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "rotate-45 border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
                              : "text-white/40"
                          }
                        `}
                      >
                        +
                      </span>
                    </button>

                    {/* Accordion Content */}
                    <div
                      className={`
                        grid
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }
                      `}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/5 px-4 pb-5 pt-4">
                          <p className="text-body">{service.description}</p>

                          {service.platforms.length > 0 && (
                            <div className="mt-6">
                              <p className="text-small mb-3">
                                {servicesSection.platformsLabel}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {service.platforms.map((platform) => (
                                  <span
                                    key={platform}
                                    className="
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/[4%]
                                        px-3
                                        py-2
                                        text-xs
                                        text-white/65
                                      "
                                  >
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <Button
                            href={servicesSection.ctaHref}
                            className="mt-6 w-full"
                          >
                            {servicesSection.ctaLabel}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}

export default Services;
