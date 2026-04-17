import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Gunakan process.cwd() karena __dirname sering bermasalah di bundle Vercel (ESM)
  const rootDir = process.cwd();
  
  // Vercel /var/task adalah root project. File build ada di dist/public
  let distPath = path.resolve(rootDir, "dist", "public");

  if (!fs.existsSync(distPath)) {
    // Fallback jika struktur folder berbeda di environment Vercel
    const altPath = path.resolve(rootDir, "public");
    if (fs.existsSync(altPath)) {
      distPath = altPath;
    } else {
      console.warn(`[Static] Directory not found. Tried: ${distPath} and ${altPath}`);
    }
  }

  app.use(express.static(distPath));

  // Fallback ke index.html untuk Single Page Application (SPA) - Mirofish/Dashboard
  app.use("*", (req, res, next) => {
    // Jangan intercept request API
    if (req.path.startsWith("/api")) {
      return next();
    }
    
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not Found");
    }
  });
}
