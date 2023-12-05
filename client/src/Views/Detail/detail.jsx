import style from "./detail.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { detalle } from "../../redux/Actions/action";

const Detail = () => {
  const { id } = useParams();

  const [country, setCountry] = useState({});

  const fetchCountryDetail = async (id) => {
    try {
      const countryDetail = await detalle(id);
      setCountry(countryDetail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountryDetail(id);
    // axios(`http://localhost:3001/countries/${id}`)
    //   .then(({ data }) => {
    //     if (data[0].name) {
    //       setCountry(data[0]);
    //     } else {
    //       alert("No hay paises con ese ID");
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  }, [id]);

  return (
    <div className={style.DetailContainer}>
      <div className={style.wrapped}>
        <h2>▷ DETAIL ↴ </h2>
        <div className={style.Detail}>
          <NavLink to={"/home"}>
            <button className={style.CloseDetail}>✕</button>
          </NavLink>
        </div>
        <div className={style.info}>
          <img className={style.characterImage} src={country.flag} />
          <div className={style.infoText}>
            <h2 className={style.nameText}>
              <span>▻ Name: </span> {country.name}
            </h2>

            <h2 className={style.marginH2}>
              <span>‣ Continent: </span> {country.continent}
            </h2>

            <h2 className={style.marginH2}>
              <span>‣ Capital: </span> {country.capital}
            </h2>

            <h2 className={style.marginH2}>
              <span>‣ Subregion: </span> {country.subregion}
            </h2>

            <h2 className={style.marginH2}>
              <span>‣ Area: </span> {country.area}
            </h2>

            <h2 className={style.marginH2}>
              <span>‣ Population: </span> {country.population}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
