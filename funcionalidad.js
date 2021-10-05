// Preparación de las variables de los divs

var botonMenu = document.getElementById("botonMenu");
var divMenu = document.getElementById("menu");
var cuerpo = document.getElementById("cuerpo");
var busquedaHecha = document.getElementById("busquedaHecha");
var divJuegoAbierto = document.getElementById("juegoAbierto");
var divProximamente = document.getElementById("proximamente");
var divUltimasNoticias = document.getElementById("ultimasNoticias");

// Funciones

function abrirMenu() {
  // Esta función tiene que desplegar el menu al clickar sobre las 3 rayitas de arriba a la derecha
  divMenu.style.display = "block";
  divJuegoAbierto.style.display = "none";
  document.getElementById("buscador").value = "";

}

function cerrarMenu() {
  // Esta función cierra el menú al clickar sobre la X
  divMenu.style.display = "none";
}

function inicio() {
  // Esta función devuelve al usuario a la página de inicio y esconde el resto
  divMenu.style.display = "none";
  busquedaHecha.style.display = "none";
  divJuegoAbierto.style.display = "none";
  cuerpo.style.display = "block";
  divProximamente.style.display = "none";
  divUltimasNoticias.style.display = "none";
  divJuegoAbierto.style.display = "none";
}

function abrirProximamente() {
  // Esta función esconde el resto de cosas y solo muestra los próximos torneos
  divJuegoAbierto.style.display = "none";
  busquedaHecha.style.display = "none";
  divMenu.style.display = "none";
  divJuegoAbierto.style.display = "none";
  cuerpo.style.display = "none";
  divProximamente.style.display = "block";
  divUltimasNoticias.style.display = "none";
  divJuegoAbierto.style.display = "none";
}

function abrirUltimasNoticias() {
  // Esta función esconde el resto de cosas y solo muestra las últimas notiicas
  divJuegoAbierto.style.display = "none";
  busquedaHecha.style.display = "none";
  divMenu.style.display = "none";
  divJuegoAbierto.style.display = "none";
  cuerpo.style.display = "none";
  divProximamente.style.display = "none";
  divUltimasNoticias.style.display = "block";
  divJuegoAbierto.style.display = "none";
}

function cerrarJuegoAbierto() {
  var div = document.getElementById("juegoAbierto");
  div = "";
  divJuegoAbierto.style.display = "none";
}

function cargarXMLOtros(xml, opcion) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarOtros(this, opcion);
    }
  };
  xhttp.open("GET", xml, true);
  xhttp.send();
}

function mostrarOtros(xml, opcion) {

  // Con un switch podemos reducir de las 2 funciones que usariamos a 1 sola:
  // Cada opción carga el xml y aplica una salida al html diferente.
  switch (opcion) {

    case "proximamente":
      abrirProximamente();
      var xmlDoc = xml.responseXML;
      var div = "";
      var items = xmlDoc.getElementsByTagName(opcion);
      for (i = 0; i < items.length; i++) {
        div +=
          "<table id='tablaProximamente'>" +
          "<tr><th><h1 class='titulosOtros'>" + items[i].getElementsByTagName("titulo")[0].childNodes[0].nodeValue + "</h1></th></tr>" +
          "<tr><td><p class='textoOtros'>" + items[i].getElementsByTagName("torneo1")[0].childNodes[0].nodeValue + "</p></td></tr>" +
          "<tr><td><p class='textoOtros'>" + items[i].getElementsByTagName("torneo2")[0].childNodes[0].nodeValue + "</p></td></tr>" +
          "<tr><td><p class='textoOtros'>" + items[i].getElementsByTagName("torneo3")[0].childNodes[0].nodeValue + "</p></td></tr>" +
          "<tr><td><p class='textoOtros'>" + items[i].getElementsByTagName("torneo4")[0].childNodes[0].nodeValue + "</p></td></tr>" +
          "</table>"
      }
      document.getElementById("proximamente").innerHTML = div;
      break;
    case "ultimasNoticias":
      abrirUltimasNoticias();
      var xmlDoc = xml.responseXML;
      var div = "";
      var items = xmlDoc.getElementsByTagName(opcion);
      for (i = 0; i < items.length; i++) {
        div +=
          "<h1 class='titulosOtros'>" + items[i].getElementsByTagName("titulo")[0].childNodes[0].nodeValue + "</h1>" +
          "<p class='textoOtros'>" + items[i].getElementsByTagName("noticia1")[0].childNodes[0].nodeValue + " - <a href='" + items[i].getElementsByTagName("link1")[0].childNodes[0].nodeValue + "' target='_blank'>Link ejemplo</a></p>" +
          "<p class='textoOtros'>" + items[i].getElementsByTagName("noticia2")[0].childNodes[0].nodeValue + " - <a href='" + items[i].getElementsByTagName("link2")[0].childNodes[0].nodeValue + "' target='_blank'>Link ejemplo</a></p>" +
          "<p class='textoOtros'>" + items[i].getElementsByTagName("noticia3")[0].childNodes[0].nodeValue + " - <a href='" + items[i].getElementsByTagName("link3")[0].childNodes[0].nodeValue + "' target='_blank'>Link ejemplo</a></p>" +
          "<p class='textoOtros'>" + items[i].getElementsByTagName("noticia4")[0].childNodes[0].nodeValue + " - <a href='" + items[i].getElementsByTagName("link4")[0].childNodes[0].nodeValue + "' target='_blank'>Link ejemplo</a></p>"
      }
      document.getElementById("ultimasNoticias").innerHTML = div;
      break;
  }
}

