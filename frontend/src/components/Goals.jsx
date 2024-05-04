import { useState, useEffect } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";
import Footer from "./footer";


const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGoalId, setUpdateGoalId] = useState("");
  const [updatedGoalText, setUpdatedGoalText] = useState("");

  
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:4000/api/goals`,
          config
        );
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        `http://localhost:4000/api/goals`,
        { text: newGoal },
        config
      );
      setGoals([...goals, response.data]);
      setNewGoal(""); 
    } catch (error) {
      console.error("Error dans l'ajoute du goal:", error.message);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios.delete(`http://localhost:4000/api/goals/${id}`, config);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error.message);
    }
  };

  const handleShowUpdateModal = (id, text) => {
    setUpdateGoalId(id);
    setUpdatedGoalText(text);
    setShowUpdateModal(true);
  };

  const handleUpdateGoal = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.put(
        `http://localhost:4000/api/goals/${updateGoalId}`,
        { text: updatedGoalText },
        config
      );

      setGoals(
        goals.map((goal) =>
          goal._id === updateGoalId ? { ...goal, text: response.data.text } : goal
        )
      );

      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error lors du modification de goal:", error.message);
    }
  };

  

  return (
   <>

    <div className="container mt-5">
      <h2  style={{fontWeight:'bold',color:'purple'}}>Mes Objectifs</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
          w-5
            type="text"
            placeholder="add obj"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleAddGoal}
          disabled={!newGoal || loading}
        >
          Ajouter Objectif
        </Button>
      </Form>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ListGroup>
          {goals.map((goal) => (
            <ListGroup.Item key={goal._id}>
              {goal.text}
              <Button
                variant="info"
                style={{color:'white'}}
                className="mx-2"
                onClick={() => handleShowUpdateModal(goal._id, goal.text)}
              >
                update
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteGoal(goal._id)}
              >
                delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:'bold',color:'purple'}}>modifier l'objectis :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
          w-5
            type="text"
            value={updatedGoalText}
            onChange={(e) => setUpdatedGoalText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowUpdateModal(false)}>
anuuler          </Button>
          <Button variant="success" onClick={handleUpdateGoal}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Footer/>

   </>
  );
};

export default Goals;
