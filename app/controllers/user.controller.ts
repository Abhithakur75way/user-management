import { Request, Response } from 'express';
import { registerUser, loginUser, refreshAccessToken } from '../common/services/auth.service';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginUser(email, password);
    res.json({ accessToken, refreshToken });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Refresh access token
export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
