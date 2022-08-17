import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const PetCreate = () => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const createPetHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/pet", {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree,
        })
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };

    return (
        <div className="col-8 mx-auto">
            <div className=" col-12 d-flex justify-content-between my-4 align-items-center">
                <h1 className="mt-4"><i className="bi bi-house-heart-fill"> Pet Shelter</i></h1>
                <button className="btn btn-info text-decoration-none">
                    <i className="bi bi-house-door-fill">
                           <Link
                            className="mt-4 text-dark text-decoration-none fw-bold"
                            to={"/"}>
                            RETURN HOME
                        </Link>
                    </i>
                </button>
            </div>
            <h3 className="my-4">Know a pet needing a home?</h3>
            <div className="card">
                <form className="my-4 d-flex justify-content-around" onSubmit={createPetHandler}>
                        <div className="form-group mb-4 col-5">
                            <p className="d-block">Pet Information:</p>


                            <label className="mb-2" htmlFor="name">Pet Name:</label>
                            {errors.name ? <p className="text-danger mt-2 fw-bold">{errors.name.message}</p> : null}
                            <input type="text" className="form-control mb-2" onChange={(e) => setName(e.target.value)} value={name} />

                            <label className="mb-2" htmlFor="name">Pet Type:</label>
                            {errors.type ? <p className="text-danger mt-2 fw-bold">{errors.type.message}</p> : null}
                            <input type="text" className="form-control mb-2" onChange={(e) => setType(e.target.value)} value={type} />

                            <label className="mb-2" htmlFor="name">Description:</label>
                            {errors.description ? <p className="text-danger mt-2 fw-bold">{errors.description.message}</p> : null}
                            <input type="text" className="form-control mb-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                            <div className="container">
                                <button className="btn btn-primary btn-lg" type="submit">
                                    <i className="bi bi-person-plus-fill">
                                     Add Pet
                                    </i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="d-block">Skills (optional):</p>
                            <label className="mb-2" htmlFor="name">Skill 1:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setSkillOne(e.target.value)} value={skillOne} />
                            {errors.skillOne ? <p className="text-danger mt-2">{errors.skillOne.message}</p> : null}

                            <label className="mb-2" htmlFor="name">Skill 2:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setSkillTwo(e.target.value)} value={skillTwo} />
                            {errors.skillTwo ? <p className="text-danger mt-2">{errors.skillTwo.message}</p> : null}

                            <label className="mb-2" htmlFor="name">Skill 3:</label>
                            <input type="text" className="form-control mb-2" onChange={(e) => setSkillThree(e.target.value)} value={skillThree} />
                            {errors.skillThree ? <p className="text-danger mt-2">{errors.skillThree.message}</p> : null}
                        </div>

                </form>

            </div>
        </div>
    );
}

export default PetCreate;