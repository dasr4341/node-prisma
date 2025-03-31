import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const responseLib = {
    success: (res, code, message, data) => {
        return res.status(code).json({
            data,
            error: null,
            message,
            success: true
        })
    },
    error: (res, code, message, data, error) => {
        const statusCode = typeof code == 'number' ? code :  StatusCodes.INTERNAL_SERVER_ERROR
        res.status(statusCode).json({
            success: false, 
            error: {
                code: error?.code || StatusCodes.INTERNAL_SERVER_ERROR,
                codeName: error?.codeName || '',
                message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
                type: error?.type || '',
            },
            data,
            message
        })
    },
    unAuthorized: (res) => {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: null,
            error: null,
            success: false,
            message: ReasonPhrases.UNAUTHORIZED
        })
    }
}