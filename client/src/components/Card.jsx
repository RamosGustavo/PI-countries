import React from "react";
import { NavLink } from "react-router-dom";

import s from "./Card.module.css";

export default function Card(props) {
    return (
        <div className={s.containerCard}>
            <NavLink className={s.navLink} to={`/detail/${props.id}`}>
                <h3 className={s.h3}>{props.name}</h3>
                <img
                    src={props.image}
                    alt={`Image of ${props.name}`}
                    className={s.img}
                />
                <p className={s.p}>{props.continents}</p>
            </NavLink>
        </div>
    );
}
