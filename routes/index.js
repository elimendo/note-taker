const router = require('express').Router()
const apiroute = require("./api")
const html = require('./htmls')

router.use("/api", apiroute)
router.use("/", html)


module.exports = router