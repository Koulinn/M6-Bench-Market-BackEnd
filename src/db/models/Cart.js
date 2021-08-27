import sequelize from "../conn.js"
import s from "sequelize"
const { DataTypes } = s


const Cart = sequelize.define("cart",
    {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        } 
    },
)


export default Cart