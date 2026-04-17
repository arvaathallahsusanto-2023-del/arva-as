import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Version: 1.0.1 - Universal Path Fix
  const root = process.cwd();
  console.log(`[Arvaas-Static] Starting from: ${root}`);
  
  // Kita coba cari folder build. Di Vercel bisa jadi 'dist/public' atau langsung 'public'
  const pathsToTry = [
    path.resolve(root, "dist", "public"),
    path.resolve(root, "public"),
    path.join(root, "dist", "public"),
    "/var/task/dist/public"
  ];

  let finalPath = "";
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      finalPath = p;
      console.log(`[Arvaas-Static] Found build directory at: ${p}`);
      break;
    }
  }

  if (!finalPath) {
    console.error(`[Arvaas-Static] CRITICAL: Build directory not found! Checked: ${pathsToTry.join(", ")}`);
    // Jangan lempar error agar server tidak crash total, biarkan API tetap jalan
    return;
  }

  app.use(express.static(finalPath));

  app.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    
    const indexFile = path.resolve(finalPath, "index.html");
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      res.status(404).send("SPA Index Not Found");
    }
  });
}
