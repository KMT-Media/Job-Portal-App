import mongoose from 'mongoose';

const jobApplication = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Jobs',
    },
    userApplied: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model('JobApplication', jobApplication);
export default JobApplication;
