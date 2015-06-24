// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pregunta : DataTypes.STRING,
            respuesta : DataTypes.STRING
        }
    );
};