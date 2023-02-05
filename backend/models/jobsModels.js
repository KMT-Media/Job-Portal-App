import mongoose from 'mongoose';

const jobsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    jobLevel: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    skills: [String],
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model('Jobs', jobsSchema);
export default Jobs;
