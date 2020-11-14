import { populateSkeleton, removeSkeleton } from "./skeleton.js";

const detailPage =
  "https://javasquipt.com/wp-json/wp/v2/detail_page?_embed=true&per_page=20";

window.addEventListener("DOMContentLoaded", subData);

function subData() {
  populateSkeleton(10);
  fetch(detailPage)
    .then((res) => res.json())
    .then((data) => {
      eachCard(data);
    });
}

function eachCard(data) {
  removeSkeleton();
  data.forEach(showCard);
}

function showCard(singleRowData) {
  // start template
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  // the content will go here
  const subtitle = clone.querySelector("h2");
  subtitle.textContent = singleRowData.title.rendered;
  const shortDescription = clone.querySelector(".card p");
  shortDescription.innerHTML = singleRowData.excerpt.rendered;
  clone.querySelector(".card .more-btn").href =
    "detail.html?id=" + singleRowData.id;
  const img_url =
    singleRowData._embedded["wp:featuredmedia"][0].media_details.sizes.medium
      .source_url;
  clone.querySelector(".card img").src = img_url || " ";
  clone.querySelector(".card").dataset.categoryid = singleRowData.categories[0];

  // clone
  document.querySelector("main").appendChild(clone);
}

fetch("https://javasquipt.com/wp-json/wp/v2/categories")
  .then((response) => {
    return response.json();
  })
  .then((arrayOfCategories) => {
    arrayOfCategories.forEach((singleCategory) => {
      // if the single category has the id of 1, which is for us "uncategorized",
      // then the function will return and stop running, going to
      // the next iteration (job, family, etc)
      if (singleCategory.id === 1) {
        return;
      }
      const template = document.querySelector("#categoryTemplate").content;
      const clone = template.cloneNode(true);

      clone.querySelector(".category").textContent = singleCategory.name;
      clone.querySelector(".category").dataset.id = singleCategory.id;
      document.querySelector(".category-switcher").appendChild(clone);
      makeCategorySwitcherWork();
    });
  });

const makeCategorySwitcherWork = () => {
  document.querySelectorAll(".category").forEach((categoryButton) => {
    categoryButton.addEventListener("click", (event) => {
      const clickedCategory = event.target;
      document.querySelectorAll(".category").forEach((cat) => {
        if (cat.dataset.id === clickedCategory.dataset.id) {
          cat.classList.add("active");
        } else {
          cat.classList.remove("active");
        }
      });
      document.querySelectorAll(".card").forEach((card) => {
        if (
          clickedCategory.dataset.showall ||
          card.dataset.categoryid === clickedCategory.dataset.id
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
};
