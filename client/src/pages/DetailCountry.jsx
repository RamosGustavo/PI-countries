import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import { deleteActivity, getCountry, GET_COUNTRY } from "../Redux/actions";

import s from "./DetailCountry.module.css";

export default function DetailCountry() {
    const countryDetail = useSelector((state) => state.country);
    const { activities } = countryDetail;

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getCountry(params.id));
        return () => {
            dispatch({ type: GET_COUNTRY, payload: [] });
        };
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();

        await dispatch(deleteActivity(id));
        dispatch(getCountry(params.id));
    };

    return (
        <>
            <NavBar />
            <div className={s.grid}>
                <div className={s.divCountry}>
                    <h1 className={s.h1}>{countryDetail.name}</h1>
                    <img
                        className={s.img}
                        src={countryDetail.image}
                        alt={`Image of ${countryDetail.name}`}
                        width="300px"
                    />
                    <ul className={s.ul}>
                        <li>ID: {countryDetail.id}</li>
                        <li>Capital: {countryDetail.capital}</li>
                        <li>Continents: {countryDetail.continents}</li>
                        <li>Subregion: {countryDetail.subregion}</li>
                        <li>Area: {countryDetail.area}km2</li>
                        <li>Population: {countryDetail.population}</li>
                    </ul>
                </div>

                <div className={s.containerActivities}>
                    <h2 className={s.h2}>Activities</h2>
                    <div className={s.divActivities}>
                        {activities && activities.length ? (
                            activities.map((el, index) => {
                                return (
                                    <div className={s.divActivity} key={index}>
                                        {/* <button
                      onClick={(e) => {
                        handleDelete(e, el.id);
                      }}
                    >
                      X
                    </button> */}
                                        <h3 className={s.h3}>{el.name}</h3>
                                        <ul className={s.ul}>
                                            <li>Season: {el.season}</li>
                                            <li>Duration: {el.duration}</li>
                                            <li>Difficulty: {el.difficulty}</li>
                                        </ul>
                                    </div>
                                );
                            })
                        ) : (
                            <span className={s.span}>
                                Right now {countryDetail.name} has no activities!
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}