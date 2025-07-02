import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initRoutes = async (app) => {
  const modulesPath = path.join(__dirname, "../../../../modules");
  const files = fs.readdirSync(modulesPath);

  for (const moduleFolder of files) {
    const folderPath = path.join(modulesPath, moduleFolder);

    const routeFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".routes.js"));

    for (const file of routeFiles) {
      const routeName = file.replace(".routes.js", "");
      const fullPath = path.join(folderPath, file);
      const routeModule = await import(pathToFileURL(fullPath));

      app.use(`/${routeName}`, routeModule.default);
    }
  }
};
