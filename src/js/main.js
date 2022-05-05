const base = window.location.href.includes("github.io")
  ? `/${window.location.pathname.split("/")[1]}`
  : "";
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
  const id = parseInt(this.dataset.id);
  const item = items.find((i) => i.id === id);
  console.log(item.brand);
  var div = document.createElement("div");
  div.innerHTML = `
                <h3>${item.brand}</h3>
                <a href="${item.website_link}"><img src=${item.image_link} width="260" height="260"></a>
                <h4>${item.name}</h4>
                <h5>${item.product_type}</h5>
                <p>${item.description}</p>
                <ul>
                `;
  div.className = "card";
  lightbox.appendChild(div);
  lightbox.style.display = "flex";
}

// Exterior Card //
fetch(`${base}/api/products.json`)
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
        li.dataset.id = item.id;
        li.innerHTML = `
                <h1>${item.name}</h1>
                <h2>${item.product_type}</h2>
                <img src=${item.image_link}>
                `;
        ul.appendChild(li);
      });
  });

/* <ul>
  ${item.tag_list.map((tag) => `<li>${tag}</li>`).join("")}
</ul> */
