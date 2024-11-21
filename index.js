const express = require('express')
const sequelize= require('./config/database')
const Empleado = require('./modelos/Empleado')
const Producto = require('./modelos/Producto')

const app= express();
app.use(express.json())
var port = 5000;

//SELECT SUM(SALARY),DEPARTMENT_ID FROM EMPLEADO group by DEPARTMENT_ID;

app.get('/suma-salario-departamento', async(req,resp) =>{

    try {
        
        const result = await Empleado.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('SUM', sequelize.col('SALARY')), 'Salario Total']
            ],
            group: ["DEPARTMENT_ID"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


//select MAX(SALARY),DEPARTMENT_ID from empleado where DEPARTMENT_ID=50 group by DEPARTMENT_ID;

app.get('/maximo-salario-departamento/:idDeparment', async(req,resp) =>{

    const {idDeparment} = req.params;


    try {
        
        const result = await Empleado.findAll({
            attributes:[
                'DEPARTMENT_ID',
                [sequelize.fn('MAX', sequelize.col('SALARY')), 'Salario Total']
            ],
            where: {DEPARTMENT_ID:idDeparment },
            group: ["DEPARTMENT_ID"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


// Consulta 1 JU: Obtener el valor promedio de los productos:
app.get('/promedio-valor-productos', async (req, resp) => {
    try {

        const result = await Producto.findAll({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('value')), 'Valor Promedio']
            ]
        });
        resp.json(result);

    } catch (error) {
        resp.status(500).json({ error: 'Error al obtener el promedio de valores: ' + error });
    }
});

// Consulta 2 JU: Contar el número de productos por tipo de moneda
app.get('/contar-productos-moneda', async (req, resp) => {
    try {


        const result = await Producto.findAll({
            attributes: [
                'valueCurrency',
                [sequelize.fn('COUNT', sequelize.col('valueCurrency')), 'Cantidad']
            ],
            group: ['valueCurrency'],
            order: [['valueCurrency', 'ASC']]
        });
        resp.json(result);


    } catch (error) {
        resp.status(500).json({ error: 'Error al contar productos por moneda: ' + error });
    }
});

// Consulta 3 JU: Encontrar el valor máximo y mínimo por tipo de producto
app.get('/max-min-valor-producto-tipo', async (req, resp) => {
    try {


        const result = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MAX', sequelize.col('value')), 'Valor Máximo'],
                [sequelize.fn('MIN', sequelize.col('value')), 'Valor Mínimo']
            ],
            group: ['productType'],
            order: [['productType', 'ASC']]
        });
        resp.json(result);

    } catch (error) {
        resp.status(500).json({ error: 'Error al obtener máximos y mínimos por tipo: ' + error });
    }
});


app.listen(port, ()=>{
    console.log('aplicacion ejecutando en puerto:' , port)
})

