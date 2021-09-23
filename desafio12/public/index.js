const socket = io();

function enviar() {
  let title = document.getElementsByTagName("input")[0];
  let price = document.getElementsByTagName("input")[1];
  let thumbnail = document.getElementsByTagName("input")[2];
  let item = {
    Title: title.value,
    Price: price.value,
    Thumbnail: thumbnail.value,
  };
  socket.emit("item", item);
  title.value = "";
  price.value = "";
  thumbnail.value = "";
  return false;
}
socket.on("items", (data) => {
  render(data);
});

function render(dato) {
  var html = dato
    .map((element) => {
      return `
            <tr>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td><img height="50px" width="50px" style="object-fit: cover;" src=${element.thumbnail} /></td>
            </tr>
        `;
    })
    .join(" ");
  document.getElementById("tbody").innerHTML = html;
}
