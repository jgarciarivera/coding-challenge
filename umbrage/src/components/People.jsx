import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";

export const People = ({ token }) => {
  const [people, setPeople] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedId) {
        await fetch(
          `https://umbrage-interview-api.herokuapp.com/people/${selectedId}`,
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
              throw new Error("Error fetching comments.");
            }
            return response.json();
          })
          .then((data) => {
            let commentsData = data.person.comments;
            setModalData(commentsData);
          })
          .catch((error) => {
            console.error("Error", error);
            setModalData(null);
          });
      }
    };
    fetchComments();
  }, [selectedId]);

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
            throw new Error("Error fetching people.");
          }
          return response.json();
        })
        .then(async (data) => {
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </Modal.Body>
      </Modal>
      <div className="people-header">People</div>
      <Row xs={1} md={2} className="g-4">
        {people.map((person, index) => (
          <Card className="card" key={index} style={{ width: "18rem" }}>
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
                variant="primary"
                onClick={() => {
                  setSelectedId(person.id);
                  setShowModal(true);
                }}
              >
                Comments
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default People;
