import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PetDetails = (props) => {
    const { id } = useParams();
    console.log(id);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const navigate = useNavigate();

    const [petNotFoundError, setPetNotFoundError] = useState("");

    const [likes, setLikes] = useState(0);

    const handleLikes = (e) => {
        setLikes(likes + 1);
        e.currentTarget.disabled = true;
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setType(response.data.type);
                setDescription(response.data.description);
                setSkillOne(response.data.skillOne);
                setSkillTwo(response.data.skillTwo);
                setSkillThree(response.data.skillThree);
            })
            .catch((err) => {
                console.log(err.response);
                setPetNotFoundError(`Pet not found using that ID`);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeletePet = (id) => {
        axios.delete(`http://localhost:8000/api/pet/${id}`)
            .then((response) => {
                console.log("Pet Deleted");
                console.log(response);
                navigate("/");
            })
            .catch((err) => {
                console.log("Error Deleting Pet", err.response);
            });
    };

    return(
        <div className="col-8 mx-auto">
            <div className=" col-12 d-flex justify-content-between my-4 align-items-center">
                <h1 className="mt-4"><i className="bi bi-house-heart-fill"> Pet Shelter</i></h1>
                <button className="btn btn-info mx-2 ">
                    <i className="fa-solid fa-dog"></i>
                    <Link className="mt-4 text-decoration-none text-dark fw-bold" to={"/"}>
                        <i className="bi bi-house-heart-fill"> BACK TO HOME</i></Link>
                </button>
            </div>


            <div className="col-12 d-flex justify-content-between my-4">
                <h3 className="text-center">Details about: {name}</h3>
                <button className="btn btn-danger" onClick={() => handleDeletePet(id)}><i className="bi-house-door-fill me-3"></i>Adopt {name}</button>
            </div>
            {petNotFoundError ? (
                <h2>
                    {petNotFoundError} <Link to="/"><p className="text-warning">Click here to go back</p></Link>
                </h2>
            ) : null}

            <div className="col-12 card p-2 my-4 d-flex justify-content-around">
            <div class="row">
                <div class="col-md-9">
                    <div class="demo-content border-end">
                        <table className="col-12 mx-auto table-borderless text-start mt-4">
                            <thead className="col-12">
                            </thead>
                            <tbody className="text-start col-12">
                                <tr className="text-start col-12">
                                    <td className="col-3 py-2">
                                        <h2>Pets' Name:</h2>
                                        <span><p>{name}</p></span>
                                    </td>
                                    <td className="col-3 py-2">
                                        <h2>Pet's Type:</h2>
                                        <span><p>{type}</p></span>
                                    </td>
                                    <td className="col-3 py-2 ">
                                        <h2>Description:</h2>
                                        <span><p>{description}</p></span>
                                    </td>
                                    <td className="col-2 py-2">
                                        <h2>Skills:</h2>
                                        <p>{skillOne}</p>
                                        <p>{skillTwo}</p>
                                        <p>{skillThree}</p>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div>
                            <hr/>

                            <button className="btn mx-lg-6 btn-info">
                                <Link className="text-decoration-none text-dark" to={`/${id}/edit`}>
                                    <i className="bi bi-pencil-square fw-bold"> Edit</i>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="demo-content bg-alt">
                        <p>{name} has:</p>
                            <h1>{likes}</h1> Likes(s)
                    </div>
                    <div>
                        <hr/>
                        <button
                            className="btn btn-success"
                            onClick={handleLikes}>
                            <i className="bi-hand-thumbs-up-fill me-3"></i>
                            Give {name} some love
                        </button>
                    </div>
                </div>
            </div>



            </div>





        </div>
    )
}

export default PetDetails;