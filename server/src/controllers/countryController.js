const { Country, Activity } = require("../db");
const { Op } = require('sequelize');

const getCountriesBD = async (name) => {
    try {
        const countryName = await Country.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
            },
            include: Activity,
        });
        return countryName;
    } catch (error) {
        throw new Error({ error: error.message })
    }
};

const getCountryByIdBD = async (id) => {
    const countryId = await Country.findByPk(id, {
        include: [
            {
                model: Activity,
                attributes: ['id', 'name', 'dificulty', 'duration', 'season'],
            },
        ]
    });

    if (countryId) {
        return countryId
    } else return { error: "No se encontro ningun pais" }
}

const getAllCountries = async () => {
    try {
        const allCountries = await Country.findAll();
        return allCountries;
    } catch (error) {
        throw new Error({ error: error.message })
    }
}

module.exports = { getCountriesBD, getCountryByIdBD, getAllCountries /*getCountryByNameBD*/ };


// const getCountryByNameBD = async (name) => {
//     const countryName = await Country.findAll({
//         where: {
//             name: { [Op.iLike]: `%${name}%` },
//         },

//         include: Activity,
//     });

//     if (countryName.length >= 1) {
//         return countryName
//     } else return "No se encontro ningun pais"
// }
