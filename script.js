const detailPage =
  "https://javasquipt.com/wp-json/wp/v2/detail_page?_embed=true&per_page=20";

window.addEventListener("DOMContentLoaded", subData);

function subData() {
  fetch(detailPage)
    .then((res) => res.json())
    .then((data) => {
      eachCard(data);
    });
}

function eachCard(data) {
  document.querySelectorAll(".skeleton-card").forEach((card) => {
    card.remove();
  });
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
    singleRowData._embedded["wp:featuredmedia"][0].media_details?.sizes?.medium
      .source_url;
  clone.querySelector(".card img").src = img_url || " ";
  clone.querySelector(".card").dataset.categoryId = singleRowData.categories[0];

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
      // <button class="category"></button>
      clone.querySelector(".category").textContent = singleCategory.name;
      clone.querySelector(".category").dataset.categoryId = singleCategory.id;
      document.querySelector(".category-switcher").appendChild(clone);
      makeCategorySwitcherWork();
    });
  });

const makeCategorySwitcherWork = () => {
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", () => {
      document.querySelectorAll(".category").forEach((cat) => {
        cat.classList.remove("active");
      });
      category.classList.add("active");
      if (category.dataset.all) {
        document.querySelectorAll(".card").forEach((card) => {
          card.style.display = "flex";
        });
        return;
      }

      document.querySelectorAll(".card").forEach((card) => {
        card.style.display = "none";
      });
      document
        .querySelectorAll(
          `.card[data-category-id="${category.dataset.categoryId}"]:not([data-category-id="6"])`
        )
        .forEach((card) => {
          card.style.display = "flex";
        });
    });
  });
};
