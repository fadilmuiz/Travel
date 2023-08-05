'use strict';

/** @type {import('sequelize-cli').Migration} */
const data = require('../data/travel.json')
data.forEach(el =>{
  el.createdAt = new Date()
  el.updatedAt = new Date()
})
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Travels', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Travels', null, {});
  }
};
