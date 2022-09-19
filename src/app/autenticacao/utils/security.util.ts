import { Usuario } from "src/app/usuario/usuario.model";

export class Security {
    public static set(usuario: Usuario, token: string) {
        const data = JSON.stringify(usuario);

        localStorage.setItem('me_user', btoa(data));
        localStorage.setItem('me_token', token);
    }

    public static setUser(usuario: Usuario) {
        const data = JSON.stringify(usuario);
        localStorage.setItem('me_user', btoa(data));
    }

    public static setToken(token: string) {
        localStorage.setItem('me_token', token);
    }

    public static getUser(): any {
        const data = localStorage.getItem('me_user');
        if (data) {
            const usuario: Usuario = JSON.parse(atob(data));
            return usuario
        }
        return null;
    }

    public static getToken(): string {
        const data = localStorage.getItem('me_token');
        if (data) {
            return data;
        } else {
            return '';
        }
    }

    public static hasToken(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }

    public static clear() {
        localStorage.removeItem('me_user');
        localStorage.removeItem('me_token');
    }
}