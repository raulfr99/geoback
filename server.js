const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 📁 Ruta ABSOLUTA al archivo
const DATA_PATH = path.join(__dirname, "data.json");

app.post("/api/location", (req, res) => {
  console.log("📍 NUEVO REGISTRO:", req.body);

  try {
    let data = [];

    // 🔎 Leer si existe
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf8");
      data = raw ? JSON.parse(raw) : [];
    }

    // ➕ Agregar nuevo registro
    data.push(req.body);

    // 💾 Guardar archivo
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    console.log("✅ Guardado en:", DATA_PATH);

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ ERROR ESCRIBIENDO ARCHIVO:", err);
    res.status(500).json({ error: "No se pudo guardar" });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log("🚀 API ONLINE")
);
