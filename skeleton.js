const skeletonCard = document.querySelector("#skeleton-card");

const populateSkeleton = (number) => {
  for (let i = 0; i < number; i++) {
    const copy = skeletonCard.cloneNode(true).content;
    document.querySelector("main").appendChild(copy);
  }
};

populateSkeleton(10);

fetch("https://javasquipt.com/wp-json/wp/v2/categories")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((arrayOfCategories) => {
    console.log(arrayOfCategories);
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
      console.log("before modifying", clone);
      clone.querySelector(".category").textContent = singleCategory.name;
      console.log("after modifying", clone);
      document.querySelector(".category-switcher").appendChild(clone);
    });
  });
