import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //esto es para que si el usuario quiere modificar el usuario no se hashe el password de nuevo. tipo no hashee lo hasheado y next te manda al siguiente middleware
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (
  passowordForm: string | Buffer
) {
  return await bcrypt.compare(passowordForm, this.password);
};

const User = model("User", userSchema);

export default User;
