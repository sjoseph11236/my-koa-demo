const Sequelize = require('sequelize');
const db =  require('../db');

const User = db.define('user', { 
  name: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
  email: { 
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true,
    validate: { 
      notEmpty: true,
      isEmail: true
    }
  }
});



module.exports = User; 