const express = require('express')
const { validationResult } = require('express-validator');

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
        state: event.Group.state,
        private: event.Group.private
      }
    }

    let theVenue = null;

    if (event.Venue) {
      theVenue = {
        id: event.Venue.id,
        city: event.Venue.city,
        state: event.Venue.state,
        address: event.Venue.address,
        lat: event.Venue.lat,
        long: event.Venue.long,

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
      EventImages: event.EventImages.map(image => image.url),
      description: event.description,
      price: event.price,
      capacity: event.capacity,
      Group: theGroup,
      Venue: theVenue
    })
  }
});

router.delete('/:eventId', async (req, res) => {
  const theEvent = await Event.findByPk(req.params.eventId)

  if (!theEvent) {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  } else {
    await theEvent.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

const validateEventInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({
      min: 5,
    })
    .withMessage("Name must be 60 characters or less"),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', 'In person'])
    .withMessage("Type must be 'Online' or 'In person'"),
  check('capacity')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Capacity must be an integer"),
  check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Price is invalid"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('startDate')
    .exists({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a date"),
  check('endDate')
    .exists({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("End date must be a date"),
];

router.put('/:eventId', requireAuth, validateEventInput, async (req, res) => {
  const theEvent = await Event.findByPk(req.params.eventId);

  if (!theEvent) {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }

  const theVenue = await Venue.findByPk(req.body.venueId);

  if (!theVenue) {
    res.status(404);
    res.json({
      "message": "Venue couldn't be found",
      "statusCode": 404
    })

    return
  }

  const validationErrors = validationResult(req);
  const errors = {};
  let hasErrors = false;

  if (!validationErrors.isEmpty()) {
    validationErrors
      .array()
      .forEach((error) => {
        errors[error.param] = error.msg
      });

    hasErrors = true;
  }

  if (req.body.startDate <= new Date()) {
    errors.startDate = "Start date must be in the future"

    hasErrors = true;
  }

  if (req.body.endDate <= req.body.startDate) {
    errors.endDate = "End date is less than start date"

    hasErrors = true;
  }

  if (hasErrors) {
    res.status(400);
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      errors
    })

    return;
  }


  await theEvent.set(req.body);

  res.status(200)
  res.json({
    "id": theEvent.id,
    "groupId": theEvent.groupId,
    "venueId": theEvent.venueId,
    "name": theEvent.name,
    "type": theEvent.type,
    "capacity": theEvent.capacity,
    "price": theEvent.price,
    "description": theEvent.description,
    "startDate": theEvent.startDate,
    "endDate": theEvent.endDate,
  });

})

module.exports = router;
