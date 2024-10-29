import sequelize from '../lib/sequelize.js';
import { DataTypes } from 'sequelize';
import PersonalDetails from './PersonalDetails.js';


const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentId: {
    type: DataTypes.STRING,
    unique: false,
  },
 
 degree: {
  type: DataTypes.STRING,
  allowNull: false,
 },

 year: {
  type: DataTypes.TEXT,
  allowNull: true,
 },
 paymentStatus: {
  type: DataTypes.ENUM('pending', 'paid'),
  defaultValue: 'pending',
 },


});






Student.belongsTo(PersonalDetails, {
  foreignKey: 'personalDetailsId',
});

export default Student;
