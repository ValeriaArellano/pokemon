const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('type', {
        slot: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    });
}