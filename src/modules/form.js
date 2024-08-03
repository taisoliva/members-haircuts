const form = document.querySelector("form")
const cardID = document.getElementById("card-id")

cardID.addEventListener("input", (event) => {
    event.preventDefault();
});

form.onsubmit = (event) => {
    event.preventDefault()

    console.log(cardID.value)

    cardID.value = ""

}