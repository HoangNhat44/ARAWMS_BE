import * as authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendError(res, 'Vui lòng cung cấp đầy đủ name, email và password');
    }

    const result = await authService.registerUser({ name, email, password });
    return sendSuccess(res, 'Đăng ký tài khoản thành công', result, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, 'Vui lòng nhập đầy đủ email và password');
    }

    const result = await authService.loginUser({ email, password });
    return sendSuccess(res, 'Đăng nhập thành công', result, 200);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Lấy thông tin người dùng thành công', { user: req.user });
  } catch (error) {
    next(error);
  }
};
