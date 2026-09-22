import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  render,
  screen,
  within,
  cleanup,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderApp = () => render(<App />);

describe("page renders every section", () => {
  it("shows the announcement, nav, hero, work, services, CTA and footer", () => {
    renderApp();

    expect(
      screen.getByText("Welcome to the PRYDA+ Design Studio"),
    ).toBeTruthy();

    expect(screen.getAllByText("+PRYDA").length).toBeGreaterThan(0);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A future vision for web design.",
      }),
    ).toBeTruthy();

    // the hero buttons
    expect(
      screen.getAllByRole("link", { name: "View Our Work" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Get a Quote" })).toBeTruthy();

    // featured work: 7 rows
    expect(screen.getAllByText(/Water Horizon|Stock Artwork/).length).toBe(2);
    expect(screen.getByText("Lightnings Above Amsterdam")).toBeTruthy();

    // services
    expect(screen.getByRole("tab", { name: /CMS & Coding/ })).toBeTruthy();
    expect(screen.getByRole("tab", { name: /Logo & Print/ })).toBeTruthy();

    // CTA + footer
    expect(
      screen.getByRole("heading", { level: 2, name: "Got a project in mind?" }),
    ).toBeTruthy();
    expect(screen.getByText("© 2026 PRYDA. All rights reserved.")).toBeTruthy();

    // every in-page anchor points at an element that exists
    const ids = new Set(
      Array.from(document.querySelectorAll("[id]")).map((el) => el.id),
    );
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')).filter(
      (a) => a.getAttribute("href") !== "#",
    );
    const broken = anchors
      .map((a) => a.getAttribute("href").slice(1))
      .filter((id) => !ids.has(id));

    expect(anchors.length).toBeGreaterThan(0);
    expect(broken).toEqual([]);
  });
});

describe("hero carousel", () => {
  it("advances with the next/previous buttons", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByText(/01\s*\/\s*05/)).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.getByText(/02\s*\/\s*05/)).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByText(/01\s*\/\s*05/)).toBeTruthy();

    // previous from the first slide wraps to the last one
    await user.click(screen.getByRole("button", { name: "Previous image" }));
    expect(screen.getByText(/05\s*\/\s*05/)).toBeTruthy();
  });

  it("jumps to a slide from the pagination dots", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Go to image 3" }));
    expect(screen.getByText(/03\s*\/\s*05/)).toBeTruthy();
  });

  it("auto-plays every 5 seconds and pauses on hover", () => {
    vi.useFakeTimers();
    renderApp();

    expect(screen.getByText(/01\s*\/\s*05/)).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/02\s*\/\s*05/)).toBeTruthy();

    // hovering the carousel pauses the auto-play
    const carousel = screen.getByRole("region", { name: "Featured work" });
    fireEvent.mouseEnter(carousel);

    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.getByText(/02\s*\/\s*05/)).toBeTruthy();

    // leaving resumes it
    fireEvent.mouseLeave(carousel);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/03\s*\/\s*05/)).toBeTruthy();
  });

  it("swaps the visible image when the slide changes", async () => {
    const user = userEvent.setup();
    renderApp();

    const first = screen.getByAltText("PRYDA+ project 1").getAttribute("src");

    await user.click(screen.getByRole("button", { name: "Next image" }));

    const second = screen.getByAltText("PRYDA+ project 2").getAttribute("src");

    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(second).not.toBe(first);
  });
});

describe("services", () => {
  it("switches the desktop tab panel", async () => {
    const user = userEvent.setup();
    renderApp();

    const panel = screen.getByRole("tabpanel");

    expect(within(panel).getByRole("heading", { name: "CMS & Coding" })).toBeTruthy();
    expect(within(panel).getByText("WordPress")).toBeTruthy();

    await user.click(screen.getByRole("tab", { name: /Logo & Print/ }));

    const newPanel = screen.getByRole("tabpanel");
    expect(
      within(newPanel).getByRole("heading", { name: "Logo & Print" }),
    ).toBeTruthy();
    expect(within(newPanel).queryByText("WordPress")).toBeNull();
  });

  it("opens the mobile accordion", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggle = screen.getAllByRole("button", {
      name: /Corporate Design/,
    })[0];

    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
  });
});

describe("navigation", () => {
  it("toggles the mobile menu button and closes it from a link", async () => {
    const user = userEvent.setup();
    renderApp();

    const openButton = screen.getByRole("button", { name: "Open menu" });

    await user.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Close menu" });
    expect(closeButton).toBeTruthy();

    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    await user.click(within(mobileNav).getByRole("link", { name: "Services" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });

  it("exposes the desktop navigation links", () => {
    renderApp();

    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    const labels = within(nav)
      .getAllByRole("link")
      .map((a) => a.textContent);

    expect(labels).toEqual(["Home", "Services", "Portfolio", "Contact"]);
  });

  it("renders the desktop and mobile search inputs", () => {
    renderApp();

    expect(screen.getAllByLabelText("Search the studio").length).toBe(2);
  });
});

describe("carousel keyboard support", () => {
  it("responds to arrow keys", async () => {
    const user = userEvent.setup();
    renderApp();

    const carousel = screen.getByRole("region", { name: "Featured work" });
    carousel.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText(/02\s*\/\s*05/)).toBeTruthy();

    await user.keyboard("{End}");
    expect(screen.getByText(/05\s*\/\s*05/)).toBeTruthy();

    await user.keyboard("{Home}");
    expect(screen.getByText(/01\s*\/\s*05/)).toBeTruthy();
  });
});
