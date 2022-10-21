import { HttpResponse, HttpRequest } from "../protocolos/http"
import { MissingParamsError } from "../error/missing-param"
import { badRequest } from "../helper/http-helper"

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
      
        const RequireField = ['name', 'email', 'confirmPassword']
        for(const field of RequireField){
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamsError(field))
            }
        }
    }

     /*
        if(!httpRequest.body.name){
            return badRequest(new MissingParamsError('name'))
        }    

        if(!httpRequest.body.email){
            return badRequest(new MissingParamsError('email'))
        }

        if(!httpRequest.body.confirmPassword){
            return badRequest(new MissingParamsError('confirmPassword'))
        }
       */

    
}