const times = document.getElementById("times");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

times.addEventListener("click", () => {
  overlay.style.display = "none";
  modal.style.display = "none";
});
