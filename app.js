import { Router } from "./components/router/router.mjs";
import routes from "./routes.mjs";

const router = new Router(routes);
router.init();