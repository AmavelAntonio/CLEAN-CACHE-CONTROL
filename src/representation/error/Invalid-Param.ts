
export class InvalidParamsError extends Error {
    constructor(params: string){
       super(`Invalid Email: ${params}`) 
       this.name = 'InvalidEmailError'
    }
}