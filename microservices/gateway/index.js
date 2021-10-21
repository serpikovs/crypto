const Gateway = require('micromq/gateway');
console.log(process.env.RABBIT_URL)
const app = new Gateway({
  microservices: ['provideActualData'],
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

app.get(['/getActual'], async (req, res) => {
  await res.delegate('provideActualData');
});

app.listen(process.env.PORT);