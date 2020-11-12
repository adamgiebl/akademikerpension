const skeletonCard = document.querySelector("#skeleton-card");

const populateSkeleton = (number) => {
  for (let i = 0; i < number; i++) {
    const copy = skeletonCard.cloneNode(true).content;
    document.querySelector("main").appendChild(copy);
  }
};

populateSkeleton(10);
