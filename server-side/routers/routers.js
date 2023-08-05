// const authorization = require('../middlewares/authorization')
const express = require('express')
const router = express.Router()
// const router = require('express').Router()
const Controller = require("../controllers/controllers");
const aunthentication = require('../middlewares/authentication');


router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/githubLogin',Controller.githubLogin)
router.get('/travels', aunthentication, Controller.readTravel)
router.get('/favorites', aunthentication, Controller.readFavorite)
router.patch('/subscribe', aunthentication, Controller.subscribe)
router.post('/travels/:id', aunthentication, Controller.addFavorites)
router.delete('/travels/:id', aunthentication, Controller.deleteFavorite)
router.get('/midtrans', aunthentication,Controller.midtrans)

module.exports = router