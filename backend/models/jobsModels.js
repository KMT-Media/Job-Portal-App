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
    companyUrl: {
      type: String,
      required: true,
    },
    skills: [String],
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model('Jobs', jobsSchema);
export default Jobs;
