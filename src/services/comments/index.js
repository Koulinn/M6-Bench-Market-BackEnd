import express from "express"
import comment from "./handlers.js"




const router = express.Router()

router
  .route("/")
  .get(comment.getAll)
  .post(comment.create)


router
  .route("/:id")
  .get(comment.getSingle)
  .put(comment.update)
  .delete(comment.deleteSingle)

export default router
