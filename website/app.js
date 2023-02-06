//TODO:: client side code (make POST request to our route)
// Personal API Key for OpenWeatherMap APIs
const apiKey = "&appid=ae8fc70e67171dea11a063c3549a39d5&units=imperial";

/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const text = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
const btn = document.getElementById("generate");
btn.addEventListener("click", action);

/* Function called by event listener */
function action(event) {
  const zip = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;
  event.preventDefault();
  getApi(baseURL, zip, apiKey)
    .then((data) => {
      postData("/addData", {
        temp: data.main.temp,
        date: data.dt,
        feel: feel,
      });
    })
    .then(() => {
      updateUI();
    });
}

/* Function to GET Web API Data*/
const getApi = async (baseURL, zip, apiKey) => {
  const request = await fetch(`${baseURL}${zip}${apiKey}`);
  // const request = await fetch(`${baseURL}94040${apiKey}`);
  try {
    const getData = await request.json();
    return getData;
  } catch (Error) {
    console.log("Error! ", Error);
  }
};
/* Function to POST data */
const postData = async function (url, data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
  } catch (error) {
    console.log("error!", error);
  }
};

/* Function to GET Project Data */

//
const updateUI = async () => {
  const request = await fetch("/update");
  try {
    // Transform into JSON
    const lastData = await request.json();
    let targetData = lastData[lastData.length - 1];
    console.log(targetData);

    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = `${Math.round(
      targetData.temp,
    )} degrees`;
    d = new Date(targetData.date);
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("content").innerHTML = targetData.feel;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
