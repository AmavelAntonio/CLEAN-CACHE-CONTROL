import { SignUpController } from './signup'
import { MissingParamsError } from '../error/missing-param';
import { InvalidEmailError } from '../error/InvalidEmail-param';

const makeSut = (): SignUpController => {
    class EmailValidator {
        isVlaid(email: string): boolean {
            return true
        }
    }

    const emailValidator = new EmailValidator();
    return new SignUpController()
}

describe('SignUpController', () => {
    test('Should Return 400 if no name is provided', () => {
        const sut = makeSut();
        const httpRequest = {
            body: {
                email: "any_email", 
                password: "any_password", 
                confirmPassword: "any_password"
            }
        }
        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new MissingParamsError('name'))
    })

    test('Should Return 400 if no email is provided', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                name: "any_name", 
                password: "any_password", 
                confirmPassword: "any_password"
            }
        }
        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new MissingParamsError('email'))
    })

    test('Should return 400 if no confirmPassword is provided', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                name: "any_name", 
                email: "any_email",
                password: "any_Password"
            }
        }
        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new MissingParamsError('confirmPassword'))
    })
})