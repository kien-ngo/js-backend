# Deploy to Railway
Railway uses Nixpacks to analyze your application's files to generate a container image for your application.

This template does not have a "build" or "start" command by default. If you were to deploy this repo to Railway, you will get the following error:

```bash
Nixpacks build failed

+------------------------+
| Nixpacks v1.34.1      |
+------------------------+
| setup   | nodejs_18, bun |
| install | bun i --no-save |
| start   |                |
+------------------------+

Error: No start command could be found
```

To make it work, include the following scripts to the `package.json`:
```json
{
  "scripts": {
    "build": "bun build ./src/index.ts --compile --outfile server",
    "start": "./server"
  }
}
```
