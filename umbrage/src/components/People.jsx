import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";

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
          // const updatedPeopleData = await getUpdatedPeopleData(peopleData);
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
      <div className="people-header">People</div>
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
              <Card.Text> {person.email} </Card.Text>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Comments</Accordion.Header>
                  <Accordion.Body>
                    This is where comments will be.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default People;
