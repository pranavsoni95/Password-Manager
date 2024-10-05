import User from "../models/UserModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//@desc User Register
//@route POST /api/users/register
//@access public
export const registerUser = async (req, res) => {
  try {
    const { Name, Email, Phone, Password } = req.body;
    if (!Name || !Email || !Phone || !Password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const userAvailable = await User.findOne({ Email });
    if (userAvailable) {
      return res.status(400).json({ error: "The user already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      Name,
      Email,
      Phone,
      Password: hashedPassword,

    });

    if (user) {
      res.status(201).json({ _id: user.id, email: user.Email });
    } else {
      res.status(400).json({ error: "User data is not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

//@desc User Login
//@route POST /api/users/login
//@access public
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findOne({ Email });

  // Compare password with hashedPassword
  if (user && (await bcrypt.compare(Password, user.Password))) {
    const accessToken = jwt.sign(
      {
        user: {
          Name: user.Name,
          Email: user.Email, // Ensure this matches your database field
          Id: user.id,
        },
      },
      process.env.JWT_SECRET, // Ensure your JWT secret is stored in environment variables
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ error: "Email or password is not valid" });
  }
};

//@desc User Current
//@route POST /api/users/current
//@access private
export const currentUser = async (req, res) => {
  res.json(req.user);
};
