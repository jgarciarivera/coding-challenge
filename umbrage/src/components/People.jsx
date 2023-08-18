import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";

export const People = ({ token }) => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    person: { comments: [{ comment: "" }] },
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState("");

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
            throw new Error(
              `Error fetching people data. Request returned the following response: "${response.status} ${response.statusText}"`
            );
          }
          return response.json();
        })
        .then(async (data) => {
          const peopleData = data.people;
          setPeople(peopleData);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(error.message);
        });
    };
    fetchPeople();
  }, [token]);

  useEffect(() => {
    const fetchPerson = async () => {
      if (selectedPersonId) {
        await fetch(
          `https://umbrage-interview-api.herokuapp.com/people/${selectedPersonId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Error fetching person data. Request returned the following response: "${response.status} ${response.statusText}"`
              );
            }
            return response.json();
          })
          .then((data) => {
            let personData = data.person;
            setPerson(personData);
          })
          .catch((error) => {
            console.error("Error", error);
            setPerson(null);
            alert(error.message);
          });
      }
    };
    fetchPerson();
  }, [selectedPersonId]);

  return (
    <div>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Comments for {person.first_name} {person.last_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {person.comments?.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </Modal.Body>
      </Modal>
      <div className="people-header">People</div>
      <Row xs={1} md={2} className="g-4">
        {people.map((person, index) => (
          <Card
            className="card"
            key={index}
            style={{ width: "18rem", padding: "0rem" }}
          >
            <Card.Img variant="top" src={person.avatar} />
            <Card.Body>
              <Card.Title>
                {person.first_name} {person.last_name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {person.job_title}
              </Card.Subtitle>
              <Card.Text> {person.email} </Card.Text>
              <Button
                style={{
                  backgroundColor: "coral",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  border: "none",
                  padding: "0.5rem",
                  width: "50%",
                }}
                onClick={() => {
                  setSelectedPersonId(person.id);
                  setShowModal(true);
                }}
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default People;
