import { HttpResponse, HttpRequest } from "../protocolos/http"
import { MissingParamsError } from "../error/missing-param"
export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if(!httpRequest.body.name){
            return {
                statusCode: 400, 
                body: new MissingParamsError('name')
            }
        }    

        if(!httpRequest.body.email){
            return {
                statusCode: 400, 
                body: new MissingParamsError('email')
            }
        }

        if(!httpRequest.body.confirmPassword){
            return{
                statusCode: 400, 
                body: new MissingParamsError('confirmPassword')
            }
        }
    }
}