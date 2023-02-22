import { useEffect, useState } from "react";
import { getRandomWallpaper } from "../wallpaper";

const Wallpaper = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState(null);

  useEffect(() => {
    async function fetchWallpaper() {
      const url = await getRandomWallpaper();
      setWallpaperUrl(url);
    }
    fetchWallpaper();
  }, []);
  return (
    <body
      style={{
        backgroundImage: wallpaperUrl ? `url(${wallpaperUrl})` : null,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    ></body>
  );
};

export default Wallpaper;
