import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

const Customer = sequelize.define('Customers', {
    acNo: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, field: 'ac_no'},
    name: { type: DataTypes.STRING, allowNull: false, field: 'name'},
    balance: { type: DataTypes.FLOAT, allowNull: false, field: 'balance' },
}, {
    tableName: 'customers',
    timestamps: false
});

export { sequelize, Customer };
