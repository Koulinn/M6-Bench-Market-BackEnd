import express from "express"
import category from "./handlers.js"

const router = express.Router()

router
  .route("/")
  .get(category.search, category.getAll)
  .post(category.search, category.create)

router
  .route("/:id")
  .get(category.getSingle)
  .put(category.update)
  .delete(category.deleteSingle)

export default router
