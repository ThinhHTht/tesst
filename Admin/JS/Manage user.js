// const userList = document.querySelector(".table");
// const getList = JSON.parse(localStorage.getItem("userData"));
// let stt = 0;
// function renderUser() {
//   for (let i = 0; i < getList.length; i++) {
//     stt += 1;
//     let value = getList[i];
//     let newTr = document.createElement("tr");
//     newTr.classList.add("user");
//     newTr.innerHTML = `
//         <td>${stt}</td>
//         <td>${value.id}</td>
//         <td>${value.username}</td>
//         <td>${value.email}</td>
//         <td><button onclick="deleteUser(${i})" >Delete</button></td>
//         `;
//     userList.appendChild(newTr);
//   }
// }
// renderUser();

// function deleteUser(index) {
//   getList.splice(index, 1);
//   localStorage.setItem("userData", JSON.stringify(getList));
//   renderUser();
// }
