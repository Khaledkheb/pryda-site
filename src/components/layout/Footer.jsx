import { footerColumns } from "../../constants/footer";
import { siteMeta } from "../../constants/site";
import Logo from "../common/Logo";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="container-site py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-label">{column.title}</h2>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="
                        text-small
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
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/5 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <Logo />

          <p className="text-small">{siteMeta.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
