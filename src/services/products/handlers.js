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
      const category = await Category.findOne({where: {id: categoryId}})
      if(!category){
        res.status(404).send({msg: `Category with ${req.params.categoryId} doesn't exist`})
     
      } else {
        const data = await Product.create({...req.body, categoryId})
        res.status(201).send(data)

      }
     
    } catch (error) {
      // console.log(error)
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
  
  const getByCategory = async (req, res, next) => {
    try {
      console.log(req.params.categoryId, '<<<<<<<<<<<<<<<<<<<<<<')
      const data = await Product.findAll({
        // include: Category,
        where: {
          categoryId: req.params.categoryId,
        },
      })
      if (data) {
        res.status(200).send(data)
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
    deleteSingle: deleteSingle,
    getByCategory: getByCategory
  }
  
  export default product