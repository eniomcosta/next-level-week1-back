import express from "express";
import path from "path";
import routes from "./routes";

const app = express();

//Habilita enviar responses do tipo JSON
app.use(express.json());
app.use(routes);

//Disponibiliza rota para acesso a imagens/documentos
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3000, () => {
  console.log("App listening");
});
