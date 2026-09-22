import { siteMeta } from "../../constants/site";

function AnnouncementBar() {
  return (
    <div className="border-b border-cyan-100/5 bg-cyan-100/[2%]">
      <div className="container-site">
        <div className="flex min-h-9 items-center justify-center gap-3 text-center">
          <span aria-hidden="true" className="text-cyan-200/60">
            ‹
          </span>

          <p className="text-small tracking-wide">{siteMeta.announcement}</p>

          <span aria-hidden="true" className="text-cyan-200/60">
            ›
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
