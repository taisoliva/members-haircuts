let fillPercentage = 0; // Percentual inicial

document.getElementById("check").addEventListener("click", function () {
  increaseFill();
});

function increaseFill() {
  console.log("clique");
  console.log(fillPercentage)
  if (fillPercentage < 100) {
    // Limite máximo de 100%
    fillPercentage += 10; // Aumenta o preenchimento em 10%
    document.getElementById('loadingBar').style.setProperty('--fill-width', `${fillPercentage}%`);
  }
}
