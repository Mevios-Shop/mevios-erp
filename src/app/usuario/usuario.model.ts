export class Usuario {

    id?: number
    nome: string
    email: string

    constructor(nome: string, email: string) {
        this.nome = nome
        this.email = email
    }
}