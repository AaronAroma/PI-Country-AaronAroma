import style from "./cards.module.css";
import Card from "../Card/card.jsx";

const Cards = ({ items, prevHandler, nextHandler, currentPage }) => {
  return (
    <div>
      <div className={style.CardsList}>
        {items?.map((country) => (
          <Card country={country} key={country.id} />
        ))}
      </div>
      <div className={style.Pagination}>
        <button onClick={prevHandler}>◀</button>
        <p className={style.currentPage}>{currentPage}</p>
        <button onClick={nextHandler}>▶</button>
      </div>
    </div>
  );
};

export default Cards;