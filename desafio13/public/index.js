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

function addMessage(e) {
  let mensaje = {
    email: document.getElementById("email").value,
    time: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
    text: document.getElementById("texto").value,
  };
  socket.emit("newMsg", mensaje);
  return false;
}
sockets.on("messages", function (data) {
  rendered(data);
});

function rendered(data) {
  // console.log(data);
  let html = data
    .map((elem) => {
      return `<div>
  <strong class="useremail"> ${elem.email}</strong>:
  <span class="usertime">${elem.time}</span>
  <em class="usertext">${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("message").innerHTML = html;
}

socket.on("items", (data) => {
  render(data);
});

function render(dato) {
  let html = dato
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
