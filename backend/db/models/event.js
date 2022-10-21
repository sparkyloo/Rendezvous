'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.Attendance = Event.hasMany(models.Attendance, {
        foreignKey: 'eventId'
      })

      Event.EventImage = Event.hasMany(models.EventImage, {
        foreignKey: 'eventId'
      })

      Event.Venue = Event.belongsTo(models.Venue, {
        foreignKey: 'venueId'
      })

      Event.Group = Event.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.NUMBER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
