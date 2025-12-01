import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, default: 'Low' },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'InProgress'],
      default: 'Pending',
    },
    dueDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    documents: [{ type: String }], // store filenames
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
