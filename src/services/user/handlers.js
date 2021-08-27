import db from "../../db/models/db_assoc.js"
import s from "sequelize"

const { Op } = s

const User = db.User
const Comments = db.Comments



const getAll = async (req, res, next) => {
    try {
        const data = await User.findAll({
            include: Comments,
        })

        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const getSingle = async (req, res, next) => {
    try {
        const data = await User.findByPk(req.params.id, {
            include: Comments,
        })
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        console.log('post User ')
        const data = await User.create(req.body)
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const data = await User.update(req.body, {
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
        const rows = await User.destroy({
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

const uploadAvatar = async (req, res, next) => {
    try {
        const data = await User.update({avatar: req.file.path}, {
            where: { id: req.params.id },
            returning: true,
        })
        res.send(data[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }

}


const user = {
    create: create,
    getAll: getAll,
    getSingle: getSingle,
    update: update,
    uploadAvatar: uploadAvatar,
    deleteSingle: deleteSingle
}

export default user