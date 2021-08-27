import db from "../../db/models/db_assoc.js"
import s from "sequelize"

const Category = db.Category
const Product = db.Product
const User = db.User
const Cart = db.Cart

const { Op } = s

const getAll = async (req, res, next) => {
  try {
    const data = await Cart.findAll()

    res.send(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
const cartTotal = async (req, res, next) => {
  try {
    const { userId } = req.params

    const data = await Cart.findAll({ where: { userId } })

    const groupAndIncludeProduct = await Cart.findAll({
      attributes: [
        "productId",
        [s.fn("COUNT", "id"), "unitary_qty"],
        [s.fn("SUM", s.col("product.price")), "total_price"],
      ],
      where: {
        userId
      },
      include: { model: Product, attributes: ["name", "price"] },
      group: ["productId", "product.id"],
    });

    const countAll = await Cart.count({
      where: { userId: req.params.userId },
    });

    const sumAll = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
      where: { userId: req.params.userId },
    });

    res.send({
      prodByGroups: groupAndIncludeProduct,
      countAllItems: countAll,
      sumTotal: sumAll
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const { userId, productId } = req.params
    const data = await Cart.create({ userId, productId })
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
    const { userId, productId } = req.params
    const rows = await Cart.destroy({
      where: {
        userId,
        productId
      },
    })
    if (rows > 0) {
      res.status(204).send()
    } else {
      res.status(404).send("not found")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}


const cart = {
  addProduct: addProduct,
  getAll: getAll,
  cartTotal: cartTotal,
  update: update,
  deleteSingle: deleteSingle
}

export default cart