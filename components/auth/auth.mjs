import ComponentBase from '../component_base.mjs';

class Auth extends ComponentBase {
    #template = "components/auth/auth.html";

    async render() {
        return await this.fetchFile(this.#template);
    }

    login(router) {
        // Si ya hay token, vamos a home en lugar de login
        if (this.#tokenExistsInSession()) {
            router.load("home");
            return true;
        }

        const form = document.querySelector("form.login");
        if (!form) {
            console.error("No se encontró el formulario de login");
            return false;
        }

        // Eliminamos listeners anteriores para evitar duplicados
        const nuevoForm = form.cloneNode(true);
        form.parentNode.replaceChild(nuevoForm, form);

        nuevoForm.addEventListener("submit", async event => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const userName = formData.get('username');
            const password = formData.get('password');

            if (!userName || !password) {
                alert("Por favor, introduce usuario y contraseña");
                return false;
            }

            try {
                const auth = await this.#doLogin(userName, password);
                console.log('Respuesta del servidor:', auth);

                if (auth && auth.accessToken) { // Cambiado de auth.token a auth.accessToken
                    sessionStorage.setItem('token', auth.accessToken);
                    router.load("home");
                    return true;
                } else {
                    alert(auth?.message || "Error en el login");
                    return false;
                }
            } catch (error) {
                console.error("Error durante el login:", error);
                alert("Ocurrió un error durante el login");
                return false;
            }
        });

        return true; // Importante: retornar true para indicar que el handler se configuró correctamente
    }

    #tokenExistsInSession() {
        return sessionStorage.getItem("token") !== null;
    }

    logout(router) {
        sessionStorage.removeItem('token');
        router.load("login");
        return true;
    }

    async #doLogin(userName, password) {
        let request = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        });

        return await request.json();
    }
}

export { Auth };