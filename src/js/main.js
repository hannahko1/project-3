var ul = document.querySelector("ul");
var items = [];
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

function addDetailCardToLightbox() {
  const i = parseInt(this.dataset.index);
  const item = items[i];
  console.log(item.brand);
  var li = document.createElement("div");
}

fetch(
  "https://gist.githubusercontent.com/ansipes/83bdf58ddc726d90b79e7ca28a2f6f11/raw/ec41aad00a67caddd40044ce6195b4a7dcfd7c8f/products.json"
)
  .then((response) => response.json())
  .then((data) => {
    items = data;
    items.forEach((item, index) => {
      var li = document.createElement("li");
      li.addEventListener("click", addDetailCardToLightbox);
      li.dataset.index = index;
      li.innerHTML = `
                <h1>${item.name}</h1>
                <p>${item.description}</p>
                <ul>
                    ${item.tag_list.map((tag) => `<li>${tag}</li>`).join("")}
                </ul>`;
      ul.appendChild(li);
    });
  });
