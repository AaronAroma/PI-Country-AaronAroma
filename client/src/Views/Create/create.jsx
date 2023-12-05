import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCountries, addActivity } from "../../redux/Actions/action";

import validate from "../../Helper/Validation.js";
import tourist_activities from "../../Helper/TouristActivities.js";

import style from "./Create.module.css";

const Create = () => {
  // Constantes.
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countriesCopy);
  const sortedCountries = [...allCountries];

  // Orden alfabético para las opciones en el formulario.
  sortedCountries.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA === "åland islands") return -1;
    if (nameB === "åland islands") return 1;

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // Obtener la lista de países completa.
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  // Estados locales
  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countries: "",
  });

  // Handler para el seteo de mi estado.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError(validate({ ...input, [event.target.name]: event.target.value }));
  };

  // Hanlder para el apartado de countries.
  const handleAddCountry = (event) => {
    const { value } = event.target;

    if (!input.countries.includes(value)) {
      setInput({
        ...input,
        countries: [...input.countries, value],
      });
    }
  };

  //Hanlder para evitar que el usuario escriba si hay errores.
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || /^[A-Za-z0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  // Hanlder para limpiar los countries.
  const handleClearCountries = () => {
    setInput({
      ...input,
      countries: [],
    });
  };

  // Hanlder para eliminar el country de forma individual.
  const handleRemoveCountry = (index) => {
    const updatedCountries = [...input.countries];
    updatedCountries.splice(index, 1);

    setInput({
      ...input,
      countries: updatedCountries,
    });
  };

  // Hanlder para el momento del submit.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.name === "Activity") {
      setError((prevError) => ({
        ...prevError,
        name: "Please select an activity.",
      }));
      return;
    }
    if (input.dificulty === "Difficulty") {
      setError((prevError) => ({
        ...prevError,
        dificulty: "Please select a difficulty.",
      }));
      return;
    }
    if (input.duration === "00:00") {
      setError((prevError) => ({
        ...prevError,
        duration: "Please set the duration.",
      }));
      return;
    }
    if (input.season === "Season") {
      setError((prevError) => ({
        ...prevError,
        season: "Please select a season.",
      }));
      return;
    }

    createActivity(input);
    alert("Activity created");

    setInput({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  };

  // Function que despacha la action de creación.
  const createActivity = (activityDetail) => {
    dispatch(addActivity(activityDetail));
  };

  // Constante para confirmar que no existan errores.
  const noErrors =
    Object.values(input).every((value) => value !== "") &&
    input.countries.length >= 1;

  return (
    <>
      <div className={style.componentWrapper}>
        <div className={style.wrapper}>
          <h2>Create an activity</h2>
          <form onSubmit={handleSubmit}>
            <div className={style.selectBox}>
              <label>Name: </label>
              <select name="name" value={input.name} onChange={handleChange}>
                <option hidden defaultValue>
                  Activity
                </option>
                {tourist_activities.map((name, index) => (
                  <option value={name} key={index}>
                    {name}
                  </option>
                ))}
              </select>
              <span>{error.name}</span>
            </div>
            <div className={style.selectBox}>
              <label>Difficulty: </label>
              <select
                name="dificulty"
                value={input.dificulty}
                onChange={handleChange}
              >
                <option hidden defaultValue>
                  Difficulty
                </option>
                <option value={1}>1 - Easy</option>
                <option value={2}>2 - Moderate</option>
                <option value={3}>3 - Challenging</option>
                <option value={4}>4 - Difficult</option>
                <option value={5}>5 - Advanced</option>
              </select>
              <span>{error.dificulty}</span>
            </div>
            <div className={style.durationWrapper}>
              <label>Duration: </label>
              <input
                name="duration"
                value={input.value}
                onChange={handleChange}
                type="time"
              />
              <span>{error.duration}</span>
            </div>
            <div className={style.selectBox}>
              <label>Season: </label>
              <select
                name="season"
                value={input.season}
                onChange={handleChange}
              >
                <option hidden defaultValue>
                  Season
                </option>
                {["Winter", "Spring", "Summer", "Autumn"].map(
                  (season, index) => (
                    <option value={season} key={index}>
                      {season}
                    </option>
                  )
                )}
              </select>
              <span>{error.season}</span>
            </div>
            <div className={style.selectBox}>
              <label>Countries: </label>
              <select
                name="countries"
                value={input.countries}
                onChange={handleAddCountry}
                onKeyDown={handleKeyDown}
                multiple
                className={style.countrySelect}
              >
                <option hidden defaultValue>
                  Select country
                </option>
                {sortedCountries.map((country, index) => (
                  <option value={country.name} key={index}>
                    {country.name}
                  </option>
                ))}
              </select>
              <span>{error.countries}</span>
              <button
                type="button"
                onClick={handleClearCountries}
                className={style.clearButton}
              >
                Clear Countries
              </button>
            </div>
            <div className={style.addedCountries}>
              <label>Added Countries: </label>
              <ul>
                {input.countries.map((country, index) => (
                  <li key={index}>
                    {country}
                    <button
                      type="button"
                      onClick={() => handleRemoveCountry(index)}
                      className={style.delCountryButton}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={style.selectBoxButton}>
              <button type="submit" disabled={!noErrors}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
