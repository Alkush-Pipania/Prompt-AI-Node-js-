// import { Router } from "express";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import jwt from "jsonwebtoken";
// import { prisma } from "../services/db.service";

// const router = Router();

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   callbackURL: "/api/auth/google/callback"
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     const email = profile.emails?.[0]?.value;
//     if(!email || !profile.name) return done(null, false);
//     let user = await prisma.user.findUnique({
//       where: {
//         email : profile.emails![0].value
//        }
//     });

//     if (!user) {
//       user = await prisma.user.create({
//         data: {
//           email,
//           firstName : profile.name?.givenName,
//           lastName : "",
//           password : "authedViaGoogle"


//         }
//       });
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error, false);
//   }
// }));

// // 🔹 Google OAuth Login
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // 🔹 Google OAuth Callback
// router.get("/google/callback", passport.authenticate("google", { session: false }),
//   async (req : any, res : any) => {
//     if (!req.user) return res.status(401).json({ error: "Authentication failed" });

//     const user = req.user as any;

//     // Generate JWT Token
//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
//       expiresIn: "7d"
//     });

//     res.redirect(`http://localhost:3000/auth-success?token=${token}`);
//   }
// );

// export default router;