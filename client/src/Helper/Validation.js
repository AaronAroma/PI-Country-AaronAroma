const validate = (input) => {
    let errors = {};
    let durationRegEx = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    let seasons = ["Summer", "Autumn", "Spring", "Winter"]

    if (input.name.length < 3 || input.name.length > 25) {
        errors.name = "The activity name must be between 3 and 25 characters."
    }

    if (input.dificulty < 1 || input.dificulty > 5) {
        errors.dificulty = "The difficulty must be from 1 to 5."
    }

    if (!durationRegEx.test(input.duration)) {
        errors.duration = "The duration must be in time format."
    }

    if (input.duration === "00:00") {
        errors.duration = "The duration can't be 0."
    }

    if (!seasons.includes(input.season)) {
        errors.season = "The season must be: Summer, Autumn, Spring or Winter."
    }


    return errors;
};

export default validate