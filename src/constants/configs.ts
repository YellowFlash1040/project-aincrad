import { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

import { HttpError } from '../helpers/index.js';

const { FRONTEND_URL = '*', META_USER, META_PASSWORD } = process.env;

export const expressJsonConfig = {
  verify: (_: IncomingMessage, __: ServerResponse<IncomingMessage>, buf: Buffer) => {
    try {
      JSON.parse(buf.toString());
    } catch {
      throw HttpError(400, 'invalid JSON');
    }
  }
};

export const corsConfig = {
  origin: FRONTEND_URL,
  optionsSuccessStatus: 204
};

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD
  }
};

export const transport = nodemailer.createTransport(nodemailerConfig);
