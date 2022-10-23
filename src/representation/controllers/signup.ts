import { HttpResponse, HttpRequest } from "../protocolos/http"
import { MissingParamsError } from "../error/missing-param"
import { badRequest } from "../helper/http-helper"
import { Controller } from "../protocolos/controller"

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const RequireField = ['name', 'email', 'confirmPassword']
        for(const field of RequireField){
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamsError(field))
            }
        }
    } 
}