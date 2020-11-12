const skeletonCard = document.querySelector("#skeleton-card");

const populateSkeleton = (number) => {
  for (let i = 0; i < number; i++) {
    const copy = skeletonCard.cloneNode(true).content;
    document.querySelector("main").appendChild(copy);
  }
};

populateSkeleton(10);

fetch("https://javasquipt.com/wp-json/wp/v2/categories")
  .then((resp) => resp.json())
  .then((categoriesData) => {
    dataReceived(categoriesData);
  });
//creating a variable called dataReceived and putting a function into it.
//that function takes "categoriesData" as its parameter.
const dataReceived = (categories) => {
  categories.forEach((category) => {
    console.log("This is a category", category);
    console.log(category.name);
    const template = document.querySelector("#categoryTemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".category").textContent = category.name;
    document.querySelector(".category-switcher").appendChild(copy);
  });

  /*when we click on a button with the class of "category" we want it to become
  active aka green in our case*/

  //selecting all the buttons
  const categoryButtons = document.querySelectorAll(".category");

  //console.log(buttons);
  categoryButtons.forEach((singleButton) => {
    singleButton.addEventListener("click", () => {
      singleButton.classList.toggle("active");
    });
  });
};
