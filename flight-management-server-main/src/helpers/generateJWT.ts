import { DotenvConfigOptions } from "dotenv";
import {sign} from "jsonwebtoken";

const generateJwt = (id: any) => {
  return sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export default generateJwt;
