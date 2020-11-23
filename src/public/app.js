// Función obtener y mostrar documentos de la API (GET button)
$(function () {
  // Evento onclick sobre el boton para mostrar todos los productos
  $("#getProducts").on("click", function () {
    // Uso de AJAX para capturar datos de una "API"
    $.ajax({
      url: "/products", // URL de la 'API' (simulación de DB)
      success: function (products) {
        console.log("AJAX WORKING...", products);
        // Selecciona y captura elemento tbody del HTML
        let tbody = $("tbody");

        // Al entrar a la página no abran datos a menos que hagamos la petición (GET products)
        tbody.html("");
        // Recorre cada objeto de la API y crea una estructura para mostrarlos
        products.forEach((product) => {
          // agregar cada product al elemento tbody vacio
          tbody.append(`
                     <tr>
                         <td class="id" style="color: azure;">${product.id}</td>
                         <td>
                         <input id="input${product.id}" type="text" class="form-control input-group-sm mb-3 name edit-input" value="${product.name}"/>
                         </td>
                         <td>
                         <button class="btn btn-warning btn-flex update-button">Update</button>
                         <button class="btn btn-danger btn-flex delete-button">Delete</button>
                        </td>
                     </tr>
                    `);
        });
      },
    });
  });
});

// Función crear un documento/producto
// Al dar submit en el formulario con id 'productForm'...
$("#productForm").on("submit", function (e) {
  e.preventDefault();
  let newProduct = $("#newProduct"); // Captura el elemento con id 'newProduct' (Input)

  // Uso de AJAX para enviar datos a la API
  $.ajax({
    url: "/products", // url POST al dar submit
    method: "POST", // VERB METHOD
    data: {
      name: newProduct.val(), // Enviamos un objeto, con clave name y valor el contenido typeado dentro del input
    },
    success: function (response) {
      console.log("AJAX RESPONSE", response);
      $("#getProducts").click();
    },
  });
});

// Función update (click botón 'update')
// Selecciona el elemento table, al dar click sobre el elemento con la clase 'update-button' crea un evento
$("table").on("click", ".update-button", function () {
  //Seleccionar toda la fila y lo que este cerca a esa fila dentro del tr
  let row = $(this).closest("tr");

  //obtener el id para saber que dato actualizar dentro del server
  let id = row.find(".id").text(); // De los elementos cerca de tr, busca el que tenga la clase id y captura su contenido (El ID)
  let name = row.find(".name").val(); // del tr busca el elemento con clase 'name' y solo captura su valor (typeado)

  // Función AJAX para actualizar el producto 1,2,3,n+.. (url dinamica)
  $.ajax({
    url: "/products/" + id, // se enviara la petición con el id del campo seleccionadó
    method: "PUT", // VERB METHOD
    data: {
      name: name, // La data a enviar sera el contenido del input name
    },
    success: function (response) {
      console.log("AJAX RESPONSE (PUT)", response);
      $("#getProducts").click();
      $(`input${id}`).focus();
    },
  });
});

// Función AJAX para eliminar el producto 1,2,3,n+.. (url dinamica)
// Selecciona el elemento table, al dar click sobre el elemento con la clase 'delete-button' crea un evento
$("table").on("click", ".delete-button", function () {
  let row = $(this).closest("tr"); // Seleccionar toda la fila y lo que este cerca a esa fila dentro del tr
  let id = row.find(".id").text(); // De los elementos cerca de tr, busca el que tenga la clase id y captura su contenido (El ID)

  // Función AJAX para eliminar el producto 1,2,3,n+.. (url dinamica)
  $.ajax({
    // concatenando el id para que la petición se haga al item 1,2,3,n+...
    url: "/products/" + id, // (id dinamica, elemento clickeado)
    method: "DELETE", // VERB METHOD (// DELETE debe ir en el servidor para que funcione (app.delete de index))
    success: function (response) {
      console.log("AJAX RESPONSE (DELETE)", response);
      $("#getProducts").click();
    },
  });
});
