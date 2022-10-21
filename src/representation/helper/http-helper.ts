import { HttpResponse } from "../protocolos/http";

export const badRequest = (error: Error): HttpResponse => ({
    statusCode:400, 
    body: error
})