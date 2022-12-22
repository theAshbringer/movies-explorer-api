// Массив разешённых доменов
const allowedCors = [
  'http://localhost:3005',
  'https://theAshbringer.github.io',
  'https://mesto.theashbringer.nomoredomains.club',
  'http://mesto.theashbringer.nomoredomains.club',
];

module.exports.corsOptions = {
  origin: allowedCors,
  allowedHeaders: ['Origin', 'Content-Type'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD'],
  credentials: true,
};
