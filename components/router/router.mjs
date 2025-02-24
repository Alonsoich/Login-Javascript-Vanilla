class Router {
    #routes

    /**
     * Constructor para la clase Router.
     * @param {object} routes - Un objeto que define las rutas para la aplicación.
     *                          Cada clave en el objeto es un nombre de ruta (ej., 'home', 'about').
     *                          Cada valor es un objeto con las siguientes propiedades:
     *                           - path: La ruta que aparecerá en la URL (ej., '/home', '/about').
     *                           - component: El nombre del componente a cargar (ej., 'home', 'about').
     *                           - html (opcional): Un booleano que indica si el componente tiene HTML para renderizar en el contenedor '.content'.
     *                           - handler (opcional): El nombre de un método en el componente para ejecutar después de la carga.
     *
     * Ejemplo de objeto routes:
     * {
     *   home: { path: '/', component: 'home', html: true, handler: 'init' },
     *   about: { path: '/about', component: 'about', html: true }
     * }
     */
    constructor(routes) {
        this.#routes = routes;
    }

    /**
     * Inicializa el router.
     * Carga la página inicial ('home') y configura el listener de eventos click para la navegación.
     */
    init() {
        this.load("login"); // Carga la página inicial
        this.#handleClickEvent(); // Configura el listener de eventos para la navegación
    }

    /**
     * Carga una página basada en la ruta proporcionada.
     * @param {string} path - La ruta de la página a cargar (ej., 'home', 'about').
     *                       Si está vacía o nula, por defecto es 'home'.
     */
    async load(path) {
        // Determina el nombre de la página, por defecto 'home' si la ruta está vacía
        const pageName = (!path) ? "home" : path.replace("/", "");
        const routeConfig = this.#routes[pageName];

        // Comprueba si existe una configuración de ruta para el nombre de página dado
        if (!routeConfig) {
            console.error(`Configuración de ruta no encontrada para la página: ${pageName}`);
            return; // Sale de la función si no se encuentra ninguna ruta. Considera mostrar una página de error.
        }

        try {
            // Carga el módulo del componente dinámicamente
            const component = await this.#loadComponent(routeConfig.component);

            // Renderiza HTML si la configuración de ruta lo especifica
            if (routeConfig.html) {
                const container = document.querySelector(".content");
                if (container) {
                    container.innerHTML = await component.render();
                } else {
                    console.error("Contenedor '.content' no encontrado en el documento.");
                }
            }

            // Ejecuta el handler del componente si la configuración de ruta lo especifica
            if (routeConfig.handler) {
                const methodName = routeConfig.handler;
                if (component[methodName]) {
                    component[methodName](this); // Pasa la instancia del router como argumento
                } else {
                    console.error(`Método handler "${methodName}" no encontrado en el componente: ${routeConfig.component}`);
                }
            }

            // Actualiza el historial del navegador para reflejar la página actual
            window.history.pushState({}, "", routeConfig.path); // Se puede añadir un argumento de estado más descriptivo

        } catch (error) {
            console.error(`Error al cargar la página "${pageName}":`, error);
            // Considera implementar un mecanismo global de manejo de errores o mostrar una página de error al usuario.
        }
    }

    /**
     * Carga dinámicamente un módulo de componente.
     * @private
     * @async
     * @param {string} componentName - El nombre del componente a cargar (ej., 'home').
     * @returns {object} - Una instancia del componente cargado.
     */
    async #loadComponent(componentName) {
        let component;
        try {
            const module = await import(`../${componentName}/${componentName}.mjs`);

            // Capitaliza la primera letra del nombre del componente para la convención de nombres de clase
            const componentInternalName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

            // Instancia la clase del componente
            component = new module[componentInternalName]();

        } catch (error) {
            console.error(`Error al cargar el componente "${componentName}":`, error);
            // Vuelve a lanzar el error para que sea capturado en la función load, permitiendo el manejo de errores de carga de página.
            throw error;
        }
        return component;
    }

    /**
     * Configura un listener de eventos para manejar los eventos click para los enlaces de navegación.
     * @private
     */
    #handleClickEvent() {
        document.addEventListener("click", event => {
            // Comprueba si el elemento clickeado es un enlace de navegación (etiqueta <a> con clase 'nav')
            if (event.target.nodeName === "A" && event.target.classList.contains("nav")) {
                event.preventDefault(); // Previene el comportamiento por defecto del enlace (recarga completa de la página)
                event.stopPropagation(); // Detiene la propagación del evento

                const path = event.target.pathname.replace("/", ""); // Extrae la ruta del pathname del enlace
                this.load(path); // Carga la página correspondiente
            }
        });
    }
}

export { Router };