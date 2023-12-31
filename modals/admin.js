import { model, Schema, ObjectId } from "mongoose";

const adminSchema = new Schema(
  {
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userType : {
        type : String,
    },

    mobileNumber: { type: String, default: "" },

  },
  { timestamps: true } //this will update our data base automatically if anything is added or del, etc.
);

export default model("admin", adminSchema); //it is the user model which is based on the schema we defined.
