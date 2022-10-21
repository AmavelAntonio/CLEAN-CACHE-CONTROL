
export class MissingParamsError extends Error {
    constructor(params: string){
       super(`Missing param: ${params}`) 
       this.name = 'MissingParamsError'
    }
}