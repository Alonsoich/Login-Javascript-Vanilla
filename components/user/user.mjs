import ComponentBase from '../component_base.mjs';

class User extends ComponentBase {
    #username = null;
    #firstName = null;
    #lastName = null;
    #id = null;

    constructor() {
        super();

        let decodeJWT = this.#decodeJWT();
        this.#username = decodeJWT.username;
        this.#firstName = decodeJWT.firstName;
        this.#lastName = decodeJWT.lastName;
        this.#id = decodeJWT.id;
    }
    get name(){
        return `${this.#firstName} ${this.#lastName}`;
    }
    get id(){
        return this.#id;
    }
    get username(){
        return this.#username;
    }


    #decodeJWT() {
        let jwt = sessionStorage.getItem("token");

        try {
            let decodeJWT = JSON.parse(atob(jwt.split(".")[1]));
            return decodeJWT;
        } catch (error) {
            console.error("Error decodificando JWT:", error);
        }
    }

}
export { User };


