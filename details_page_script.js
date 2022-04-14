window.onload = () => {
  settingUpTheDetailsPage();
};

const URLAPI = "https://striveschool-api.herokuapp.com/api/product/";
const eventId = new URLSearchParams(window.location.search).get("userId");
console.log(eventId);

let settingUpTheDetailsPage = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
    },
  };
  const response = await fetch(URLAPI + eventId, options);
  const body = await response.json();
  console.log(body);

  let newCol = document.querySelector(".newcol");
  newCol.innerHTML = `        
        <div class="col-12 newcol">
        <h1 class="display-4">${body.name}</h1>
        <p>${body.description}</p>
        <p class="text-monospace">${body.brand}</p>
        <h3 class="mb-4">$${body.price}</h3>
        <h6 class="bg-ligth py-3 pl-2">${body.userId}</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item pl-2">${body.createdAt}</li>
            <li class="list-group-item pl-2">${body.updatedAt}</li>
            <li class="list-group-item pl-2"></li>
        </ul>
        <button type="button" class="btn btn-secondary" onclick="editButtonFunction(event)">Edit product</button>
        </div>`;
};

let editButtonFunction = (event) => {
  console.log(event);
  window.location.assign(`./backend_page.html?userId=${eventId}`);
};
