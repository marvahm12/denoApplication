import { Application, CORS } from "./deps.ts";
import { errorHandler, notFound } from "./middlewares/error.ts";
import appRoutes from "./routes/index.ts";
import { setUpDb } from "./database/index.ts";

const app = new Application();

// Db synchronization
await setUpDb();

app.use(CORS({
  origin: "*",
  credentials: true,
}));

// Error Handler
app.use(errorHandler);

// Router
app.use(appRoutes.routes());

// Not found Page handler
app.use(notFound);

export default app;
