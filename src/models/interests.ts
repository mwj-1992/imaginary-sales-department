export default function (sequelize, DataTypes) {
    return sequelize.define('interests', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        lead_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING(30)
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE
        }
    });
};
