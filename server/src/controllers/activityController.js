const { Activity, Country } = require("../db");


const activitiesList = async () => {
    try {
        const allActivities = Activity.findAll()
        return allActivities;
    } catch (error) {
        throw new Error({ error: error.message })
    }
}


const postActivityDB = async (name, dificulty, duration, season, countries) => {
    try {
        const newActivity = await Activity.create({
            name,
            season,
            dificulty,
            duration,
        });
        if (countries && countries.length > 0) {
            await Activity.setCountries(countries);
        }
        return newActivity
    } catch (error) {
        throw new Error({ error: error.message })
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