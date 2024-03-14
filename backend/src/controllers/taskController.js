const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const { title, description, isCompletedTask, director, genre, releaseYear } = req.body;
    const userId = req.user.id;

    const task = await taskService.createTask({
      title,
      description,
      isCompletedTask,
      director,
      genre,
      releaseYear,
      userId,
    });

    console.log("Movie created:", task);

    res.status(201).json(task);
  } catch (error) {
    console.error("Failed to create Movie:", error);
    res.status(500).json({ message: "Failed to create Movie." });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getAllTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Failed to fetch Movies:", error);
    res.status(500).json({ message: "Failed to fetch Movies." });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await taskService.getTaskById(id, userId);

    if (!task) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Failed to fetch task by ID:", error);
    res.status(500).json({ message: "Failed to fetch task by ID." });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updatedData = req.body;

    const task = await taskService.updateTask(id, userId, updatedData);

    if (!task) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Failed to update Movie:", error);
    res.status(500).json({ message: "Failed to update Movie." });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const success = await taskService.deleteTask(id, userId);

    if (!success) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete Movie:", error);
    res.status(500).json({ message: "Failed to delete Movie." });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
