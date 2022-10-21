const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Membership, Group, EventImage, Event, Venue, Attendance } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async (req, res) => {
  const allEvents = await Event.findAll({
    include: [EventImage, Venue, Group, Attendance]
  });

  const formattedEvents = allEvents.map(event => {
    let previewImage = null;

    for (const image of event.EventImages) {
      if (image.preview) {
        previewImage = image.url;
        break;
      }
    }

    let theGroup = null;

    if (event.Group) {
      theGroup = {
        id: event.Group.id,
        name: event.Group.name,
        city: event.Group.city,
        state: event.Group.state
      }
    }

    let theVenue = null;

    if (event.Venue) {
      theVenue = {
        id: event.Venue.id,
        city: event.Venue.city,
        state: event.Venue.state
      }
    }

    return {
      "id": event.id,
      "groupId": event.groupId,
      "venueId": event.venueId,
      "name": event.name,
      "type": event.type,
      "startDate": event.startDate,
      // "endDate": event.endDate,
      numAttending: event.Attendances.length,
      previewImage,
      Group: theGroup,
      Venue: theVenue
    }
  })

  res.status(200)
  res.json({
    Events: formattedEvents
  })
});

router.get('/:eventId', async (req, res) => {
  const event = await Event.findByPk(req.params.eventId, {
    include: [EventImage, Venue, Group, Attendance]
  });

  if (!event) {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  } else {
    let previewImage = null;

    for (const image of event.EventImages) {
      if (image.preview) {
        previewImage = image.url;
        break;
      }
    }

    let theGroup = null;

    if (event.Group) {
      theGroup = {
        id: event.Group.id,
        name: event.Group.name,
        city: event.Group.city,
        state: event.Group.state
      }
    }

    let theVenue = null;

    if (event.Venue) {
      theVenue = {
        id: event.Venue.id,
        city: event.Venue.city,
        state: event.Venue.state
      }
    }

    res.status(200)
    res.json({
      "id": event.id,
      "groupId": event.groupId,
      "venueId": event.venueId,
      "name": event.name,
      "type": event.type,
      "startDate": event.startDate,
      "endDate": event.endDate,
      numAttending: event.Attendances.length,
      previewImage,
      Group: theGroup,
      Venue: theVenue
    })
  }


});


module.exports = router;
