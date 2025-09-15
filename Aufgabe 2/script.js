// create child element named ad
const adEl = document.createElement("div");
adEl.innerHTML =
  '<div class="banner">Anzeige</div><div class="content">Werbecontent</div>'; // HTML content for the ad element
adEl.classList.add("ad"); // add the "ad" class to the ad element

// add ad to adRightSide
const adRightSideEl = document.querySelector("#adRightSide"); // select the element with the id "adRightSide"
adRightSideEl.appendChild(adEl); // append the ad element as a child of the selected element

// listen for window resize events
window.addEventListener("resize", () => {
  const adRightSideWidth = adRightSideEl.clientWidth; // get the width of the adRightSide element
  adEl.style.width = `${adRightSideWidth}px`; // set the width of the ad element to match the width of the adRightSide element
});

// listen for scroll events on the window
window.addEventListener("scroll", function () {
  const header = document.querySelector(".nav"); // select the header element
  header.classList.toggle("scroll", window.scrollY > 1000); // toggle the "scroll" class on the header based on the scroll position
});
