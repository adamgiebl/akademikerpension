const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get("id");
console.log(pageId);

const detailPage = "https://javasquipt.com/wp-json/wp/v2/detail_page/" + pageId;

window.addEventListener("DOMContentLoaded", showDetail);

// //SINGLE DETAIL
// const urlParams = new URLSearchParams(window.location.search);
// const singleDetail = urlParams.get("detail_page_id");

function showDetail() {
  fetch(detailPage)
    .then((res) => res.json())
    .then(showSingleDetail);
}

function showSingleDetail(detail) {
  //LOOP THROUGH

  detail.content_card.forEach((card) => {
    const template = document.querySelector("#cardTemplate").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".card-one h3").textContent = card.post_title;

    clone.querySelector(".card-one p").innerHTML = card.post_content;

    if (card.button_label == "") {
      clone.querySelector(".btn").style.display = "none";
    } else {
      clone.querySelector(".btn button").innerText = card.button_label;
    }

    document.querySelector("#container").appendChild(clone);
  });

  //SHOW TEXT FROM DATA

  //   //card-one
  const title = document.querySelector("h1");
  title.innerHTML = detail.title.rendered;

  const description = document.querySelector("#paragraph");
  description.innerHTML = detail.content.rendered;
  //  console.log(detail)

  //   const subtitle = document.querySelector(".card-one h3");
  //   subtitle.innerHTML = detail.content_card[0].post_title;

  //   const cardText = document.querySelector(".card-one p");
  //   cardText.innerHTML =  detail.content_card[0].post_content; //not displaying

  //   const button = document.querySelector("button");
  //   button.textContent = detail.content_card[0].button_label;

  //   //card-two
  //    document.querySelector(".card-two h3").innerHTML = detail.content_card[1].post_title;
  //    document.querySelector(".card-two p").innerHTML =  detail.content_card[1].post_content;
}
