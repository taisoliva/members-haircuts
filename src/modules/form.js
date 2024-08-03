import { data } from "./data";

const form = document.querySelector("form")
const cardID = document.getElementById("card-id")
const button = document.querySelector("button")

cardID.addEventListener("input", (event) => {
    event.preventDefault();

    button.disabled = false
});

form.onsubmit = async (event) => {
    event.preventDefault()

    data(cardID.value)
    cardID.value = ""
    button.disabled = true


}