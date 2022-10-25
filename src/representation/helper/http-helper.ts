import { HttpResponse } from "../protocolos/http";
import { ServerError } from "../error/server-error";
export const badRequest = (error: Error): HttpResponse => ({
    statusCode:400, 
    body: error
})

export const serverError = () => ({
    statusCode: 500, 
    body: new ServerError()
})