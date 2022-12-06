import React, { useState, useEffect } from "react";

import s from "./Pagination.module.css";

export default function Pagination({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) {
    let [state, setState] = useState();
    let [errors, setErrors] = useState(true);
    let pages = [];

    let aux =
        Math.ceil(totalPosts / postsPerPage) === 25
            ? Math.ceil(totalPosts / postsPerPage) + 1
            : Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= aux; i++) {
        pages.push(i);
    }

    let showedPages;

    if (currentPage === pages[0] || currentPage === pages[1]) {
        showedPages = pages.slice(0, 5);
    } else if (
        currentPage === pages.length ||
        currentPage === pages.length - 1 ||
        currentPage === pages.length - 2
    ) {
        showedPages = pages.slice(pages.length - 5, pages.length);
    } else {
        showedPages = pages.slice(currentPage - 3, currentPage + 2);
    }

    const handleChange = (e) => {
        let value = Number(e.target.value);
        setState(value);
    };

    useEffect(() => {
        setErrors(validationJS(state));
    }, [state]);

    const patternONumbers = RegExp(/^\d+$/);

    const validationJS = (state) => {
        const errors = {};
        if (!state) errors.number = "Number is required!";
        if (state <= 0 || !patternONumbers.test(state) || state > aux)
            errors.number = "Invalid number!";

        //console.log(errors);
        return errors;
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!Object.keys(errors).length) {
                console.log(state);
                state !== aux ? setCurrentPage(pages[state] - 1) : setCurrentPage(aux);
                setState(1);
            } else {
                console.log(errors);
                window.alert("Error! Invalid values");
            }
        }
    };

    return (
        <div className={s.container}>
            <button
                className={s.PrevNext}
                onClick={() => {
                    if (aux === 1) {
                        null;
                    } else {
                        currentPage >= 2 ? setCurrentPage(currentPage - 1) : null;
                    }
                }}
            >
                Prev
            </button>

            <input
                className={!Object.keys(errors).length ? s.inputT : s.inputF}
                type="number"
                min="1"
                max="26"
                placeholder="10"
                hidden={pages.length <= 1 ? true : false}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />

            {showedPages.map((page, index) => {
                return (
                    <button
                        className={currentPage === page ? s.btnSelected : s.btns}
                        key={index}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className={s.PrevNext}
                onClick={() => {
                    if (aux === 1) {
                        null;
                    } else {
                        currentPage < pages.length ? setCurrentPage(currentPage + 1) : null;
                    }
                }}
            >
                Next
            </button>
        </div>
    );
}
