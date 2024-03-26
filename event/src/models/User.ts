import mongoose from "mongoose";

export interface IUsers extends mongoose.Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  isSubscribed: boolean;
}

const UserSchema = new mongoose.Schema<IUsers>({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    minlength: [3, "Username must be 3 letters long"],
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
});

// export default mongoose.model<Users>('users', UserSchema);
export default mongoose.models.users || mongoose.model("users", UserSchema);
