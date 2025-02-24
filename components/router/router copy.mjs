class Router {
    #routes

    constructor(routes) {
        this.#routes = routes;
    }

    init() {
        this.load("home");
        this.#handleClickEvent();
    }

    async load(path) {
        let page = (!path) ? "home" : path.replace("/", "");
        let component = await this.#loadComponent(this.#routes[page].component);
        
        if ("html" in this.#routes[page]) {
          let container = document.querySelector(".content");
          container.innerHTML = await component.render();
        }
        
        if ("handler" in this.#routes[page]) {
          let methodName = this.#routes[page].handler;
          component[methodName](this);
        }
        window.history.pushState({}, "done", this.#routes[page].path);
    }
    async #loadComponent(componentName) {
        let component;
        await import(`../${componentName}/${componentName}.mjs`).then((module) => {
            // Capitalize component name
            let componentInternalName = String(componentName)
                .replace(/\b\w/, letter => letter.toUpperCase());

            // Create new object
            component = new module[componentInternalName]();

        });

        return component;
    }
    #handleClickEvent() {
        document.addEventListener("click", event => {
            if ((event.target.nodeName === "A") && (event.target.classList.contains("nav"))) {
                event.preventDefault();
                event.stopPropagation();

                let path = event.target.pathname.replace("/", "");
                this.load(path);
            }
        });
    }
}
export { Router };