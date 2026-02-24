/* eslint-disable @typescript-eslint/no-unused-vars */
import uploadToCloudinary from '@/config/cloudinary';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodObject } from 'zod';
import { AnyZodObject } from 'zod/v3';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Request body is required',
        });
      }

      let bodyData = req.body;

      if (req.body.data) {
        try {
          bodyData =
            typeof req.body.data === 'string'
              ? JSON.parse(req.body.data)
              : req.body.data;
        } catch (parseErr) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid JSON in request body',
          });
        }
      }
      const parsed = await schema.safeParseAsync({
        body: bodyData,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      if (!parsed.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: parsed.error.issues,
        });
      }

      req.body = parsed.data.body;

      if (req.file) {
        const upload = await uploadToCloudinary(req.file);
        if (upload) {
          req.body.profile.profilePicture = upload.secure_url;
        }
      }

      Object.assign(req.query, parsed.data.query);
      Object.assign(req.params, parsed.data.params);
      Object.assign(req.cookies, parsed.data.cookies);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
