import * as express from "express";
import * as favicon from "serve-favicon";
import * as http from "http";
import { AddressInfo } from "net";
import { join, resolve } from "path";

const app = express();
const server: http.Server = http.createServer(app);
const defaultPort = 5000;
const clientDirectory: string = resolve(__dirname, "client");

server.listen(process.env.PORT || defaultPort, (): void => {
  const serverAddress = server.address() as AddressInfo;
  console.log(`Server started on port ${serverAddress.port} :)`);
});

app.use("/static", express.static(clientDirectory));

app.use(favicon(join(clientDirectory, "favicon.ico")));

app.get("/", (_request: express.Request, response: express.Response): void => {
  response.sendFile(join(clientDirectory, "index.html"));
});
