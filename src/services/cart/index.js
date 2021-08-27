import express from "express"
import product from "./handlers.js"



const router = express.Router()

router
  .route("/")
  .get(product.getAll)

router
  .route("/:userId")
  .get(product.cartTotal)

router
  .route("/:userId/:productId")
  .post(product.addProduct)

// .put(product.update)

router
  .route("/:userId/:id")
  .delete(product.deleteSingleItem)

router
  .route("/:userId/:productId/products")
  .delete(product.deleteAllSameProd)

export default router
