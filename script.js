const detailPage =
  "https://javasquipt.com/wp-json/wp/v2/detail_page?_embed=true&per_page=20";

window.addEventListener("DOMContentLoaded", subData);


function subData() {
  fetch(detailPage)
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => eachSubpage(data), 2000);
    });
}


function eachSubpage(data) {
  document.querySelectorAll(".skeleton-card").forEach((card) => {
    card.remove();
  });
  //console.log("data");
  //console.log(data);
  data.forEach(showSubpage);
}

function showSubpage(singleRowData) {
  //console.log("singleRowData - console");
  //console.log(singleRowData);

  // start template
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  // the content will go here
  const subtitle = clone.querySelector("h2");
  subtitle.textContent = singleRowData.title.rendered;
  //console.log(singleRowData.title.rendered);
  const shortDescription = clone.querySelector(".card p");
  shortDescription.innerHTML = singleRowData.excerpt.rendered;
  const button = clone.querySelector(".card button");
  const img_url =
    singleRowData._embedded["wp:featuredmedia"][0].media_details?.sizes?.medium
      .source_url;
  clone.querySelector(".card img").src = img_url || " ";

  // clone
  document.querySelector("main").appendChild(clone);
}
