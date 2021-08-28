import express from "express"
import product from "./handlers.js"
import lib from '../../lib/index.js'
import multer from "multer"
const {cloudStorage} = lib



const router = express.Router()

router
  .route("/")
  .get(product.getAll)

router
  .route("/:categoryId")
  .post(product.create)

router
  .route("/category/:categoryId")
  .get(product.getByCategory)

router
  .route("/:id")
  .get(product.getSingle)
  .put(product.update)
  .delete(product.deleteSingle)

router
  .route("/image/:id")
  .put(multer({ storage: cloudStorage }).single('image'), product.uploadProdImg)
  
export default router
