export const populateSkeleton = (number) => {
  const skeletonCard = document.querySelector("#skeleton-card");
  for (let i = 0; i < number; i++) {
    const copy = skeletonCard.cloneNode(true).content;
    document.querySelector("main").appendChild(copy);
  }
};

export const removeSkeleton = () => {
  document.querySelectorAll(".skeleton-card").forEach((card) => {
    card.remove();
  });
};
