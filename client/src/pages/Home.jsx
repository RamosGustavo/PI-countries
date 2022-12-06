import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../components/Card";
import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";

import s from "./Home.module.css";
import img1 from "../img/landingimg.jpg"

import {
    getActivities,
    getCountries,
    getFilteredCountries,
} from "../Redux/actions";

export default function Home() {
    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);

    let [state, setState] = useState({
        sort: "asc",
        continent: "",
        activity: "",
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    /* useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
    }, []); */

    useEffect(() => {
        if (!allCountries.length) {
            dispatch(getCountries());
        }
        dispatch(getFilteredCountries(state));
        setCurrentPage(1);
        dispatch(getActivities());
    }, [state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setCurrentPage(1);
        setState({ sort: "asc", continent: "", activity: "" });
        dispatch(getCountries());
        dispatch(getActivities());
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [postsOnFirstPage, setPostsOnFirstPage] = useState(9);

    const difference = postsPerPage - postsOnFirstPage;
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const currentPosts = allCountries.slice(
        currentPage === 1 ? firstPostIndex : firstPostIndex - difference,
        lastPostIndex - difference
    );

    return (
        <>
        <NavBar />
            <img
                src={img1}
                alt="Draw of the planisferic world map"
                className={s.img2}
            />
            <div className={s.divh1}>
                <h1
                    className={s.h1}
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    World Countries
                </h1>
            </div>

            <form
                className={s.form}
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <select
                    className={s.select}
                    name="sort"
                    onChange={(e) => handleChange(e)}
                >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <select
                    className={s.select}
                    name="sort"
                    defaultValue=""
                    onChange={(e) => handleChange(e)}
                >
                    <option disabled value="">
                        Select a Sort 👨‍👩‍👧‍👦 
                    </option>
                    <option value="most">Most population</option>
                    <option value="least">Least population</option>
                </select>

                <select
                    className={s.select}
                    name="continent"
                    onChange={(e) => handleChange(e)}
                >
                    <option value="">All Continents 🌎</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="South America">South America</option>
                </select>

                <select
                    className={s.select}
                    name="activity"
                    defaultValue=""
                    onChange={(e) => handleChange(e)}
                >
                    <option disabled value="">
                        Select an Activity
                    </option>
                    {/* <option value="">---</option> */}
                    {allActivities?.map((el, index) => {
                        return (
                            <option key={index} value={el.name}>
                                {el.name}
                            </option>
                        );
                    })}
                </select>

                <button className={s.select} onSubmit={(e) => handleSubmit(e)}>
                    Reset
                </button>
            </form>
            <div className={s.grid}>
                {currentPosts[0] !== "404 not found" ? (
                    currentPosts && currentPosts.length ? (
                        currentPosts.map((el, index) => {
                            return (
                                <Card
                                    key={index}
                                    id={el.id}
                                    name={el.name}
                                    image={el.image}
                                    continents={el.continents}
                                />
                            );
                        })
                    ) : (
                        <span className={s.loader}></span>
                    )
                ) : (
                    <h3 className={s.h3}>404 not found</h3>
                )}
            </div>
            <Pagination
                totalPosts={allCountries.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
