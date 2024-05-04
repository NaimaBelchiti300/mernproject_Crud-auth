const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'Text is required in the request body' });
  } else {
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(201).json(goal);
  }
});

const authorizeUser = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'User not found' });
  } else {
    next();
  }
};

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404).json({ error: 'Goal not found' });
  } else if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ error: 'User not authorized' });
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedGoal);
  }
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404).json({ error: 'Goal not found' });
  } else if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ error: 'User not authorized' });
  } else {
    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
  }
});

module.exports = { getGoals, setGoal, authorizeUser, updateGoal, deleteGoal };
