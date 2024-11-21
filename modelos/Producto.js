const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Producto = sequelize.define('productos', {
    partNumber: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    productType: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    brand: {
        type: DataTypes.STRING,
    },
    family: {
        type: DataTypes.STRING,
    },
    line: {
        type: DataTypes.STRING,
    },
    productSegment: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    },
    valueCurrency: {
        type: DataTypes.STRING,
    },
    defaultQuantityUnits: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    
    description: {
        type: DataTypes.STRING,
    },
    plannerCode: {
        type: DataTypes.STRING,
    },
    sourceLink: {
        type: DataTypes.STRING,
    }
    
},
    {
        tableName: 'productos',
        timestamps: false
    }
)

module.exports= Producto;