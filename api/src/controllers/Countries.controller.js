const axios = require("axios");
const { Country, Activity } = require("../db");

const { Op } = require("sequelize");

const getData = async () => {
    const dbInfo = await Country.findAll();
    if (dbInfo.length >= 250) {
        console.log("Returning info from the dataBase");
        return dbInfo;
    } else {
        const apiInfo = await axios
            .get("https://restcountries.com/v3/all")
            .then((response) =>
                response.data?.map((el) => {
                    return {
                        id: el.cca3,
                        name: el.name.common,
                        image: el.flags[1],
                        continents: el.continents[0],
                        capital: el.capital ? el.capital[0] : "Not found",
                        subregion: el.subregion ? el.subregion : "Not found",
                        area: el.area,
                        population: el.population,
                    };
                })
            );

        apiInfo.forEach((el) => {
            Country.findOrCreate({
                where: {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    continents: el.continents,
                    capital: el.capital,
                    subregion: el.subregion,
                    area: el.area,
                    population: el.population,
                },
            });
        });
        const dbInfo = await Country.findAll();

        return dbInfo;
    }
};

const getCountries = async (req, res) => {
    const allCountries = await getData();
    res.status(200).send(allCountries);
};

const getFilteredCountries = async (req, res) => {
    const { filter } = req.params;

    const filters = filter.split("-");
    const continent = filters[0];
    const activity = filters[1];

    if (continent && activity) {
        let continentActivities = await Country.findAll({
            where: { continents: continent },
            include: { model: Activity, where: { name: activity } },
        });

        continentActivities.length
            ? res.status(200).send(continentActivities)
            : res.status(404).send({ message: "404 not found" });
    } else if (continent && continent.length) {
        const selectedContinent = await Country.findAll({
            where: { continents: continent },
        });

        selectedContinent
            ? res.status(200).send(selectedContinent)
            : res.status(404).send(error);
    } else if (activity && activity.length) {
        let selectedActivity = await Country.findAll({
            include: { model: Activity, where: { name: activity } },
        });

        selectedActivity
            ? res.status(200).send(selectedActivity)
            : res.status(404).send(error);
    } else {
        const allCountries = await getData();

        allCountries
            ? res.status(200).send(allCountries)
            : res.status(404).send(error);
    }
};

const getSearchedCountry = async (req, res) => {
    try {
        const name = req.query.name;

        /* let countryFound2 = await Country.findAll({
        where: { population: { [Op.gt]: name } },
        });
        console.log(countryFound2, "xddd"); */

        console.log(name);
        if (!name) {
            res.status(404).send({ message: error.message });
        } else {
            let countryFound = await axios
                .get(`https://restcountries.com/v3/name/${name}`)
                .then((response) =>
                    response.data.map((el) => {
                        return {
                            id: el.cca3,
                            name: el.name.common,
                            image: el.flags[1],
                            continents: el.continents[0],
                        };
                    })
                );

            countryFound && res.status(200).send(countryFound);
        }
    } catch (error) {
        res.status(404).send({ message: "Country not found" });
    }
};

const getCountryId = async (req, res) => {
    try {
        const { id } = req.params;

        // FORMA 1 con EndPoint
        /* const dataCountry = await axios
            .get(`https://restcountries.com/v3/alpha/${id}`)
            .then((response) =>
            response.data.map((el) => {
                return {
                id: el.cca3,
                name: el.name.common,
                image: el.flags[0],
                continents: el.continents[0],
                capital: el.capital ? el.capital[0] : "Not found",
                subregion: el.subregion ? el.subregion : "Not found",
                area: el.area,
                population: el.population,
                };
            })
            );
    
        const countryActivities = await Activity.findAll({
            include: {
            model: Country,
            where: { id: dataCountry[0].id },
            attributes: ["name"],
            through: {
                attributes: [],
            },
            },
        });
    
        const allCountryData = dataCountry.concat(countryActivities);
       */
        // Forma 2, sin codear a las tres de la mañana
        let buscado = await Country.findOne({
            where: { id: id },
            include: Activity,
        });

        res.status(200).send(buscado);
    } catch (error) {
        res.status(404).send("Country not found");
    }
};

const postActivities = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;

        if (name && countries.length && difficulty && duration && season) {
            console.log("entra copado");
            let aux = name.toLowerCase();
            let buscado = await Activity.findOne({
                where: {
                    name: name.toLowerCase(),
                    /* difficulty: difficulty,
                    duration: duration,
                    season: season, */
                },
            });

            if (!buscado) {
                let newActivity = await Activity.create({
                    name: name.toLowerCase(),
                    difficulty,
                    duration,
                    season,
                });

                const dbCountries = await Country.findAll({
                    where: {
                        id: countries,
                    },
                });

                //console.log(dbCountries);
                await newActivity.addCountry(dbCountries);
                //await dbCountries.addActivity(newActivity); no anda

                res.status(201).send(newActivity);
            } else {
                console.log("actividad ya existe");
                res.status(400).send({ message: "Activity already exist" });
            }
        } else {
            console.log("nao nao amigao");
            res.status(400).send({ message: "Error 400 bad request" });
        }
    } catch (error) {
        console.log("el catch");
        res.status(404).json(error);
    }
};

const getActivities = async (req, res) => {
    const dbActivities = await Activity.findAll({ include: Country });
    res.status(200).send(dbActivities);
};

const deleteActivities = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);
        Activity.destroy({ where: { id } });

        /* let aux = await Activity.destroy({
        where: { id },
        include: { model: Country, where: { id: 'ARG' } },
        }); */

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getCountries,
    getCountryId,
    postActivities,
    getActivities,
    getSearchedCountry,
    getFilteredCountries,
    deleteActivities,
};
