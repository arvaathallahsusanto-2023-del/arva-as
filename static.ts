import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const root = process.cwd();
  console.log(`[Static] Root: ${root}`);
  console.log(`[Static] __dirname: ${__dirname}`);
  
  // Try several locations for built files
  const pathsToTry = [
    path.join(root, "dist", "public"),
    path.join(root, "public"),
    path.resolve(__dirname, "dist", "public"),
    path.resolve(__dirname, "..", "dist", "public"),
    "/var/task/dist/public"
  ];

  let finalPath = "";
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      finalPath = p;
      console.log(`[Static] Found build directory at: ${p}`);
      break;
    }
  }

  if (finalPath) {
    app.use(express.static(finalPath));
  } else {
    console.error(`[Static] CRITICAL: Build directory not found! Checked: ${pathsToTry.join(", ")}`);
  }

  // Always register catch-all for SPA
  app.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    
    if (finalPath) {
      const indexFile = path.resolve(finalPath, "index.html");
      if (fs.existsSync(indexFile)) {
        return res.sendFile(indexFile);
      }
    }
    
    // Fallback if no index.html found
    res.status(404).send(`
      <h1>404 - SPA Index Not Found</h1>
      <p>Please ensure the project is built (npm run build) and the static files are in the correct directory.</p>
      <p>Checked paths: ${pathsToTry.filter(p => !p.includes("..")).join(", ")}</p>
    `);
  });
}
