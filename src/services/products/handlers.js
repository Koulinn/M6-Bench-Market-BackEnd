import db from "../../db/models/db_assoc.js"
import s from "sequelize"

const Category = db.Category
const Product = db.Product
const Comments = db.Comments
const User = db.User

const { Op } = s

const getAll = async (req, res, next) => {
    try {
      const data = await Product.findAll({
        include: [Category, {model:Comments, include: User}],
      })

      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  const getSingle = async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id, {
        include: [Category, {model:Comments, include: User}]
      })
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const create = async (req, res, next) => {
    try {
      const {categoryId} = req.params
      const data = await Product.create({...req.body, categoryId})
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const update = async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      })
      res.send(data[1][0])
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const deleteSingle = async (req, res, next) => {
    try {
      const rows = await Product.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (rows > 0) {
        res.send("ok")
      } else {
        res.status(404).send("not found")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  
  const product = {
    create: create,
    getAll: getAll,
    getSingle: getSingle,
    update:update,
    deleteSingle: deleteSingle
  }
  
  export default product