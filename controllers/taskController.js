import Task from '../models/Task.js';

// Get tasks created by user (or all if admin)
export const getMyTasks = async (req, res) => {
  try {
    const { user } = req;
    let tasks;
    if (user.role === 'admin') {
      tasks = await Task.find()
        .populate('assignedTo', 'email')
        .populate('createdBy', 'email');
    } else {
      tasks = await Task.find({ createdBy: user._id }).populate('assignedTo', 'email');
    }

    const data = tasks.map(t => ({
      ...t._doc,
      assignedToEmail: t.assignedTo?.email,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks assigned to current user
export const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate('createdBy', 'email');
    const data = tasks.map(t => ({
      ...t._doc,
      createdByEmail: t.createdBy?.email,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;
    const documents = req.files ? req.files.map(file => file.filename) : [];

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || 'Low',
      status: status || 'Pending',
      assignedTo: assignedTo || req.user._id,
      createdBy: req.user._id,
      documents,
    });

    console.log('Task created with createdBy:', task.createdBy); // debug

    res.status(201).json(task);
  } catch (err) {
    console.error('Create Task Error:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, assignedTo } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    console.log('Task createdBy:', task.createdBy, 'User ID:', req.user._id);

    const creatorId = task.createdBy ? task.createdBy.toString() : null;
    if (req.user.role !== 'admin' && creatorId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    task.assignedTo = assignedTo || task.assignedTo || req.user._id;

    if (req.files && req.files.length > 0) {
      task.documents = task.documents || [];
      task.documents.push(...req.files.map(f => f.filename));
    }

    await task.save();

    const populatedTask = await Task.findById(id)
      .populate('assignedTo', 'email')
      .populate('createdBy', 'email');

    res.json({
      ...populatedTask._doc,
      assignedToEmail: populatedTask.assignedTo?.email,
      createdByEmail: populatedTask.createdBy?.email,
    });
  } catch (err) {
    console.error('Update Task Error:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'email')
      .populate('createdBy', 'email');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({
      ...task._doc,
      assignedToEmail: task.assignedTo?.email,
      createdByEmail: task.createdBy?.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
