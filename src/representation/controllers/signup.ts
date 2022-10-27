import { HttpResponse, HttpRequest } from "../protocolos/http"
import { MissingParamsError } from "../error/missing-param"
import { badRequest, serverError } from "../helper/http-helper"
import { Controller } from "../protocolos/controller"
import { EmailValidator } from "../protocolos/email-validator"
import { InvalidParamsError } from "../error/Invalid-Param"
import { ServerError } from "../error/server-error"
import { AddAccount } from "@/domain/usercases/add-account"


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator; 
    private readonly addAccount: AddAccount

    constructor (emailValidator: EmailValidator, addAccount: AddAccount){
        this.emailValidator = emailValidator;
        this.addAccount = addAccount
    }
    
    handle(httpRequest: HttpRequest): HttpResponse {
        try{
            const RequireField = 
            [
            'name', 
            'email', 
            'password',
            'confirmPassword'
            ]

            for(const field of RequireField){
                if(!httpRequest.body[field]) {
                    return badRequest(new MissingParamsError(field))
                }
            }
            const {name, password, confirmPassword, email} = httpRequest.body

            if(password !== confirmPassword){
                return badRequest(new InvalidParamsError('confirmPassword'))
            }
            
          
            const isValid = this.emailValidator.isValid(email)
            
            if(!isValid){
                return badRequest(new InvalidParamsError('email'))
            }     
            this.addAccount.add({
                name, 
                email, 
                password
            })    
        }catch(error){
            return serverError()
        }
    } 
}