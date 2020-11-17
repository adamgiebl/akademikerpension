const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("page");
console.log(slug);

const detailPageURL =
  "https://javasquipt.com/wp-json/wp/v2/detail_page/?slug=" + slug;

window.addEventListener("DOMContentLoaded", fetchData);

const propertiesToFetch = [
  "title",
  "excerpt",
  "categories",
  "order",
  "_links",
  "_embedded",
  "slug",
];
//created this variable for easier use down below in the function.
const relatedCardsURL = `
  https://javasquipt.com/wp-json/wp/v2/detail_page?per_page=2&_fields=
    ${propertiesToFetch.join(",")}&_embed
`;

function fetchData() {
  fetch(detailPageURL)
    .then((res) => res.json())
    .then((detail) => {
      const singleDetailPageFromSearch = detail[0];
      showSingleDetail(singleDetailPageFromSearch);
      showAccordion(singleDetailPageFromSearch);
    });
  fetch(relatedCardsURL) // sending a request to the URL (the one from the variable above) to get the data.
    .then((res) => {
      // will run after the fetch comes back with the data. We are accepting the response in the parameter called "res".
      return res.json(); // we read the json data out of the response and return it into the next function.
    })
    .then((theReceivedCardsData) => {
      showRelatedCards(theReceivedCardsData);
    }); // will receive the json data and will work with it (e.g. loop through it and render the data).
}
const showRelatedCards = (relatedCards) => {
  relatedCards.forEach((singleRelatedCard) => {
    const template = document.querySelector("#card-template").content;
    const clone = template.cloneNode(true);
    const title = clone.querySelector("h2");
    title.textContent = singleRelatedCard.title.rendered;
    const shortDescription = clone.querySelector(".card p");
    shortDescription.innerHTML = singleRelatedCard.excerpt.rendered;
    clone.querySelector(".card .more-btn").href =
      "detail.html?page=" + singleRelatedCard.slug;
    const img_url =
      singleRelatedCard._embedded["wp:featuredmedia"][0].media_details.sizes
        .medium.source_url;
    clone.querySelector(".card img").src = img_url;
    clone.querySelector(".card").dataset.categoryid =
      singleRelatedCard.categories[0];
    document.querySelector(".related-cards-container").appendChild(clone);
  });
};

function showSingleDetail(detail) {
  //LOOP THROUGH
  console.log(detail);
  const title = document.querySelector(".page-heading");
  title.innerHTML = detail.title.rendered;

  const description = document.querySelector("#paragraph");
  description.innerHTML = detail.content.rendered;
  detail.content_card.forEach((card) => {
    const template = document.querySelector("#cardTemplate").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".content-card h3").textContent = card.post_title;

    clone.querySelector(".content-card p").innerHTML = card.post_content;

    if (card.button_label == "") {
      clone.querySelector(".content-card button").style.display = "none";
    } else {
      clone.querySelector(".content-card button").innerText = card.button_label;
    }

    document.querySelector("#content-cards-container").appendChild(clone);
  });
}

function showAccordion(detail) {
  //LOOP THROUGH
  detail.questions.forEach((q) => {
    const template = document.querySelector("#question-template").content;
    const copy = template.cloneNode(true);
    //accordion template
    copy.querySelector(".question p").textContent = q.post_title;
    copy.querySelector(".answer").innerHTML = q.post_content;
    document.querySelector(".accordion").appendChild(copy);
  });
  makeAccordionWork();
}

const makeAccordionWork = () => {
  document.querySelectorAll(".question").forEach((q) => {
    q.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const answerContentHeight = answer.scrollHeight;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answerContentHeight + "px";
      }
    });
  });
};
