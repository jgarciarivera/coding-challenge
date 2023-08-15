import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export const People = ({ token }) => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchPeople = () => {
  //     try {
  //       const mockPeople = [
  //         {
  //           id: "8386280d-857a-401d-a8d1-a178dc7a3c59",
  //           first_name: "Henriette",
  //           last_name: "Tillman",
  //           email: "Catalina.Spinka73@yahoo.com",
  //           job_title: "National Accounts Facilitator",
  //           avatar: "http://placehold.jp/150x150.png",
  //         },
  //         {
  //           id: "234d9958-9c5d-4215-a8c2-a2ed59eb9c48",
  //           first_name: "Audie",
  //           last_name: "Jast",
  //           email: "Hailie_Dare@gmail.com",
  //           job_title: "National Security Representative",
  //           avatar: "http://placehold.jp/150x150.png",
  //         },
  //         {
  //           id: "ca0440b3-30fa-46a0-be58-77f5ac543aff",
  //           first_name: "Gunnar",
  //           last_name: "Waters",
  //           email: "Penelope.Mraz@yahoo.com",
  //           job_title: "Future Markets Orchestrator",
  //           avatar: "http://placehold.jp/150x150.png",
  //         },
  //       ];
  //       setUsers(mockPeople);
  //     } catch (error) {
  //       console.error("Error fetching people", error);
  //     }
  //   };
  //   fetchPeople();
  // }, [token]);

  // return (
  //   <div>
  //     <h2>People</h2>
  //     {people.map((person) => (
  //       <Card key={person.id}>
  //         <Card.Img variant="top" src={person.avatar} /> {/* Card image */}
  //         <Card.Body>
  //           <Card.Title>{person.first_name}</Card.Title>
  //           <Card.Text>{person.job_title}</Card.Text>
  //         </Card.Body>
  //       </Card>
  //     ))}
  //   </div>
  // );

  return (
    // <div>
    //   <h2>User List</h2>
    //   <ul>
    //     {users.map((person) => (
    //       <li key={person.id}>{person.first_name}</li>
    //     ))}
    //   </ul>
    // </div>
    <div>Is this thing working?</div>
  );
};

export default People;
