const { Router } = require("express");
const { getCountries, getCountryById } = require("../handlers/countryHandlers");
const { getActivities, postActivity, deleteActivity } = require("../handlers/activitiesHandlers")

const router = Router();

// router.get("/countries/search", getCountries);
router.get("/countries/:id", getCountryById);
router.get("/countries", getCountries);
router.post("/activities", postActivity);
router.delete("/activities", deleteActivity);
router.get("/activities", getActivities);

module.exports = router;