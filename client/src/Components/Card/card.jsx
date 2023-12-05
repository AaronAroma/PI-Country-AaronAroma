import { Link } from "react-router-dom";

import style from "./Card.module.css";

const Card = ({ country }) => {
  const { name, continent, flag, id } = country;

  return (
    <div className={style.cardWrapper}>
      <Link to={`/detail/${id}`}>
        <div className={style.card}>
          <div className={style.imageContent}>
            <span className={style.overlay}></span>
            <div className={style.cardImage}>
              <img className={style.cardImg} src={flag} alt={`${name} flag`} />
            </div>
          </div>
          <div className={style.cardContent}>
            <h2 className={style.name}>{name}</h2>
            <p className={style.continent}>{continent}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
