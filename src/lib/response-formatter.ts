import { NextFunction, Request, Response } from 'express';

const httpStatusMessage = {
  200: { code: 200, msg: 'OK' },
  201: { code: 201, msg: 'CREATED' },
  204: { code: 204, msg: 'NO_CONTENT' },
  400: { code: 400, msg: 'BAD_REQUEST' },
  401: { code: 401, msg: 'UNAUTHORIZED' },
  403: { code: 403, msg: 'FORBIDDEN' },
  404: { code: 404, msg: 'NOT_FOUND' },
  405: { code: 405, msg: 'METHOD_NOT_ALLOWED' },
  409: { code: 409, msg: 'CONFLICT' },
  422: { code: 422, msg: 'UNPROCESSABLE_ENTITY' },
  429: { code: 429, msg: 'TOO_MANY_REQUESTS' },
  500: { code: 500, msg: 'INTERNAL_SERVER_ERROR' },
  501: { code: 501, msg: 'NOT_IMPLEMENTED' },
  502: { code: 502, msg: 'BAD_GATEWAY' },
  503: { code: 503, msg: 'SERVICE_UNAVAILABLE' },
};

type HttpStatusType = keyof typeof httpStatusMessage;

type ParamResponseFormatter = {
  status: HttpStatusType;
  msg?: string;
  data?: any;
};

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const responseFormatterHandler = (params: ParamResponseFormatter) => {
    return res.status(httpStatusMessage[params.status].code).json({
      meta: {
        code: httpStatusMessage[params.status].code,
        msg: params.msg ?? httpStatusMessage[params.status].msg,
      },
      data: params.data ?? [],
    });
  };

  res.responseFormatter = responseFormatterHandler;
  next();
};

export { HttpStatusType, ParamResponseFormatter, responseFormatter };
