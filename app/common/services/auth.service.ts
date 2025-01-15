import bcrypt from 'bcryptjs';
import User from '../../user/user.schema';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const accessToken = generateAccessToken((user._id as string).toString());
  const refreshToken = generateRefreshToken((user._id as string).toString());

  // Save refresh token to the user
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById((decoded as JwtPayload).userId);  if (!user) {
    throw new Error('User not found');
  }

  const newAccessToken = generateAccessToken((user._id as string).toString());
  return { accessToken: newAccessToken };
};
