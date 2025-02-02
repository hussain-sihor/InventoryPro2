const express = require("express")
const {addProduct ,getProduct, getProducts,getStatusProducts,getCategoryProducts,updateProduct,deleteProduct} = require("../controller/productController")
const router = express.Router()


router.post("/addproduct",addProduct)
router.get("/getproducts",getProducts)
router.post("/getstatusproducts",getStatusProducts)
router.post("/getcategoryproducts",getCategoryProducts)
router.get("/getproduct/:id",getProduct)
router.put("/updateproduct/:id",updateProduct)
router.delete("/deleteproduct/:id",deleteProduct)

module.exports = router