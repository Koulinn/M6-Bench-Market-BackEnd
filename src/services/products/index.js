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
  .route("/:id")
  .get(product.getSingle)
  .put(product.update)
  .delete(product.deleteSingle)

export default router
