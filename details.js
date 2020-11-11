const detailPage =
   "https://javasquipt.com/wp-json/wp/v2/detail_page/141";
 

window.addEventListener("DOMContentLoaded", showDetail);

// //SINGLE DETAIL
// const urlParams = new URLSearchParams(window.location.search);
// const singleDetail = urlParams.get("detail_page_id");

function showDetail() {
  fetch(detailPage)
  .then(res => res.json())
   .then(showSingleDetail) 
    // console.log("singleDetail");
}


function showSingleDetail(detail) {

  //SHOW TEXT FROM DATA

  //card-one
  const title = document.querySelector("h1");
  title.innerHTML = detail.title.rendered;

  const description = document.querySelector("h2");
  description.innerHTML = detail.content.rendered;
 

  const subtitle = document.querySelector("h3");
  subtitle.innerHTML = detail.content_card[0].post_title;

  const cardText = document.querySelector("p");
  cardText.innerHTML =  detail.content_card[0].post_content["wp:paragraph"]; //not displaying


  const button = document.querySelector("button");
  button.textContent = detail.content_card[0].button_label;

  //card-two
  subtitle.innerHTML = detail.content_card[1].post_title;
  cardText.innerHTML =  detail.content_card[1].post_content["wp:paragraph"];


}
   
  
 

