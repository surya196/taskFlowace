const sendResponse = (res: any, statusCode: number, message: string, data: any) => {
    const response = {
        status: statusCode >= 400 ? 'error' : 'success',
        statusCode,
        message,
        data,
    };
    res.status(statusCode).json(response);
};

const sendError = (res: any, error: any,) => {
    const { statusCode = 500, message } = error;
    sendResponse(res, statusCode, message, null);
};

export const response = {
    sendSuccess: (res: any, message: string, data: any) => {
        sendResponse(res, 200, message, data);
    },
    sendCreated: (res: any, message: string, data: any) => {
        sendResponse(res, 201, message, data);
    },
    sendError,
};