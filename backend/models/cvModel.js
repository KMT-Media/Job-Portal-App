import mongoose from 'mongoose';

const cvSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gpa: {
      type: Number,
      required: true,
    },
    graduatedAt: {
      type: String,
      required: true,
    },
    workExperience: {
      type: String,
      required: true,
    },
    languages: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Cv = mongoose.model('cv', cvSchema);
export default Cv;
