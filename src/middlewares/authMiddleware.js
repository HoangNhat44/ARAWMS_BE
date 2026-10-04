import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/responseHandler.js';

/**
 * Middleware xác thực Token JWT
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Không có quyền truy cập, thiếu Token xác thực', null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'arawms_jwt_secret_key_2026');
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return sendError(res, 'Tài khoản không tồn tại hoặc đã bị xóa', null, 401);
    }

    next();
  } catch (error) {
    return sendError(res, 'Token không hợp lệ hoặc đã hết hạn', null, 401);
  }
};

/**
 * Middleware phân quyền (Role Authorization)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        `Quyền '${req.user.role}' không được phép thực hiện hành động này`,
        null,
        403
      );
    }
    next();
  };
};
