
export interface AccountModel {
    id: string
    name: string
    email: string
    password: string
}

export interface AccountCity {
    name: string
    populacao: number
    pais?: string
    continente?: string
}