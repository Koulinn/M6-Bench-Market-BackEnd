import express from "express"
import product from "./handlers.js"



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
  .route("/pagination/:filter/:offset/:value")
  .get(product.pagination)

export default router
