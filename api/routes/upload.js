const Cart = require("../models/Cart");
const { verifyToken } = require("./verifyToken");
const multer = require("multer");
const path = require("path");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // Thư mục lưu trữ ảnh đã tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Giữ nguyên tên và phần mở rộng của ảnh
  },
});

const upload = multer({ storage: storage });

const router = require("express").Router();

//CREATE

router.post(
  "/images",
  verifyToken,
  upload.single("files"),
  async (req, res) => {
    return res.json({
      fileUrl: `http://localhost:5000/images/${req.file.filename}`
    });
  }
);
module.exports = router;
