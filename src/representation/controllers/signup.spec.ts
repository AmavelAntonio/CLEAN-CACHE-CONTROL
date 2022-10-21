import { SignUpController } from './signup'

describe('SignUpController', () => {
    test('Should Return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: "any_email", 
                password: "any_password", 
                confirmPassword: "any_password"
            }
        }
        const httpReponse = sut.handle(httpRequest)
        expect(httpReponse.statusCode).toBe(400)
        expect(httpReponse.body).toEqual(new Error('Missing param: name'))
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
        expect(httpReponse.body).toEqual(new Error('Missing param: email'))
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
        expect(httpReponse.body).toEqual(new Error('Missing param: confirmPassword'))
    })
})