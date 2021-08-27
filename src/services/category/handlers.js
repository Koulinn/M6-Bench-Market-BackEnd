import db from "../../db/models/db_assoc.js"
import s from "sequelize"
const { Op } = s

const Category = db.Category
const Product = db.Product

const getAll = async (req, res, next) => {
    try {
        const data = await Category.findAll({
            include: Product,
        })

        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getSingle = async (req, res, next) => {
    try {
        const data = await Category.findByPk(req.params.id, {
            include: Product,
        })
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        console.log('post category ')
        const data = await Category.create(req.body)
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const data = await Category.update(req.body, {
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
        const rows = await Category.destroy({
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


const comment = {
    create: create,
    getAll: getAll,
    getSingle: getSingle,
    update: update,
    deleteSingle: deleteSingle
}

export default comment