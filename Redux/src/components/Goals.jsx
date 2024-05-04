import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, addGoal, deleteGoal, updateGoal } from '../features/goalsSlice';
import { Button, Form, ListGroup, Modal } from "react-bootstrap";

import NavBar from "./NavBar";

const Goals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);
  const loading = useSelector((state) => state.goals.loading);
  const error = useSelector((state) => state.goals.error);

  const [newGoal, setNewGoal] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGoalId, setUpdateGoalId] = useState('');
  const [updatedGoalText, setUpdatedGoalText] = useState('');

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleAddGoal = () => {
    dispatch(addGoal(newGoal));
    setNewGoal('');
  };
  
  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };
  
  const handleShowUpdateModal = (id, text) => {
    setUpdateGoalId(id);
    setUpdatedGoalText(text);
    setShowUpdateModal(true);
  };
  
  const handleUpdateGoal = () => {
    dispatch(updateGoal({ id: updateGoalId, text: updatedGoalText }));
    setShowUpdateModal(false);
  };

  

  return (
    <>
      <NavBar/>
      <div className="container mt-5">
      <h2 style={{fontWeight:'bold',color:'purple'}}>Goals</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="New Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleAddGoal} disabled={!newGoal || loading}>
          Add Goal
        </Button>
      </Form>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {goals.map((goal) => (
            <ListGroup.Item key={goal._id}>
              {goal.text}
              <Button
                variant="success"
                className="mx-2"
                onClick={() => handleShowUpdateModal(goal._id, goal.text)}
              >
                Update
              </Button>
              <Button variant="danger" onClick={() => handleDeleteGoal(goal._id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'purple',fontWeight:'bold'}}>Update Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={updatedGoalText}
            onChange={(e) => setUpdatedGoalText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowUpdateModal(false)}>
            annuler
          </Button>
          <Button variant="info" style={{color:'white'}} onClick={handleUpdateGoal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Goals;
