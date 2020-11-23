const express = require("express"); // Modulo para montar servidor
const morgan = require("morgan"); // Modulo para
const path = require("path"); // Modulo para usar paths en rutas

// INITIALIZE
const app = express();

// SETTINGS
// Establece puerto, usa variable de entorno, si no, el default
app.set("port", process.env.PORT || 3000);

// DB Simulation
const products = [
  {
    id: 1,
    name: "Keyboard",
  },
  {
    id: 2,
    name: "Mouse",
  },
];

// MIDDLEWARES
app.use(morgan("dev")); // Su parametro se refiere al entorno de ejecución (dev,prod,etc)

app.use(express.urlencoded({ extended: false })); // Envia datos a través de forms usando express
app.use(express.json()); // express entiende el uso de json como formato

// ROUTES
app.get("/products", (req, res) => {
  res.json(products); // 'products' se refiere a los datos simulando la DB
});

app.post("/products", (req, res) => {
  // Destructuración de objetos para obtener solo el name del req.body (form)
  const { name } = req.body;
  console.log("this:", name);
  //inserta el objeto obtenido del formulario (POST) dentro del array (API)
  products.push({
    id: products.length + 1,
    name: name, // name para (ES6)
  });
  res.json({ "successfully created:": name });
});

// Función actualizar un documento
app.put("/products/:id", (req, res) => {
  // A través de req.params recibimos la data del navegador, name y id (Evento AJAX)
  console.log(req.params);
  res.json("getting data to edit...");
  //Obtener el 'name' e 'id' del req.params (ES6)
  const { id } = req.params;
  const { name } = req.body;

  products.forEach((product, i) => {
    // Si el id del array (API) es igual al que se esta editando, actualizala su name por el typeado
    if (product.id == id) {
      product.name = name;
    }
  });
  res.json("successfully updated");
});

// Función para eliminar documento
app.delete("/products/:id", (req, res) => {
  const { id } = req.params; // Destructuración de obj (ES6) extraer el id del re.params
  // Iteración de los objetos de la API
  products.forEach((product, i) => {
    // Si el id del objeto de la API coincide con el id del documento a eliminar, quitalo del array de la API
    if (product.id == id) {
      products.splice(i, 1); // Eliminar 1 elemento del indice i (id del documento a eliminar)
    }
  });
  res.json("successfully deleted");
});

// STATIC FILES
// Se usa el modulo path para unir directorios en cualquier S.O, (unir '__dirname' con 'public')
app.use(express.static(path.join(__dirname, "public")));

// START SERVER
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
