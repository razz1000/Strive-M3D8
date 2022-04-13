const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
  },
};

let frontendFunction = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    options
  );
  const parsedBody = await response.json();
  console.log(parsedBody);

  let listgroup = document.querySelector(".list-group");

  listgroup.innerHTML = "";
  parsedBody.forEach((userinput) => {
    let li1 = document.createElement("li");
    li1.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h2 class="unique-name">${userinput.name}</h2>
                <p>Brand: ${userinput.brand}</p>
                <p>Description: ${userinput.description}</p>
                <p><a href="${userinput.imageUrl}">Link to an image of the product</a></p>
                <p class="unique-id">${userinput._id}</p>
                <small>Created at: ${userinput.createdAt}</small>
                
              </div>
              <div>
              <span class="badge badge-primary badge-pill">$${userinput.price}</span>
              <i class="bi bi-trash3-fill delete-button" onclick="deleteButtonFunction(event)"></i>
              </div>
            </li>`;
    listgroup.appendChild(li1);
  });
};

window.onload = () => {
  frontendFunction();
};

/* THE DELETE BUTTON FUNCTION */

const options2 = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
  },
};

let deleteButtonFunction = async (event) => {
  console.log(
    event.target.parentElement.parentElement.querySelector(".unique-id")
      .innerText
  );
  let uniqueId =
    event.target.parentElement.parentElement.querySelector(
      ".unique-id"
    ).innerText;
  let uniqueProductName =
    event.target.parentElement.parentElement.querySelector(
      ".unique-name"
    ).innerText;

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + uniqueId,
    options2
  );
  const parsedBody = await response.json();
  console.log(parsedBody);

  alert(
    uniqueProductName +
      " has now been deleted. " +
      "This was the uniqueID: " +
      uniqueId
  );
  window.location.reload();
};
