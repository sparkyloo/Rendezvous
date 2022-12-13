const express = require("express");
const { validationResult } = require("express-validator");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  Membership,
  Group,
  GroupImage,
  Event,
  EventImage,
  Venue,
  Attendance,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res) => {
  const allGroups = await Group.findAll({
    include: [Membership, GroupImage],
  });

  const formattedGroups = allGroups.map((group) => {
    let previewImage = null;

    for (const image of group.GroupImages) {
      if (image.preview) {
        previewImage = image.url;
        break;
      }
    }

    return {
      id: group.id,
      organizerId: group.organizerId,
      name: group.name,
      about: group.about,
      type: group.type,
      private: group.private,
      city: group.city,
      state: group.state,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      numMembers: group.Memberships.length,
      previewImage,
    };
  });

  res.status(200);
  res.json({
    Groups: formattedGroups,
  });
});

router.get("/current", requireAuth, async (req, res) => {
  const myMemberships = await Membership.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: Group,
      include: Membership,
    },
  });

  res.status(200);
  res.json({
    Groups: myMemberships.map((membership) => {
      let group = membership.Group;
      let previewImage = null;

      // for (const image of group.GroupImages) {
      //   if (image.preview) {
      //     previewImage = image.url;
      //     break;
      //   }
      // }

      return {
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        private: group.private,
        city: group.city,
        state: group.state,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        numMembers: group.Memberships.length,
        previewImage,
      };
    }),
  });
});

router.get("/:groupId", async (req, res) => {
  const group = await Group.findByPk(req.params.groupId, {
    include: [Membership, GroupImage, User],
  });

  if (!group) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    // let previewImage = null;

    // for (const image of group.GroupImages) {
    //   if (image.preview) {
    //     previewImage = image.url;
    //     break;
    //   }
    // }

    res.status(200);
    res.json({
      id: group.id,
      organizerId: group.organizerId,
      name: group.name,
      about: group.about,
      type: group.type,
      private: group.private,
      city: group.city,
      state: group.state,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      numMembers: group.Memberships.length,
      // previewImage,
      GroupImages: group.GroupImages.map((image) => image.url),
      Organizer: {
        id: group.User.id,
        firstName: group.User.firstName,
        lastName: group.User.lastName,
      },
    });
  }
});

const validateGroupInput = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({
      min: 3,
      max: 60,
    })
    .withMessage("Name must be between 3 and 60 characters"),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({
      min: 50,
    })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private")
    // .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage("Private must be a boolean"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

router.post("/", requireAuth, validateGroupInput, async (req, res) => {
  const newGroup = await Group.create({
    ...req.body,
    organizerId: req.user.id,
  });

  await Membership.create({
    userId: req.user.id,
    groupId: newGroup.id,
    status: "member",
  });

  res.status(201);
  res.json(newGroup.toJSON());
});

router.post("/:groupId/images", requireAuth, async (req, res) => {
  const groupExists = await Group.findByPk(req.query.groupId);

  if (!groupExists) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    const newImage = await GroupImage.create(
      {
        url: req.body.url,
        preview: req.body.preview,
        groupId: req.query.groupId,
      },
      {
        include: [Group],
      }
    );

    res.status(200);
    res.json(newImage.toJSON());
  }
});

router.put("/:groupId", requireAuth, validateGroupInput, async (req, res) => {
  const theGroup = await Group.findByPk(req.params.groupId);

  if (!theGroup) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else if (theGroup.organizerId !== req.user.id) {
    res.status(403);
    res.json({
      message: "You do not own this group",
      statusCode: 403,
    });
  } else {
    await theGroup.set(req.body);

    res.status(200);
    res.json(theGroup.toJSON());
  }
});

router.delete("/:groupId", async (req, res) => {
  const theGroup = await Group.findByPk(req.params.groupId);

  if (!theGroup) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else if (theGroup.organizerId !== req.user.id) {
    res.status(403);
    res.json({
      message: "You do not own this group",
      statusCode: 403,
    });
  } else {
    await theGroup.destroy();

    res.status(200);
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

router.get("/:groupId/events", async (req, res) => {
  const theGroup = await Group.findByPk(req.params.groupId);
  if (!theGroup) {
    res.status(404);
    res.json({
      message: "Group couldn't be found",
      statusCode: 404,
    });

    return;
  }

  const allEvents = await Event.findAll({
    where: {
      groupId: req.params.groupId,
    },
    include: [Venue, EventImage, Attendance],
  });

  const formattedEvents = allEvents.map((event) => {
    let previewImage = null;

    for (const image of event.EventImages) {
      if (image.preview) {
        previewImage = image.url;
        break;
      }
    }

    let theVenue = null;

    if (event.Venue) {
      theVenue = {
        id: event.Venue.id,
        city: event.Venue.city,
        state: event.Venue.state,
      };
    }

    return {
      id: event.id,
      groupId: event.groupId,
      venueId: event.venueId,
      name: event.name,
      type: event.type,
      startDate: event.startDate,
      // endDate: event.endDate,
      numAttending: event.Attendances.length,
      previewImage,
      Group: {
        id: theGroup.id,
        name: theGroup.name,
        city: theGroup.city,
        state: theGroup.state,
      },
      Venue: theVenue,
    };
  });

  res.status(200);
  res.json({
    Events: formattedEvents,
  });
});

const validateEventInput = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({
      min: 5,
    })
    .withMessage("Name must be at least 5 characters"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("capacity")
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage("Capacity must be an integer"),
  check("price")
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("End date must be a date"),
];

router.post(
  "/:groupId/events",
  requireAuth,
  validateEventInput,
  async (req, res) => {
    const theGroup = await Group.findByPk(req.params.groupId);

    if (!theGroup) {
      res.status(404);
      res.json({
        message: "Group couldn't be found",
        statusCode: 404,
      });

      return;
    }

    const theVenue = await Venue.findByPk(req.body.venueId);

    if (!theVenue) {
      res.status(404);
      res.json({
        message: "Venue couldn't be found",
        statusCode: 404,
      });

      return;
    }

    const validationErrors = validationResult(req);
    const errors = {};
    let hasErrors = false;

    if (!validationErrors.isEmpty()) {
      validationErrors.array().forEach((error) => {
        errors[error.param] = error.msg;
      });

      hasErrors = true;
    }

    if (req.body.startDate <= new Date()) {
      errors.startDate = "Start date must be in the future";

      hasErrors = true;
    }

    if (req.body.endDate <= req.body.startDate) {
      errors.endDate = "End date is less than start date";

      hasErrors = true;
    }

    if (hasErrors) {
      res.status(400);
      res.json({
        message: "Validation error",
        statusCode: 400,
        errors,
      });

      return;
    }

    const groupId = parseInt(req.params.groupId);

    const newEvent = await Event.create({
      ...req.body,
      groupId,
    });

    res.status(200);
    res.json({
      groupId,
      id: newEvent.id,
      venueId: newEvent.venueId,
      name: newEvent.name,
      type: newEvent.type,
      capacity: newEvent.capacity,
      price: newEvent.price,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
    });
  }
);

module.exports = router;
