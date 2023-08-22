import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Form } from "react-bootstrap";

export const People = ({ token }) => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    person: { comments: [{ comment: "" }] },
  });

  const [showSelectedPersonModal, setShowSelectedPersonModal] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState("");

  const [showCreateNewPersonModal, setShowCreateNewPersonModal] =
    useState(false);
  const [newPersonFirstName, setNewPersonFirstName] = useState("");
  const [newPersonLastName, setNewPersonLastName] = useState("");
  const [newPersonEmail, setNewPersonEmail] = useState("");
  const [newPersonJobTitle, setNewPersonJobTitle] = useState("");
  const [newPersonAvatar, setNewPersonAvatar] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://umbrage-interview-api.herokuapp.com/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: newPersonFirstName,
        last_name: newPersonLastName,
        job_title: newPersonJobTitle,
        email: newPersonEmail,
        avatar: newPersonAvatar,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to add Person. Request returned the following response: "${response.status} ${response.statusText}"`
          );
        }
        // Refresh list of people
        alert("Successfully added new Person!");
        setNewPersonFirstName("");
        setNewPersonLastName("");
        setNewPersonJobTitle("");
        setNewPersonEmail("");
        setNewPersonAvatar("");
        setShowCreateNewPersonModal(false);
        return response.json();
      })
      .catch((error) => {
        console.error("Error", error);
        alert(error.message);
      });
  };

  return (
    <div>
      <Modal
        centered
        show={showSelectedPersonModal}
        onHide={() => setShowSelectedPersonModal(false)}
      >
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
      <Modal
        centered
        show={showCreateNewPersonModal}
        onHide={() => setShowCreateNewPersonModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <input
              className="new-person-modal-input"
              type="text"
              value={newPersonFirstName}
              onChange={(e) => setNewPersonFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="off"
            ></input>
            <input
              className="new-person-modal-input"
              type="text"
              value={newPersonLastName}
              onChange={(e) => setNewPersonLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="off"
            ></input>
            <input
              className="new-person-modal-input"
              type="text"
              value={newPersonJobTitle}
              onChange={(e) => setNewPersonJobTitle(e.target.value)}
              placeholder="Job Title"
              autoComplete="off"
            ></input>
            <input
              className="new-person-modal-input"
              type="text"
              value={newPersonEmail}
              onChange={(e) => setNewPersonEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
            ></input>
            <input
              className="new-person-modal-input"
              type="text"
              value={newPersonAvatar}
              onChange={(e) => setNewPersonAvatar(e.target.value)}
              placeholder="Avatar URL"
              autoComplete="off"
            ></input>
            <button
              disabled={
                !newPersonFirstName ||
                !newPersonLastName ||
                !newPersonJobTitle ||
                !newPersonEmail
              }
              className="login-button"
              type="submit"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </Form.Group>
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
                  setShowSelectedPersonModal(true);
                }}
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <button
        className="add-person-button"
        onClick={() => {
          setShowCreateNewPersonModal(true);
        }}
      >
        +
      </button>
    </div>
  );
};

export default People;