// Sección de mostrar el juego

function cargarXMLJuego(xml, juego) {  // Esta es la función que vamos a usar para cargar el XML en la web.
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarJuego(this, juego);  // Al llamar a la función para mostrar, directamente es la de carga, no hace falta poner ambas a la vez en el html.
    }
  };
  xhttp.open("GET", xml, true); // "xml" es el archivo XML que vamos a usar para enseñar los datos en la web. Si se cambia el nombre del archivo hay que cambiar este también.
  xhttp.send();
}

function mostrarJuego(xml, juego) { // Con esta función enseñamos lo que contiene nuestro XML de datos.
  divJuegoAbierto.style.display = "block";
  divMenu.style.display = "none";
  var xmlDoc = xml.responseXML;
  var div = "";
  var items = xmlDoc.getElementsByTagName(juego);  // "juego" es la etiqueta de la que vamos a obtener los datos del XML, si cambia de nombre en el XML hay que cambiar esta también, en nuestro caso, una variable que depende de la imagen clickada en cada momento.
  for (i = 0; i < items.length; i++) { // Recorremos la etiqueta "juego" de modo que vayamos desplazándonos por sus etiquetas hijas.
    div += // La variable div = lo que haya de antes + los nuevos valores. De esta forma, se repita las veces que se repita la etiqueta "item", se almacenará toda la información

      // Explicación: Lo que vamos a guardar es literamente, lo que se va a mostrar en el html, de modo que, si queremos que muestre párrafos o imágenes, hay que escribirlo como si estuviésemos haciéndolo en html.
      // Todo lo que vaya entre "" será leído por html de forma literal, luego usamos los "+" para agregar elementos a la variable, como si fuese una cadena normal de texto+elementos.
      // Ejemplo: "texto literal leído por html"+variables/funciones/métodos de javascrip+"más código que html lee de forma literal"

      "<img src='recursos/equis.png' id='equisCerrarJuegoAbierto' class='clickable' onclick='cerrarJuegoAbierto()'>" +
      "<table id='tablaJuegoAbierto'>" +
      "<tr><th colspan='2'>" + items[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue + "</th></tr>" + // En este caso, usamos la variable items, que hemos indexado en la linea 13, que posee la información de la etiqueta "item" del XML
      "<tr><td colspan='2'><p>Fecha de lanzamiento: " + items[i].getElementsByTagName("fecha-lanzamiento")[0].childNodes[0].nodeValue + "</p></td></tr>" + // Con getElementsByTagName le decimos a javascript que coja lo que hay dentro de la etiqueta que especificamos.
      "<tr><td rowspan='2'>" + items[i].getElementsByTagName("descripcion")[0].childNodes[0].nodeValue + "</td>" + // Como se puede observar, el código html está escrito entre comillas
      "<td><iframe width='560' height='315' src='" + items[i].getElementsByTagName("ranking-actual")[0].childNodes[0].nodeValue + "' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></td></tr>" + // Y lo que conseguimos al usar los "+" es que dentro del código de html aparezcan los datos del propio XML
      "<td colspan='2'><iframe src='" + items[i].getElementsByTagName("trailer")[0].childNodes[0].nodeValue + "'</iframe></td></tr>" +
      "</table>"
  }
  document.getElementById("juegoAbierto").innerHTML = div;
}

function cargarCuerpo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarCuerpo(this);
    }
  };
  xhttp.open("GET", 'datos.xml', true);
  xhttp.send();
}

