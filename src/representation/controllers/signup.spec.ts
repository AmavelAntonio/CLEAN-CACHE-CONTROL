import { SignUpController } from './signup'
import { MissingParamsError } from '../error/missing-param';
import { InvalidParamsError } from '../error/Invalid-Param';
import { EmailValidator } from '../protocolos/email-validator';
import { ServerError } from '../error/server-error';
import { AccountModel } from '../../domain/models/Account'
import { AddAccountModel, AddAccount } from '../../domain/usercases/add-account'
import { AccountCity } from '../../domain/models/Account';


const makeEmailValidator = () => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        } 
    }
    return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        add (account: AddAccountModel): AccountModel {
            const fakeAccount = {
                id: 'valid_id', 
                name: 'valid_name', 
                email: 'valid_email@email.com',
                password: 'valid_password'
            }
            return fakeAccount;
        }
    }
    return new AddAccountStub()
}

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    AddAccountStub: AddAccount
}

const makeSut = (): SutTypes => {

    const emailValidatorStub = makeEmailValidator()
    const AddAccountStub = makeAddAccount()
    const sut = new SignUpController(emailValidatorStub, AddAccountStub)
    
    return {
        sut, 
        emailValidatorStub, 
        AddAccountStub
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
                password: "any_Password",
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
        expect(httpReponse.body).toEqual(new InvalidParamsError('email'))
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

    test('Should Return 400 if passwordconfirmation fails', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: "any_name", 
                email: "any_email", 
                password: "any_password", 
                confirmPassword: "any2_password"
            }
        }
        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new InvalidParamsError('confirmPassword'))
    })

    test('Should call AddAccount with correct values', () => {
        const { sut, AddAccountStub } = makeSut();
        const addSpy = jest.spyOn(AddAccountStub, 'add')

        const httpRequest = {
            body: {
                name: 'any_name', 
                email: 'any_email@gmail.com', 
                password: 'any_password', 
                confirmPassword: "any_password"
            }
        }

        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name', 
            email: 'any_email@gmail.com', 
            password: 'any_password'
        })
    })
})
