const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/menu.json');

  //GET semua menu / GET ALL MENU
exports.getAllMenu = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Menu tidak ditemukan.' });
    }
    const menus = JSON.parse(data);
    res.json({
      status: 'success',
      count: menus.length,
      data: menus
    });
  });
};

  //GET MENU BY ID
exports.getMenuById = (req, res) => {
  const id = req.params.id;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data menu.' });
    }
    const menus = JSON.parse(data);
    const menu = menus.find(item => item.id === id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }
    res.json({ status: 'success', data: menu });
  });
};

  //POST ADD MENU
exports.addMenu = (req, res) => {
  const newMenu = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data menu.' });
    }
    const menus = JSON.parse(data);
    menus.push(newMenu);
    fs.writeFile(filePath, JSON.stringify(menus, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menambahkan menu.' });
      }
      res.status(201).json({ status: 'success', data: newMenu });
    });
  });
};

  //PUT UPDATE MENU BY ID
exports.updateMenu = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data menu.' });
    }
    let menus = JSON.parse(data);
    const index = menus.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }
    menus[index] = { ...menus[index], ...updatedData };
    fs.writeFile(filePath, JSON.stringify(menus, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal memperbarui menu.' });
      }
      res.json({ status: 'success', data: menus[index] });
    });
  });
};

  //DELETE MENU BY ID
exports.deleteMenu = (req, res) => {
  const id = req.params.id;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca data menu.' });
    }
    let menus = JSON.parse(data);
    const index = menus.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Menu tidak ditemukan.' });
    }
    const deletedMenu = menus.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(menus, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menghapus menu.' });
      }
      res.json({ status: 'success', data: deletedMenu[0] });
    });
  });
};
