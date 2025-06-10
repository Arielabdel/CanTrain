const express = require('express');
const app = express();
const PORT = 3000;

  //Middleware
app.use(express.json());

  //Import routes
const menuRoutes = require('./routes/menuRoutes');
const toppingRoutes = require('./routes/toppingRoutes');

  //Gunakan routes
app.use('/menu', menuRoutes);
app.use('/toppings', toppingRoutes);

  //Tes endpoint
app.get('/', (req, res) => {
res.send('BobaKu API, OK!');
});

  //Jalankan server
app.listen(PORT, () => {
  console.log(`Servernya dah aktif cuy, coba cek di http://localhost:${PORT}`);
});