import style from "./landingPage.module.css"
import fondoLanding from "../../assets/fondoLanding.jpg"
import { Link } from "react-router-dom";

const landing = () => {
    return (
    <div className={style.Landing}>
        <div className={style.link}>
            <h1>WELCOME</h1>
            <Link to={"/home"}>
                <button className={style.button}>START</button>
            </Link>
        </div>
        <div className={style.fondo}>
            <img className={style.imgfondo} src={fondoLanding} alt="Fondo De Pantalla" />
        </div>
    </div>
    )
}

export default landing;