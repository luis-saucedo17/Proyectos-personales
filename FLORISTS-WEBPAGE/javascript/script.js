let menuIcon = document.querySelector("#menu");
let displayMenu = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  displayMenu.classList.toggle("active");
};
