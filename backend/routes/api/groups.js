const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');
const router = express.Router();

router.get('/', async (req, res) => {
  const allGroups = await Group.findAll()
  res.status(200)
  res.json(allGroups)
})

router.get('/current', requireAuth, async (req, res) => {
  const myGroups = await Group.findAll({
    where: {
      organizerId: req.user.id
    }
  })

  res.status(200)
  res.json(myGroups)
})

router.get('/:groupId', async (req, res) => {
  const theGroup = await Group.findByPk(req.query.groupId)
  if (!theGroup) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else {
    res.status(200)
    res.json(theGroup)
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
      min: 3,
      max: 50
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
  const newGroup = await Group.create(req.body)
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
  const theGroup = await Group.findByPk(req.query.groupId)

  if (!theGroup) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
  } else {
    theGroup.set(req.body);

    res.status(200)
    res.json(theGroup.toJSON());
  }
})

router.delete('/:groupId', async (req, res) => {
  const theGroup = await Group.findByPk(req.query.groupId)

  if (!theGroup) {
    res.status(404)
    res.json({
      "message": "Group couldn't be found",
      "statusCode": 404
    })
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
