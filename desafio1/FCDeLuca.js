function Usuario(nombre, apellido, libros, mascotas) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.libros = libros;
  this.mascotas = mascotas;
}
Usuario.prototype.getFullName = function () {
  return console.log(`${this.nombre} ${this.apellido}`);
};
Usuario.prototype.addMascota = function (mascotas) {
  this.mascotas.push(mascotas);
};
Usuario.prototype.getMascotas = function () {
  return console.log(this.mascotas.length);
};
Usuario.prototype.addBook = function (book, autor) {
  this.libros.push({ nombre: book, autor: autor });
};
Usuario.prototype.getBooks = function () {
  return console.log(this.libros.map((elem) => elem.nombre));
};
let usuario = new Usuario(
  "juan",
  "perez",
  [
    { nombre: "El Hobbit", autor: "Tolkien" },
    { nombre: "El Alquimista", autor: "Paulo coelho" },
  ],
  ["perro", "gato", "jirafa"]
);
usuario.getFullName();
usuario.addMascota("leon");
usuario.addMascota("mammut");
usuario.getMascotas();
usuario.addBook("Harry Potter", "J.K.Rowling");
usuario.addBook("Spider-Man", "Stan Lee");
usuario.getBooks();
console.log(usuario);
