# Deploy to Railway
Railway uses Nixpacks to analyze your application's files to generate a container image for your application.

This template does not have a "build" or "start" command by default. If you were to deploy this repo to Railway, you will get the following error:

```bash
Nixpacks build failed

+---------------------------+
| Nixpacks v1.34.1          |
+---------------------------+
| setup   | nodejs_18, bun  |
| install | bun i --no-save |
| start   |                 |
+---------------------------+

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

### Interact with the application
Go to the `js-backend` service that you have deployed -> click on the Settings tab -> scroll down to Networking -> Generate Domain.  
Make sure the PORT is the same port that is being used in the code. By default it should be 4000.

Once generated, you will have an URL like this: `https://js-backend-production-5a49.up.railway.app`. You can now ping the endpoints, for example: `js-backend-production-5a49.up.railway.app/health`.