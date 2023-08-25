import express from "express";
import morgan from "morgan";
import cors from "cors";
import { DATABASE } from "./config.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import userModel from "./modals/admin.js";
import { password } from "./config.js";
import { email } from "./config.js";
const app = express();
app.use(bodyParser.json());
import { dbConnection } from "./helpers/dbConnection.js";
// Update the route to accept data

//db
mongoose.set("strictQuery", false);
// mongoose
//   .connect(DATABASE)
//   .then(() => console.log("welcome to mongoDB you are connected with me"))
//   .catch((err) => console.log(err));
dbConnection()

//middlewares
app.use(express.json()); //* data will be recieved by server by doing this
app.use(morgan("dev"));
app.use(cors());

//routes middlewares
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.json({
    data: "node.js welcome you! you are now connected with me.... ",
  });
});

async function createDefaultAdmin() {
  dbConnection()
  try {
    const existingAdmin = await userModel.findOne({ userType: "Admin" });
    if (existingAdmin) {
      console.log("Default Admin already exists.");
    } else {
      console.log("password->>>>>>>>>", password);
      console.log("email->>>>>>>>>", email);
      const obj = {
        userType: "Admin",
        firstName: "Manish",
        lastName: "Tomar",
        userName: "ManishTomar",
        countryCode: "+91",
        mobileNumber: "8476889763",
        email: email,
        password: bcrypt.hashSync(password),
      };
      const findAdmin = await userModel.findOne({
        email: email,
        // userName: "Admin", 
      });
      // console.log("findAdmin----->>>>>", findAdmin); 
      if (!findAdmin) {
        const result = await userModel.create(obj);
        console.log("Default admin created.", result);
      } else {
        console.log("Default admin is already created 🔫🔫");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
} // Call the function to create the default admin
createDefaultAdmin();
app.listen(9000, () => {
  console.log("your app running on port 9000🔫");
}); //!go to package.json create type:"module" by this we can us emport export
