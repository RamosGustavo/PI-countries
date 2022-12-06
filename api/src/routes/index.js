const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getActivities,
  getCountries,
  getCountryId,
  postActivities,
  getSearchedCountry,
  getFilteredCountries,
  deleteActivities,
} = require("../controllers/Countries.controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", getCountries);
router.get("/countries/filter/:filter", getFilteredCountries);
router.get("/countries/:id", getCountryId);
router.get("/countriesSearch", getSearchedCountry);

router.post("/activities", postActivities);
router.get("/activities", getActivities);

router.delete("/activities/:id", deleteActivities);

module.exports = router;
