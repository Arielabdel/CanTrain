const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/toppings.json');

  //GET semua topping / GET ALL TOPPINGS
exports.getAllToppings = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Topping tidak ditemukan.' });
    }
    const toppings = JSON.parse(data);
    res.json({
      status: 'success',
      count: toppings.length,
      data: toppings
    });
  });
};

  //GET TOPPING BY ID
exports.getToppingById = (req, res) => {
  const id = req.params.id;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data topping.' });
    }
    const toppings = JSON.parse(data);
    const topping = toppings.find(item => item.id === id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping tidak ditemukan.' });
    }
    res.json({ status: 'success', data: topping });
  });
};

  // POST ADD TOPPING
exports.addTopping = (req, res) => {
  const newTopping = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data topping.' });
    }
    const toppings = JSON.parse(data);
    toppings.push(newTopping);
    fs.writeFile(filePath, JSON.stringify(toppings, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menambahkan topping.' });
      }
      res.status(201).json({ status: 'success', data: newTopping });
    });
  });
};

  //PUT UPDATE TOPPING BY ID
exports.updateTopping = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data topping.' });
    }
    let toppings = JSON.parse(data);
    const index = toppings.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Topping tidak ditemukan.' });
    }
    toppings[index] = { ...toppings[index], ...updatedData };
    fs.writeFile(filePath, JSON.stringify(toppings, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal memperbarui topping.' });
      }
      res.json({ status: 'success', data: toppings[index] });
    });
  });
};

  //DELETE TOPPING BY ID
exports.deleteTopping = (req, res) => {
  const id = req.params.id;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data topping.' });
    }
    let toppings = JSON.parse(data);
    const index = toppings.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Topping tidak ditemukan.' });
    }
    const deletedTopping = toppings.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(toppings, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menghapus topping.' });
      }
      res.json({ status: 'success', data: deletedTopping[0] });
    });
  });
};