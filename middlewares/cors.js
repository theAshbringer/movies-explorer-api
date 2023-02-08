// Массив разешённых доменов
const allowedCors = [
  'http://localhost:3005',
  'https://theAshbringer.github.io',
  'http://fordragon.movies-explorer.nomoredomains.club',
  'https://fordragon.movies-explorer.nomoredomains.club',
];

module.exports.corsOptions = {
  origin: allowedCors,
  allowedHeaders: ['Origin', 'Content-Type'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD'],
  credentials: true,
};
