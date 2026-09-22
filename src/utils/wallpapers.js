// Collect every matching image from the assets folder.
const wallpaperModules = import.meta.glob("../assets/WALLPAPER_*", {
  eager: true,
  query: "?url",
  import: "default",
});

/**
 * @param {number} [limit] - how many images to return (optional)
 */
export const getWallpapers = (limit) => {
  const slides = Object.entries(wallpaperModules)
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map(([path, image]) => ({
      id: path,
      image,
    }));

  return typeof limit === "number" ? slides.slice(0, limit) : slides;
};
