let formOnSubmitFunction = async (event) => {
  console.log(event.target);
  event.preventDefault();

  const theCurrentFormEvent = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value,
  };

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      method: "POST",
      body: JSON.stringify(theCurrentFormEvent),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU2YmNiZmE5MDIzOTAwMTVkOTY1YzYiLCJpYXQiOjE2NDk4NTE1ODMsImV4cCI6MTY1MTA2MTE4M30.1jc7LN9eMX4yZ7HWl4wazVJ2SyiKUzAHtFm0IglDnhY",
      },
    }
  );

  if (response.ok) {
    const body = await response.json();

    alert(
      "You have just posted a new itme in the store with this id: " + body._id
    );
    console.log(response);
  }
  window.location.reload();
};
