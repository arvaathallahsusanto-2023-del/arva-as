import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function serveStatic(app: Express) {
  const root = process.cwd();
  
  // Robust __dirname discovery (supports ESM and Bundled CJS)
  let currentDir = "";
  try {
    // @ts-ignore - import.meta is only available in ESM
    currentDir = path.dirname(fileURLToPath(import.meta.url));
  } catch (e) {
    // If ESM fails, we are likely in a bundled CJS environment
    // @ts-ignore - __dirname is available in CJS
    currentDir = typeof __dirname !== 'undefined' ? __dirname : root;
  }

  console.log(`[Static] Root: ${root}`);
  console.log(`[Static] CurrentDir: ${currentDir}`);
  
  const pathsToTry = [
    path.join(root, "dist", "public"),
    path.join(root, "public"),
    path.resolve(currentDir, "dist", "public"),
    path.resolve(currentDir, "..", "dist", "public"),
    "/var/task/dist/public",
    path.join(root, "client", "dist", "public")
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

  app.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    
    if (finalPath) {
      const indexFile = path.resolve(finalPath, "index.html");
      if (fs.existsSync(indexFile)) {
        return res.sendFile(indexFile);
      }
    }
    
    // Debug info for the user
    let dirContent = "Not readable";
    try {
      dirContent = fs.readdirSync(root).join(", ");
    } catch(e) {}

    res.status(404).send(`
      <div style="font-family: sans-serif; padding: 2rem; background: #020617; color: #f8fafc; min-h: 100vh;">
        <h1 style="color: #22d3ee;">404 - SPA Index Not Found</h1>
        <p>Current Root: <code>${root}</code></p>
        <p>Checked Paths:</p>
        <ul>
          ${pathsToTry.map(p => `<li><code>${p}</code> ${fs.existsSync(p) ? "✅" : "❌"}</li>`).join("")}
        </ul>
        <p>Files in Root: <code>${dirContent}</code></p>
        <hr style="border-color: #1e293b; margin: 2rem 0;">
        <p style="font-size: 0.8rem; color: #64748b;">Please ensure <code>npm run build</code> has completed successfully.</p>
      </div>
    `);
  });
}
