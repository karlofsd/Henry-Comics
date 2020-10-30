const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("wishlist", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
