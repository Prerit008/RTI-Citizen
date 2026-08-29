const { spawn } = require("child_process");
const path = require("path");

require("dotenv").config();

const command = process.argv[2];
const scripts = {
    start: "start",
    build: "build",
};

if (!scripts[command]) {
    console.error("Usage: node scripts/react-scripts.js <start|build>");
    process.exit(1);
}

// CRA intentionally filters browser-visible variables to REACT_APP_*. Keep the
// deployment-facing setting concise while only exposing this public API base URL.
if (!process.env.REACT_APP_BACKEND_APP_API_URL && process.env.BACKEND_APP_API_URL) {
    process.env.REACT_APP_BACKEND_APP_API_URL = process.env.BACKEND_APP_API_URL;
}

const reactScript = require.resolve(
    path.join("react-scripts", "scripts", scripts[command])
);
const child = spawn(process.execPath, [reactScript], {
    env: process.env,
    stdio: "inherit",
});

child.on("exit", (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal);
        return;
    }
    process.exit(code ?? 1);
});
