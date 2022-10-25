import { HttpResponse, HttpRequest } from "../protocolos/http"
import { MissingParamsError } from "../error/missing-param"
import { badRequest } from "../helper/http-helper"
import { Controller } from "../protocolos/controller"
import { EmailValidator } from "../protocolos/email-validator"
import { InvalidEmailError } from "../error/InvalidEmail-param"
import { ServerError } from "../error/server-error"

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator; 

    constructor (emailValidator: EmailValidator){
        this.emailValidator = emailValidator;
    }
    
    handle(httpRequest: HttpRequest): HttpResponse {
        try{
            const RequireField = ['name', 'email', 'confirmPassword']
        for(const field of RequireField){
            if(!httpRequest.body[field]) {
                return badRequest(new MissingParamsError(field))
            }
        }

        const isValid = this.emailValidator.isValid(httpRequest.body.email)
        
        if(!isValid){
            return badRequest(new InvalidEmailError('email'))
        }
        }catch(error){
            return{
                statusCode: 500,
                body: new ServerError()
            }
        }
    } 
}