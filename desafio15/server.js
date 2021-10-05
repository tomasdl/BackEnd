import app from './src/app.js';
import {config} from "./src/constants/index.js"
const PORT = config.port || 8080;
app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", PORT);
});