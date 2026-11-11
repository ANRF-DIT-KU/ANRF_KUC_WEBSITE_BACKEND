import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import "./models/index.js";

async function bootstrap() {
  try {
    await connectDatabase();
    console.log("Connected to MySQL database via Sequelize.");

    app.listen(env.port, () => {
      console.log(`Server listening on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

bootstrap();

