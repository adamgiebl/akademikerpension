// importing functions for skeleton loading
import { populateSkeleton, removeSkeleton } from "./skeleton.js";

// limiting fetch to specified properties to avoid fetching unnecessary data
const propertiesToFetch = [
  "title",
  "excerpt",
  "categories",
  "order",
  "_links",
  "_embedded",
  "slug",
];

const getPagesUrl = `
  https://javasquipt.com/wp-json/wp/v2/detail_page?per_page=20&_fields=
    ${propertiesToFetch.join(",")}&_embed
`;

const fetchData = () => {
  populateSkeleton(14);
  fetch(getPagesUrl)
    .then((res) => res.json())
    .then((data) => {
      dataFetched(data);
    });
};

const dataFetched = (data) => {
  // removing skeleton loading cards
  removeSkeleton();

  // fetching categories for filtering
  fetchCategories();

  // sorting by order
  data.sort(sortingFunction);

  // rendering each card
  data.forEach(renderCard);
};

function renderCard(singleRowData) {
  // clone template
  const template = document.querySelector("#card-template").content;
  const clone = template.cloneNode(true);
  // the content will go here
  const subtitle = clone.querySelector("h2");
  subtitle.textContent = singleRowData.title.rendered;
  const shortDescription = clone.querySelector(".card p");
  shortDescription.innerHTML = singleRowData.excerpt.rendered;
  clone.querySelector(".card .more-btn").href =
    "detail.html?page=" + singleRowData.slug;
  const img_url =
    singleRowData._embedded["wp:featuredmedia"][0].media_details.sizes.medium
      .source_url;
  clone.querySelector(".card img").src = img_url || " ";
  clone.querySelector(".card").dataset.categoryid = singleRowData.categories[0];

  // appending the clone
  document.querySelector("main").appendChild(clone);
}

const fetchCategories = () => {
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
        enableCategorySwitching();
      });
    });
};

const enableCategorySwitching = () => {
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

const sortingFunction = (a, b) => {
  const item1 = Array.isArray(a.order) ? 0 : parseInt(a.order);
  const item2 = Array.isArray(b.order) ? 0 : parseInt(b.order);
  if (item1 < item2) {
    return 1;
  }
  if (item1 > item2) {
    return -1;
  }
  // names must be equal
  return 0;
};

window.addEventListener("DOMContentLoaded", fetchData);