function mostrarCuerpo(xml) { // Función que te carga todos los juegos que haya en el xml, si introduces más, carga más, cada uno con sus links, imágenes, etc.
  var xmlDoc = xml.responseXML;
  var juegos = xmlDoc.getElementsByTagName("todosJuegos");
  var div = "<ul class='games'>";
  for (var i = 0; i < juegos[0].getElementsByTagName("imagen").length; i++) {
    div += "<li><img class='clickable' src='" + juegos[0].getElementsByTagName("imagen")[i].childNodes[0].nodeValue + "' alt='lol' onclick=\"cargarXMLJuego(\'datos.xml','" + juegos[0].getElementsByTagName("identificador")[i].childNodes[0].nodeValue + "')\"></li>"
  }
  div += "</ul>";
  document.getElementById("cuerpo").innerHTML = div;
}

function buscador() { // Esta función esconde el cuerpo y el menú si has introducido algo en el buscador y manda la palabra que has usado de búsqueda a la función de búsqueda
  var buscar = document.getElementById("buscador").value; // Recoge el valor introducido en el buscador
  if (buscar != "") {
    divMenu.style.display = "none";
    cuerpo.style.display = "none";
    busquedaHecha.style.display = "block";
    cargarBusqueda(buscar); // Función para cargar el contenido resultado de la búsqueda
  }
}

function cargarBusqueda(busqueda) { //  Lee el xml y aplica la función que filtra el resultado para mostrarlo
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarBusqueda(this, busqueda);
    }
  };
  xhttp.open("GET", 'datos.xml', true);
  xhttp.send();
}

function mostrarBusqueda(xml, busqueda) { // Función que usa la búsqueda y el xml para filtrar el contenido a mostrar
  var xmlDoc = xml.responseXML;
  var juegos = xmlDoc.getElementsByTagName("todosJuegos");
  busqueda = busqueda.toLowerCase(); // Para asegurarnos que coincide con una de las etiquetas de búsqueda, lo pasamos siempre a minúsculas.
  var div = "<ul class='games'>";
  var encuentra = 0;
  for (var i = 0; i < juegos[0].getElementsByTagName("etiquetas").length; i++) { // Esta función lee tantos hijos como etiquetas "etiquetas" haya dentro de "todosJuegos"
    if (juegos[0].getElementsByTagName("etiquetas")[i].childNodes[0].nodeValue.match(busqueda)) { // Este condicional evalua cada texto en la etiqueta "etiquetas" al texto introducido en el buscador
      //  Si encuentra alguna etiqueta que coincida con el texto que buscamos, lo muestra
      div += "<li><img class='clickable' src='" + juegos[0].getElementsByTagName("imagen")[i].childNodes[0].nodeValue + "' alt='lol' onclick=\"cargarXMLJuego(\'datos.xml','" + juegos[0].getElementsByTagName("identificador")[i].childNodes[0].nodeValue + "')\"></li>";
      encuentra++; // Como el "if" que comprueba si ha encontrado alguna coincidencia tiene que ir fuera del "for", para que no salga el mismo mensaje tantas veces como juegos haya, creamos una variable que se sume cada vez que encuentre una coincidencia.
    }
  }
  if (encuentra == 0) { // Si no ha encontrado coincidencia, nos lo dice y nos permite volver al inicio normal
    div += "<li><p> No se ha encontrado ningún juego.</p><br><button id='busquedaFallida' onclick='inicio()'>Volver al inicio</button></li>";
  }
  div += "</ul>";
  encuentra = 0; // Reiniciamos la variable para que no haya problemas en siguientes búsquedas.
  document.getElementById("busquedaHecha").innerHTML = div;
}