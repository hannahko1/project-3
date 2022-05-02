var ul = document.querySelector("ul");
var items = [];
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.addEventListener("click", function () {
  this.style.display = "none";
});
document.body.appendChild(lightbox);

// Interior Card //

function addDetailCardToLightbox() {
  lightbox.innerHTML = "";
  const i = parseInt(this.dataset.index);
  const item = items[i];
  console.log(item.brand);
  var div = document.createElement("div");
  div.innerText = item.brand;
  div.className = "card";
  lightbox.appendChild(div);
  lightbox.style.display = "flex";
}

// Exterior Card //
fetch("/api/products.json")
  .then((response) => response.json())
  .then((data) => {
    items = data;
    items
      .filter((item) => item.description)
      .sort((a, b) => {
        if (b.product_type.toLowerCase() > a.product_type.toLowerCase()) {
          return -1;
        } else if (
          a.product_type.toLowerCase() > b.product_type.toLowerCase()
        ) {
          return 0;
        }
        return 0;
      })
      .forEach((item, index) => {
        var li = document.createElement("li");
        var image = new Image();
        li.addEventListener("click", addDetailCardToLightbox);
        li.dataset.index = index;
        li.innerHTML = `
                <h1>${item.name}</h1>
                <h2>${item.product_type}</h2>
                <img src=${item.image_link}>
                `;
        ul.appendChild(li);
      });
  });

//   <p>${item.description}</p>

{
  /* <ul>
  ${item.tag_list.map((tag) => `<li>${tag}</li>`).join("")}
</ul> */
}
