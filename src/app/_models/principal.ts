import { Injectable } from "@angular/core";

Injectable()
export class Principal {

    constructor(basePrincipal: any) {
        this.id = basePrincipal.id;
        this.username = basePrincipal.username;
        this.email = basePrincipal.email;
        this.token = basePrincipal.token;
        this.roles = basePrincipal.roles;
    }

    id: number;
    username: string;
    email: string;
    token: string;
    tokenType: string;
    roles: string[];
    
}