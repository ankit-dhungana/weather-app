const API_KEY = "7cw6t028ISUTEGaruWkmvIAcbkd7dlNHQ26zi4KR3zU";
const URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}`;

const getRandomWallpaper = async () => {
  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    urls: { regular },
  } = data;
  return regular;
};

export { getRandomWallpaper };
