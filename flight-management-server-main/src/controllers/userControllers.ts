import { Request, Response } from "express";
import generateJwt from "../helpers/generateJWT";
import User, { IUser } from "../models/User";
const signUp = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    const error = new Error("User already registered");
    return res.status(400).json({ msg: error.message });
  }

  console.log(email);
  
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      msg: "User created correctly",
    });
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //Comprobar si el usuario existe,
  const user: any = await User.findOne({ email });
  if (!user) {
    const error = new Error("The user not exist");
    return res.status(404).json({ msg: error.message });
  }
  //Si esta confirmado
  if (!user) {
    const error = new Error("Your Account hasn't been confirmed");
    return res.status(404).json({ msg: error.message });
  }
  //Comprobar passoword
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJwt(user._id),
    });
  } else {
    const error = new Error("The password is wrong");
    return res.status(403).json({ msg: error.message });
  }
};

const profile = async (req: any, res: any) => {
  const { user } = req;

  res.json(user);
};
export { signUp, authUser, profile };
