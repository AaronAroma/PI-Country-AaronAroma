const axios = require("axios");
const { Country } = require("../db");

const initalUpload = async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/countries");

        let createdCountries = 0

        for (const country of data) {
            const { cca3, name, flags, continents, capital, subregion, area, population } = country;

            const [countryInstance, created] = await Country.findOrCreate({
                where: { id: cca3 },
                defaults: {
                    name: name.common,
                    flag: flags.png,
                    continent: continents[0],
                    capital: capital ? capital[0] : "Unknown",
                    subregion: subregion ? subregion : "Unknown",
                    area: area,
                    population: population,
                },
            });

            if (created) {
                createdCountries++
            }
        }

        if (createdCountries === 0) {
            console.log("Initial charge successfully: All countries already exist in the database.");
        } else {
            console.log("Initial charge successfully:", `${createdCountries} countries has been created in the database`);
        }
    } catch (error) {
        console.log(JSON.stringify({ error: "Database preload couldn't be processed: " + error.message }));
    }
};

module.exports = initalUpload;