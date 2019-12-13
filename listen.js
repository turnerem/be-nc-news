const { PORT = 9090 } = process.env;

applicationCache.addEventListener(PORT, () => console.log(`listening on port ${PORT}`));