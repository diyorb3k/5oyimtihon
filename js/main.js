const wrap = document.querySelector(".wraper");
const inputVal = document.querySelector("#inputVal");
const API_url = "https://restcountries.com/v3.1/all";
const selectElement = document.querySelector("#selectedRegion");
let countriesData = [];
async function fetchData(api) {
  try {
    const response = await fetch(api);
    if (!response.ok)
      throw new Error(`HTTP xatosi! Status: ${response.status}`);
    const data = await response.json();
    countriesData = data;
    displayCards(countriesData);
  } catch (error) {
    console.error("Ma'lumotlarni olishda xato:", error);
    wrap.innerHTML =
      "<p>Ma'lumotlarni olishda xato. Keyinroq qayta urinib ko'ring.</p>";
  }
}

fetchData(API_url);

function displayCards(data) {
  wrap.innerHTML = "";
  if (!data || data.length === 0) {
    wrap.innerHTML = "<p>Davlatlar topilmadi.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach((el) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card">
        <img src="${
          el.flags.png
        }" width="267px" height="160px" alt="Flag"> <!-- Bayroq -->
        <div style="padding: 20px">
          <h1>${el.name.official.slice(0, 40)}...</h1> <!-- Rasmiy nomi -->
          <p><strong>Population:</strong> ${el.population}</p> <!-- Aholisi -->
          <p><strong>Region:</strong> ${el.region}</p> <!-- Hududi -->
          <p><strong>Capital:</strong>${
            el.capital ? el.capital.join(", ") : "Ma'lumot yo'q"
          }</p> <!-- Poytaxti -->
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });
  wrap.appendChild(fragment);
}

inputVal.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredData = countriesData.filter((country) =>
    country.name.official.toLowerCase().includes(query)
  );
  displayCards(filteredData);
});

selectElement.addEventListener("change", (event) => {
  const selectedRegion = event.target.value;
  if (selectedRegion) {
    const filteredData = countriesData.filter(
      (country) => country.region === selectedRegion
    );
    displayCards(filteredData);
  } else {
    displayCards(countriesData);
  }
});

const body = document.body;
const darkmode = document.querySelector("#dark");
darkmode.addEventListener("click", () => {
  body.classList.toggle("darkmode");
});

fetchData(API_url);
