const { activitiesList, postActivityDB, deleteActivityDB } = require("../controllers/activityController")

const getActivities = async (req, res) => {
    try {
        const response = await activitiesList()
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const postActivity = async (req, res) => {
    const { name, dificulty, duration, season, countries } = req.body
    try {
        const response = await postActivityDB(name, dificulty, duration, season, countries)
        return res.status(200).json(response)
    } catch (error) {
        console.error("Error creating activity:", error);
        return res.status(400).json({ error: error.message })
    }
}

const deleteActivity = async (req, res) => {
    const { name } = req.body
    try {
        const response = await deleteActivityDB(name)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


module.exports = { getActivities, postActivity, deleteActivity }