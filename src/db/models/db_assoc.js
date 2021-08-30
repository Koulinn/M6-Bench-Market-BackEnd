import sequelize from "../conn.js"
import Product from "./Product.js"
import Category from "./Category.js"
import User from "./User.js"
import Comments from "./Comments.js"
import Cart from "./Cart.js"

// Delete on cascade
Product.belongsTo(Category, { foreignKey: {allowNull: false}, onDelete: "cascade"})
Category.hasMany(Product, { foreignKey: {allowNull: false}})


Product.belongsToMany(User, {through: {model:Comments, unique: false}})
// User.belongsToMany(Product, {through: {model:Comments, unique: false}})


Comments.belongsTo(User, { foreignKey: {allowNull: false}, onDelete: "cascade"})
User.hasMany(Comments, { foreignKey: {allowNull: false}})


Comments.belongsTo(Product, { foreignKey: {allowNull: false},  onDelete: "cascade"})
Product.hasMany(Comments, { foreignKey: {allowNull: false}})

Product.belongsToMany(User, {through: {model:Cart, unique: false}} )
User.belongsToMany(Product, {through: {model:Cart, unique: false}} )

Product.hasMany(Cart, { foreignKey: {allowNull: false}})
Cart.belongsTo(Product, { foreignKey: {allowNull: false}})

User.hasMany(Cart, { foreignKey: {allowNull: false}})
Cart.belongsTo(User, { foreignKey: {allowNull: false}})

export default { sequelize, Product, Category, User, Comments, Cart }
