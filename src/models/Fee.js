import sequelize from '../lib/sequelize.js';
import { DataTypes } from 'sequelize';

const Fee = sequelize.define('Fee', {
  type: {
    type: DataTypes.STRING,   // Type of fee (e.g., 'registration', 'tuition', 'sports', etc.)
    allowNull: false,
  },
  subtype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  
  amount: {
    type: DataTypes.FLOAT,    // Fee amount
    allowNull: false,
  },
  degree: {
    type: DataTypes.TEXT,     // Description of the fee (optional)
    allowNull: false,
  },
});

export default Fee;
