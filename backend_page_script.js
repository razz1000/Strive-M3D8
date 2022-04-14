const URLAPI = "https://striveschool-api.herokuapp.com/api/product/";
const eventId = new URLSearchParams(window.location.search).get("userId");
console.log(eventId);
const method = eventId ? "PUT" : "POST";

const endPoint = eventId ? URLAPI + eventId : URLAPI;

window.onload = async () => {
  if (eventId) {
    console.log("resource ID: " + eventId);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
      },
    };

    const response = await fetch(endPoint, options);
    const {
      name,
      imageUrl,
      brand,
      description,
      price,
      _id,
      createdAt,
      updatedAt,
    } = await response.json();

    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("brand").value = brand;
    document.getElementById("image").value = imageUrl;
    document.getElementById("price").value = price;

    const submitButton = document.querySelector(".submitbutton");
    submitButton.innerText = "Edit";
  }
};

let formOnSubmitFunction = async (event) => {
  console.log(event.target);
  event.preventDefault();
  buttonLoadingFunction(true);
  const theCurrentFormEvent = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value,
  };

  const response = await fetch(endPoint, {
    method: method,
    body: JSON.stringify(theCurrentFormEvent),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
    },
  });

  if (response.ok || eventId) {
    const body = await response.json();

    buttonLoadingFunction(false);

    alert("You just edited : " + body._id);
    console.log(response);
    window.location.assign("./frontend_page.html");
  } else {
    alert(
      "You have just posted a new itme in the store with this id: " + body._id
    );
    window.location.assign("./frontend_page.html");
  }
};

/* The delete button */
const options2 = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
  },
};

let deleteEventButton = async (event) => {
  console.log(event.target);

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + eventId,
    options2
  );

  const parsedBody = await response.json();
  console.log(parsedBody);

  alertContainer(
    "You successfully deleted the product, with the following ID: " + eventId
  );
  setTimeout(() => {
    window.location.assign("./frontend_page.html");
  }, 2500);
};

/* The Validate event */
let validateEvent = (event) => {
  console.log(event.target.parentElement.querySelector(".form1"));
  document.querySelector(".form1").classList.add("validated");
};

/* The Loading Button  */

let buttonLoadingFunction = (loadinstate) => {
  const submitbutton = document.querySelector(".submitbutton");
  if (loadinstate) {
    submitbutton.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  } else {
    submitbutton.querySelector(".spinner-border").remove();
  }
};

let alertContainer = (msg) => {
  let alertContainer = document.querySelector(".alert-container");

  alertContainer.innerHTML = `<div class="alert alert-danger" role="alert">${msg}
</div>`;
};
