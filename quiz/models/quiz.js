// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tema : {
                type: DataTypes.STRING
            },
            pregunta : {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: '-> Falta Pregunta'}}
            },
            respuesta : {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: '-> Falta Respuesta'}}
            }
        }
    );
};