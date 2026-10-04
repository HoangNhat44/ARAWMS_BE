import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Tạo JSON Web Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'arawms_jwt_secret_key_2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã được đăng ký sử dụng');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
