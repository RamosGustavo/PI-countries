import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import img1 from "../img/landingimg.jpg";

export default function LandingPage() {
    return (
        <div className={s.conteiner}>
            <div>
                            <img
        src={img1}
        alt="Draw of the planisferic world map"
        className={s.img1}
    />
    </div>
            <h1 className={s.title}>World Countries</h1>
            <div className={s.butoton1}>
            
                <Link to="/home">
                <div className={s.buttoncenter}>
                    <div className={s.landingPadding}>
                        
                    <button className={s.buttonLanding}> <span></span>
                        <span></span>
                        <span></span>
                        <span></span>Bienvenido!</button>
                        </div>
                        </div>
                </Link>
            </div>
            <h5 className={s.h5}>Created by: Ramos Gustavo!</h5>
        </div>
    );
}
