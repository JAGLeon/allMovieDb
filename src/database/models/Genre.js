// const { TINYINT, INTEGER } = require("sequelize/types");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Field name can not be null'
                },
                notEmpty: {
                    args: true,
                    msg: "Write the name of the genre"
                }
            }
        },
        ranking: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
            unique: {
                args: true,
                msg: "Choise other number"
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'Ranking can not be null'
                }
            }
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models) {
        Genre.hasMany(models.Movie, { 
            as: "movies", 
            foreignKey: "genre_id"
        })
    }

    return Genre
};