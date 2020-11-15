const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get("id");
console.log(pageId);

const detailPage = "https://javasquipt.com/wp-json/wp/v2/detail_page/" + pageId;

window.addEventListener("DOMContentLoaded", showDetail);


function showDetail() {
  fetch(detailPage)
    .then((res) => res.json())
    .then(showSingleDetail);
}

function showSingleDetail(detail) {
  //LOOP THROUGH
console.log(detail)
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

function showSingleDetail(accQuestions) {
  //LOOP THROUGH
  accQuestions.questions.forEach((questionData) => {
    const template = document.querySelector("#accordion-template").content;
    const copy = template.cloneNode(true);

    //accordion template
   copy.querySelector(".question").textContent = questionData.questions;

 document.querySelector("#accordion").appendChild(copy);

  });
}

  

