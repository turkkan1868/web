import user from "../model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "kullanıcı bulunamadı" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(404).json({ message: "Zaten kayıtlı" });
  }

const hashedPassword = bcrypt.hashSync(password);

  //----------------
  const userResult = new user({
    name,
    email,
    password: hashedPassword,
    blogs:[]
  });

  try {
    await userResult.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ userResult });
};

 export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Kayıtlı kullanıcı bulunamadı " });
  }
  const isPasswordCorrect =  bcrypt.compareSync(password,existingUser.password);
  if(!isPasswordCorrect){
      return res.status(400).json({message:"Yanlış şifre"})
  }
return res.status(200).json({message:"giriş başarılı"});
};
