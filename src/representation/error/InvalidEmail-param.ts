
export class InvalidEmailError extends Error {
    constructor(params: string){
       super(`Invalid Email: ${params}`) 
       this.name = 'InvalidEmailError'
    }
}