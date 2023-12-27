const express = require('express');
const bodyParser = require('body-parser');
const cors = require ("cors");
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors())
let tasks = [
  // { id: 1, title: "Task 1", description: "Description for Task 1" },
  // { id: 2, title: "Task 2", description: "Description for Task 2" },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
  } else {
    const newTask = { id: tasks.length + 1, title, description };
    console.log("New Task==>" , newTask)
    tasks.push({id: tasks.length + 1, title:title, description:description});
    res.status(201).json(newTask);
  }
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    const { title, description } = req.body;
    tasks[taskIndex] = { id: taskId, title, description };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
