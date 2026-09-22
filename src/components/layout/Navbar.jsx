import { useState } from "react";

import Logo from "../common/Logo";
import Search from "../common/Search";
import IconButton from "../ui/IconButton";
import { navigationLinks } from "../../constants/navigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 sm:px-6">
      {/* Navbar shell */}
      <div
        className={`
          container-site
          relative
          border
          border-white/10
          bg-white/[4%]
          shadow-glass
          backdrop-blur-xl
          transition-all
          duration-300
          ${isMenuOpen ? "rounded-[2.5rem] p-6" : "rounded-full px-4 py-3"}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden flex-1 justify-center lg:flex"
          >
            <ul className="flex items-center gap-5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="
                      text-small
                      whitespace-nowrap
                      transition-colors
                      duration-300
                      hover:text-cyan-200
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Search */}
          <Search />

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <IconButton
              label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span
                className={`text-lg transition-transform duration-300 block ${
                  isMenuOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </IconButton>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          inert={!isMenuOpen}
          className={`
            grid
            transition-all
            duration-300
            lg:hidden
            ${
              isMenuOpen
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="overflow-hidden">
            <nav aria-label="Mobile navigation" className="pt-2">
              <ul className="space-y-1">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="
                        block
                        rounded-full
                        px-4
                        py-2.5
                        text-center
                        text-sm
                        text-white/80
                        transition
                        duration-300
                        hover:bg-white/10
                        hover:text-white
                      "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 lg:hidden">
                <Search mobile />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
