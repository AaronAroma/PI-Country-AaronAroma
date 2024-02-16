const { Activity, Country } = require("../db");


const activitiesList = async () => {
    try {
        const allActivities = await Activity.findAll({
            include: [{
                model: Country,
                as: "Countries",
                attributes: ["name", "id"],
                through: {
                    attributes: []
                }
            }],
        })
        return allActivities;
    } catch (error) {
        throw new Error({ error: error.message })
    }
}


const postActivityDB = async (name, dificulty, duration, season, countries) => {
    try {
        const newActivity = await Activity.create({ name, dificulty, duration, season });

        if (countries && countries.length > 0) {
            const associatedCountries = await Country.findAll({
                where: {
                    name: countries,
                }
            });

            await newActivity.addCountries(associatedCountries);
        }

        return newActivity
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteActivityDB = async (name) => {
    await Activity.destroy({
        where: {
            name: name
        }
    });
    return `La actividad ${name} ha sido eliminada.`
}

module.exports = { activitiesList, postActivityDB, deleteActivityDB };