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
  .delete(product.deleteSingleItem)


export default router
