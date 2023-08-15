import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export const People = ({ token }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      let url = "https://umbrage-interview-api.herokuapp.com/people";
      let bearerToken = `Bearer ${token}`;

      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error retrieving people data.");
          }
          return response.json();
        })
        .then((data) => {
          const peopleData = data.people;
          setPeople(peopleData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchPeople();
  }, [token]);

  return (
    <div>
      <h1>People Page!</h1>
      <div className="card-container">
        {people.map((person) => (
          <Card key={person.id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={person.avatar} />
            <Card.Body>
              <Card.Title>
                {person.first_name} {person.last_name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {person.job_title}
              </Card.Subtitle>
              <Card.Text> Email: {person.email} </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default People;
