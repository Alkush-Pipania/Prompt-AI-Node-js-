import { Router } from "express";
import signupRouter from "../userHandler/signup";
import loginRouter from "../userHandler/login";

const authRouter = Router();

authRouter.use("/signup", signupRouter);
authRouter.use("/signin", loginRouter);

export default authRouter;