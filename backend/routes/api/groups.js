const express = require('express')
const sequelize = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Membership, Group, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');
const router = express.Router();

router.get('/', async (req, res) => {
  const allGroups = await Group.findAll({
    include: [Membership, GroupImage]
  });

  const formattedGroups = allGroups.map(group => {
    let previewImage = null;

    for (const image of group.GroupImages) {
      if (image.preview) {
        previewImage = image.url;
        break;
      }
    }

    return {
      "id": group.id,
      "organizerId": group.organizerId,
      "name": group.name,
      "about": group.about,
      "type": group.type,
      "private": group.private,
      "city": group.city,
      "state": group.state,
      "createdAt": group.createdAt,
      "updatedAt": group.updatedAt,
      numMembers: group.Memberships.length,
      previewImage
    }
  })

  res.status(200)
  res.json({
    Groups: formattedGroups
  })
})

router.get('/current', requireAuth, async (req, res) => {
  const myMemberships = await Membership.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Group,
      include: [Membership, GroupImage]
    }
  });

  res.status(200)
  res.json({
    Groups: myMemberships.map(membership => {
      let group = membership.Group;
      let previewImage = null;

      for (const image of group.GroupImages) {
        if (image.preview) {
          previewImage = image.url;
          break;
        }
      }

      return {
        "id": group.id,
        "organizerId": group.organizerId,
        "name": group.name,
        "about": group.about,
        "type": group.type,
        "private": group.private,
        "city": group.city,
        "state": group.state,
        "createdAt": group.createdAt,
        "updatedAt": group.updatedAt,
        numMembers: group.Memberships.length,
        previewImage
      }
    })
  })
})

router.get('/:groupId', async (req, res) => {
  const group = await Group.findByPk(req.params.groupId, {
    include: [
      Membership,
      GroupImage,
      User
    ]
  });

  let previewImage = null;

  for (const image of group.GroupImages) {
    if (image.preview) {
      previewImage = image.url;
      break;
    }
  }



  if (!group) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else {
    res.status(200)
    res.json({
      "id": group.id,
      "organizerId": group.organizerId,
      "name": group.name,
      "about": group.about,
      "type": group.type,
      "private": group.private,
      "city": group.city,
      "state": group.state,
      "createdAt": group.createdAt,
      "updatedAt": group.updatedAt,
      numMembers: group.Memberships.length,
      previewImage,
      GroupImages: group.GroupImages.map(image => image.url),
      Organizer: {
        id: group.User.id,
        firstName: group.User.firstName,
        lastName: group.User.lastName
      }
    })
  }
})

const validateGroupInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({
      min: 3,
      max: 60
    })
    .withMessage("Name must be 60 characters or less"),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({
      min: 50
    })
    .withMessage("About must be 50 characters or more"),
  check('type')
    .exists({ checkFalsy: true })
    .isIn(['Online', 'In person'])
    .withMessage("Type must be 'Online' or 'In person'"),
  check('private')
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage("Private must be a boolean"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  handleValidationErrors
];

router.post('/', requireAuth, validateGroupInput, async (req, res) => {
  const newGroup = await Group.create({
    ...req.body,
    organizerId: req.user.id
  });

  await Membership.create({
    userId: req.user.id,
    groupId: newGroup.id,
    status: "member"
  });

  res.status(201)
  res.json(newGroup.toJSON())
})

router.post('/:groupId/images', requireAuth, async (req, res) => {
  const groupExists = await Group.findByPk(req.query.groupId);

  if (!groupExists) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else {
    const newImage = await GroupImage.create({
      url: req.body.url,
      preview: req.body.preview,
      groupId: req.query.groupId
    }, {
      include: [
        Group
      ]
    })

    res.status(200)
    res.json(newImage.toJSON())
  }
})

router.put('/:groupId', requireAuth, validateGroupInput, async (req, res) => {
  const theGroup = await Group.findByPk(req.params.groupId);

  if (!theGroup) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else if (theGroup.organizerId !== req.user.id) {
    res.status(403)
    res.json({
      "message": "You do not own this group",
      "statusCode": 403
    });
  } else {
    await theGroup.set(req.body);

    res.status(200)
    res.json(theGroup.toJSON());
  }
})

router.delete('/:groupId', async (req, res) => {
  const theGroup = await Group.findByPk(req.params.groupId)

  if (!theGroup) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else if (theGroup.organizerId !== req.user.id) {
    res.status(403)
    res.json({
      "message": "You do not own this group",
      "statusCode": 403
    });
  } else {

    await theGroup.destroy()

    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})


module.exports = router;
