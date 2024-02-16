import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByContinent,
  filterByActivity,
  sortCountries,
  resetCountries,
  sortCountriesByPopulation,
  getActivities,
} from "../../redux/Actions/action";

import SearchBar from "../../components/SearchBar/searchBar.jsx";
import Cards from "../../components/Cards/Cards.jsx";

import style from "./Home.module.css";

const Home = () => {
  // Constantes.
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);
  const perPage = 10;

  // Estados Locales.
  const [fullCountries, setFullCountries] = useState(allCountries);
  const [items, setItems] = useState([...allCountries]);
  const [currentPage, setCurrentPage] = useState(0);

  // Cuando se monta el componente, se despacha una action solicitando todos los Countries y las Activities.
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  // Cuando se monta el componente seteamos un estado adicional y luego se 'splitean' los items mostrados para que solo sean 10.
  useEffect(() => {
    setFullCountries(allCountries);
    setItems(allCountries.slice(0, perPage));
  }, [allCountries]);

  // Handler para RETROCEDER de página.
  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (prevPage < 0) return;

    const firstIndex = prevPage * perPage;

    setItems([...fullCountries].splice(firstIndex, perPage));
    setCurrentPage(prevPage);
  };

  // Handler para AVANZAR de página.
  const nextHandler = () => {
    const totalElements = fullCountries.length;
    const nextPage = currentPage + 1;

    const firstIndex = nextPage * perPage;

    if (firstIndex >= totalElements) return;

    setItems([...fullCountries].splice(firstIndex, perPage));
    setCurrentPage(nextPage);
  };

  // Handlers para los FILTROS.
  const handleSort = (event) => {
    const valorSeleccionado = event.target.value;

    if (
      valorSeleccionado === "Sort A to Z" ||
      valorSeleccionado === "Sort Z to A"
    ) {
      dispatch(sortCountries(valorSeleccionado));
    } else if (
      valorSeleccionado === "Population: Lowest First" ||
      valorSeleccionado === "Population: Highest First"
    ) {
      dispatch(sortCountriesByPopulation(valorSeleccionado));
    }

    setCurrentPage(0);
  };

  const handleFilter = (event) => {
    dispatch(filterByContinent(event.target.value));
    setCurrentPage(0);
  };

  const handleActivityFilter = (event) => {
    dispatch(filterByActivity(event.target.value));
    setCurrentPage(0);
  };

  const handleReset = () => {
    dispatch(resetCountries());
    setCurrentPage(0);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.Filterswrapper}>
        <div className={style.Filters}>
          <p>Filter by: </p>
          <select onChange={handleFilter}>
            <option hidden defaultValue>
              Continents
            </option>
            {[
              "North America",
              "South America",
              "Europe",
              "Asia",
              "Africa",
              "Oceania",
              "Antarctica",
            ].map((continent, index) => (
              <option value={continent} key={index}>
                {continent}
              </option>
            ))}
          </select>
          {Array.isArray(activities) && activities.length > 0 ? (
            <select onChange={handleActivityFilter}>
              <option hidden defaultValue>
                Activities
              </option>
              {activities.map((activity) => (
                <option value={activity.name} key={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          ) : (
            <select>
              <option disabled>No activities yet</option>
            </select>
          )}
        </div>
        <div className={style.sort}>
          <p>Sort: </p>
          <select onChange={handleSort}>
            <option hidden defaultValue>
              Sort
            </option>
            {[
              "Sort A to Z",
              "Sort Z to A",
              "Population: Lowest First",
              "Population: Highest First",
            ].map((order, index) => (
              <option value={order} key={index}>
                {order}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleReset}>Clear Filters</button>
      </div>
      <div className={style.cardWrapper}></div>

      {allCountries.length > 0 && (
        <Cards
          items={items}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Home;
