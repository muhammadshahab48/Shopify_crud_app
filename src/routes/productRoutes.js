const { Router } = require('express');
const productController = require("../controllers/productController");
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = Router();

router.post("/products", authMiddleware, productController.createProductHandler)
router.get("/products", authMiddleware, productController.getAllProductHandler)
router.get("/products/:id", authMiddleware, productController.getOneProductHandler)
router.put("/products/:id", authMiddleware, productController.updateProductHandler)
router.delete("/products/:id", authMiddleware, productController.deleteProductHandler)

module.exports = router