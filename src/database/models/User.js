module.exports = (sequelize, dataTypes) =>{
    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        email : {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        password : {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        remember_token : {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
    }

    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);

    return User;
} 