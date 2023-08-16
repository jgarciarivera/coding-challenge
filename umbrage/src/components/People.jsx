import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";

export const People = ({ token }) => {
  const [people, setPeople] = useState([]);

  const GetUpdatedPeopleData = async (peopleWithoutComments) => {
    let peopleWithComments = [];

    for (let i = 0; i < peopleWithoutComments.length; i++) {
      const id = peopleWithoutComments[i].id;

      await fetch(`https://umbrage-interview-api.herokuapp.com/people/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error retrieving comments data.");
          }
          return response.json();
        })
        .then((data) => {
          const personData = data.person;
          peopleWithComments[i] = personData;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    return peopleWithComments;
  };

  useEffect(() => {
    const fetchPeople = async () => {
      await fetch("https://umbrage-interview-api.herokuapp.com/people", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error retrieving people data.");
          }
          return response.json();
        })
        .then(async (data) => {
          const peopleData = data.people;
          const updatedPeopleData = await GetUpdatedPeopleData(peopleData);
          setPeople(updatedPeopleData);
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
                    {person.comments.map((comment) => (
                      <div>{comment.comment}</div>
                    ))}
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
