const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("page");
console.log(slug);

const detailPage =
  "https://javasquipt.com/wp-json/wp/v2/detail_page/?slug=" + slug;

window.addEventListener("DOMContentLoaded", showDetail);

function showDetail() {
  fetch(detailPage)
    .then((res) => res.json())
    .then((detail) => {
      const singleDetailPageFromSearch = detail[0];
      showSingleDetail(singleDetailPageFromSearch);
      showAccordion(singleDetailPageFromSearch);
    });
}

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
