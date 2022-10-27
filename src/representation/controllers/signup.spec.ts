import { SignUpController } from './signup'
import { MissingParamsError } from '../error/missing-param';
import { InvalidEmailError } from '../error/InvalidEmail-param';
import { EmailValidator } from '../protocolos/email-validator';
import { ServerError } from '../error/server-error';

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
}

const makeEmailValidator = () => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        } 
    }
    return new EmailValidatorStub()
}


const makeSut = (): SutTypes => {

    const emailValidatorStub = makeEmailValidator();
    const sut = new SignUpController(emailValidatorStub)
    return {
        sut, 
        emailValidatorStub
    }
}

describe('SignUpController', () => {
    test('Should Return 400 if no name is provided', () => {
        const {sut} = makeSut();
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
        const {sut} = makeSut();
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
        const {sut} = makeSut();
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

    test('Should return 400 if no email valid is provided', () => {
        const {sut, emailValidatorStub} = makeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: "any_name", 
                email: "any_email",
                password: "any_Password",
                confirmPassword: "any_Password"
            }
        }

        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new InvalidEmailError('email'))
    })

    test('Should call emailValidator with correct email', () => {
        const {sut, emailValidatorStub} = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

        const httpRequest = {
            body: {
                name: "any_name", 
                email: "any_email",
                password: "any_Password",
                confirmPassword: "any_Password"
            }
        }


        sut.handle(httpRequest)
        expect(isValidSpy).toBeCalledWith('any_email') 
    })

    test('Should call emailValidator with correct email', () => {
       
       const { sut, emailValidatorStub } = makeSut();
       jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new console.error();   
        })
       const httpRequest = {
            body: {
                name: "any_name", 
                email: "any_email",
                password: "any_Password",
                confirmPassword: "any_Password"
            }
        }

       const httpReponse = sut.handle(httpRequest)
       expect(httpReponse.statusCode).toBe(500)
       expect(httpReponse.body).toEqual(new ServerError());
    })
})