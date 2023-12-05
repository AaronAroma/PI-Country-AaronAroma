const { getCountriesBD, getAllCountries, getCountryByIdBD } = require("../controllers/countryController");

const getCountries = async (req, res) => {
    const { name } = req.query;
    if (name) {
        try {
            const response = await getCountriesBD(name);
            return res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {

        try {
            const response = await getAllCountries();
            return res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}
const getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await getCountryByIdBD(id);
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// const getCountries = async (req, res) => {
//     try {
//         const response = await getCountriesBD();
//         return res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


// const getCountryByName = async (req, res) => {
//     const { name } = req.query;

//     try {
//         const response = await getCountriesBD(name);
//         return res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// };

module.exports = { getCountries,getCountryById/* getCountryByName*/ };