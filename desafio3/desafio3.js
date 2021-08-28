let mostrarPalabras = (texto, delay = 1000, callback) => {
    let i = 0;
    let array = texto.split(" ");
    let idInterval = setInterval(
        ()=>{
            if (i === array.length - 1){
                console.log(array[i])
                clearInterval(idInterval);
                callback(i);
            } else {
                console.log(array[i++])
            }
    }, delay);
}
 

mostrarPalabras("Lorem ipsum dolor sit", 500, (n) => {
    let total = n + 1;
    mostrarPalabras("elit sed tempor", 200, (suma) => {
      total += suma + 1;
      mostrarPalabras(
        "incididunt ut laboreelit sed do eiusmod",
        200,
        (added) => {
          total += added + 1;
          setTimeout(() => {
            console.log(`Proceso completo ${total}`);
          }, 500);
        }
      );
    });
  });
