import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
// import cors from "cors";
import { InitDb } from "./config/sequelize.js";
import authRoutes from "./routes/Auth.routes.js";
import profileStudentRoutes from "./routes/ProfileStudent.routes.js";
import profileCompanyRoutes from "./routes/ProfileCompany.routes.js";
import stageRoutes from "./routes/Stage.routes.js";
import applicationRoutes from "./routes/Application.routes.js";

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

InitDb();
app.use(express.json());
app.use(cookie());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use("/api/auth/", authRoutes);
app.use("/api/students/", profileStudentRoutes);
app.use("/api/company/", profileCompanyRoutes);
app.use("/api/stages/", stageRoutes);
app.use("/api/application/", applicationRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
