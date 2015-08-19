// Definicion del modelo de Comment con validacion

module.exports = function(sequelize, DataTypes){
    return sequelize.define('Comment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            texto: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: '-> Falta Comentario'}}
            },
            publicado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
};