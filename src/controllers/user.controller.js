import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 

const registerUser = asynchandler(async (req, res) => {
  //get use details from frontend
  //validation  - non empty
  //check if user  already exist : username , email
  // check for image , check for avtar compulsory
  //upload them to cloudinary , avtar
  //create user object  - create entry  in db
  //remove password and refresh token feild from response
  //check for user creation
  //return res
  const { fullName, username, password, email } = req.body;
  console.log("email: ", email);

  /*if (fullName === "") {
    throw new  ApiError(400, "fullname is re")
  }*/
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Feild are compulsry");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "username or email  is already exist");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avtarLocalPath) {
    throw new ApiError(400, "avtar is required");
  }

  const avtar = await uploadCloudinary(avtarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);
  if (!avtar) {
    throw new ApiError(400, "avtar is required");
  }
  const user = await User.create({
    fullname,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (createdUser) {
    throw new ApiError(500 , "Something went wrong")
  }
  return res.status(201).json(
    new ApiResponse (200 , createdUser ,"User registered Successfully")
  )
});
export { registerUser };
