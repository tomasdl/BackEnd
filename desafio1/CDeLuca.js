class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return console.log(this.nombre, this.apellido);
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  getMascotas() {
    return console.log(this.mascotas.length);
  }
  addBook(book, autor) {
    this.libros.push({ nombre: book, autor: autor });
  }
  getBooks() {
    return console.log(this.libros.map((el) => el.nombre));
  }
}

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
usuario.addMascota("tigre");
usuario.getMascotas();
usuario.addBook("Harry Potter", "J.K.Rowling");
usuario.addBook("Spider-Man", "Stan Lee");
usuario.getBooks();
console.log(usuario);
