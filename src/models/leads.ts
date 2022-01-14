export default (sequelize, DataTypes) => {
    return sequelize.define('leads',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(30)
            },
            first_name: {
                type: DataTypes.STRING(30)
            },
            last_name: {
                type: DataTypes.STRING(30)
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['phone', 'email']
                }
            ]
        });
};
