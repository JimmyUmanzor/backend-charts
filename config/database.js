const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('empleados','root','sscu2017',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;