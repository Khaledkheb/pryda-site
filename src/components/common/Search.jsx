function Search({ mobile = false }) {
  return (
    <div className={mobile ? "block" : "hidden md:block"}>
      <label
        htmlFor={mobile ? "mobile-search" : "studio-search"}
        className="sr-only"
      >
        Search the studio
      </label>

      <input
        id={mobile ? "mobile-search" : "studio-search"}
        type="search"
        placeholder="Search the studio..."
        className="
          h-10
          w-full
          rounded-full
          border
          border-white/10
          bg-white/[4%]
          px-4
          text-xs
          text-white
          outline-none
          backdrop-blur-md
          transition-all
          placeholder:text-white/35
          focus:border-cyan-200/30
          focus:bg-cyan-200/5
          focus:shadow-[0_0_25px_rgba(36,215,232,0.08)]
          md:w-44
        "
      />
    </div>
  );
}

export default Search;
