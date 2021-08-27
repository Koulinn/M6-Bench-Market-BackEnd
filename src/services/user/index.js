import express from "express"
import user from "./handlers.js"
import lib from '../../lib/index.js'
import multer from "multer"
const {cloudStorage} = lib

const router = express.Router()

router
  .route("/")
  .get(user.getAll)
  .post(user.create)

router
  .route("/:id")
  .get(user.getSingle)
  .put(user.update)
  .delete(user.deleteSingle)

router
  .route("/:id/avatar")
    .put(multer({ storage: cloudStorage }).single('avatar'), user.uploadAvatar)

export default router
