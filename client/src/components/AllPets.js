import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPets = (props) => {

    const [allPets, setAllPets] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pet")
            .then((response) => {
                console.log(response.data);
                setAllPets(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="col-8 mx-auto">
            <div className=" col-12 d-flex justify-content-between my-4 align-items-center">
                <h1 className="mt-4"><i className="bi bi-house-heart-fill"> Pet Shelter</i></h1>
                <button className="btn btn-info mx-2 ">
                    <i className="fa-solid fa-dog"></i>
                    <Link className="mt-4 text-decoration-none text-dark fw-bold" to={"/new"}>
                        <i className="bi bi-plus-circle border-5"> ADD A PET TO THE SHELTER</i></Link>
                </button>
            </div>
            <h3 className="my-4">These pets are looking for a good home</h3>
            <div className="card p-2">
                <table className="col-12 mx-auto table text-start mt-4">
                    <thead className="col-12">
                    <tr className="text-start col-12">
                        <th className="col-1 px-lg-4">Name</th>
                        <th className="col-1 px-lg-4">Type</th>
                        <th className="col-3 px-lg-4">Description</th>
                        <th className="col-3 px-lg-4">Skills</th>
                        <th className="col-4 px-lg-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody  className="col-12">
                    {allPets
                        // Sort the pets in the shelter by type - alphabetically
                        .sort((a, b) => {
                            if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
                            if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
                            return 0;
                        })
                        .map((pet, index) => {
                            return (
                                <tr className="text-start col-12" key={pet._id}>
                                    <td className="col-1 px-lg-4">{pet.name}</td>
                                    <td className="col-1 px-lg-4">{pet.type}</td>
                                    <td className="col-3 px-lg-4">{pet.description}</td>
                                    <td className="col-3">
                                        <li className="list-unstyled">{pet.skillOne}</li>
                                        <li className="list-unstyled">{pet.skillTwo}</li>
                                        <li className="list-unstyled">{pet.skillThree}</li></td>
                                    <td className="col-4">
                                        <Link to={`/${pet._id}`}>
                                            <button className="btn btn-primary">Details</button>
                                        </Link>
                                        <Link to={`/${pet._id}/edit`}>
                                            <button className="btn btn-warning mx-2">Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllPets;