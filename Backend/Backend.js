const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");

// Konfigurasi aplikasi
const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi database
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pencarian_tim",
  connectionLimit: 10
});

// **Endpoint GET untuk tabel Tim**
app.get("/api/cari-tim", (req, res) => {
  const query = "SELECT * FROM tim";
  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data tim" });
    }
    res.json(results);
  });
});

// **Endpoint POST untuk tabel Tim**
app.post("/api/cari-tim", (req, res) => {
  const { judul_post, bidang_kompetisi, jumlah_anggota_dibutuhkan, contact, status } = req.body;
  const query =
    "INSERT INTO tim (judul_post, bidang_kompetisi, jumlah_anggota_dibutuhkan, contact, status) VALUES (?, ?, ?, ?, ?)";
  pool.query(
    query,
    [judul_post, bidang_kompetisi, jumlah_anggota_dibutuhkan, contact, status || "Belum Terpenuhi"],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Gagal menambahkan tim" });
      }
      res.json({ message: "Tim berhasil ditambahkan", id: result.insertId });
    }
  );
});

// **Endpoint GET untuk tabel Mahasiswa**
app.get("/api/cari-mahasiswa", (req, res) => {
  const query = "SELECT * FROM mahasiswa";
  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data mahasiswa" });
    }
    res.json(results);
  });
});

// **Endpoint POST untuk tabel Mahasiswa**
app.post("/api/cari-mahasiswa", (req, res) => {
  const { nama_mahasiswa, departemen, skill, pengalaman, kontak, status } = req.body;
  const query =
    "INSERT INTO mahasiswa (nama_mahasiswa, departemen, skill, pengalaman, kontak, status) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(
    query,
    [nama_mahasiswa, departemen, skill, pengalaman, kontak, status || "Belum Memiliki Tim"],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Gagal menambahkan mahasiswa" });
      }
      res.json({ message: "Mahasiswa berhasil ditambahkan", id: result.insertId });
    }
  );
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
