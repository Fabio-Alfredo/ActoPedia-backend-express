import { Schema, model } from "mongoose";
import { config } from "../configs/config.js";
import bcrypct from "bcryptjs";
import {USER_STATES} from "../utils/constans/statesuser.util.js";

const STATE_LIST = Object.values(USER_STATES);


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    role: {
      type: [String],
      enum: config.roles,
      default: config.defaultRole,
    },
    token: {
      type: String,
      default: null,
    },
    updateRoleBy: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        date: Date,
      },
    ],
    estate:{
        type: String,
        enum: STATE_LIST,
        default: USER_STATES.ACTIVE,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypct.hash(this.password, parseInt(config.salt));
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypct.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
