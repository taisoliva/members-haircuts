import { findOne } from "../services/find-one";
import { update } from "../services/update";

const name = document.getElementById("name");
const clientSince = document.getElementById("client-since");
const tagID = document.querySelector(".tag-id h3");
const main = document.querySelector("main");
const totalCuts = document.querySelectorAll("#totalCuts");
const cutsNeeded = document.getElementById("cutsNeeded");
const cutsRemaining = document.getElementById("cutsRemaining");
const historyList = document.querySelector("ul");
let id;

export const data = async (cardID) => {
  id=cardID
  const data = await findOne({ id: cardID });

  if(!data){
    return
  }


  name.textContent = data.name;
  clientSince.textContent = `Cliente desde ${data.clientSince}`;
  tagID.textContent = `ID: ${data.id}`;

  howManyHairCuts(cardID, data.loyaltyCard);

  totalCuts.forEach((element, index) => {
    element.textContent = data.loyaltyCard.totalCuts;
  });
  cutsNeeded.textContent = data.loyaltyCard.cutsNeeded;
  cutsRemaining.textContent = data.loyaltyCard.cutsRemaining;

  historyData(data.appointmentHistory);
};

const howManyHairCuts = (cardID, loyaltyCard) => {
  main.textContent = "";

  for (let i = 0; i < loyaltyCard.totalCuts; i++) {
    const div = document.createElement("div");

    div.className = "flex justify-items align-items";
    div.id = "check";

    const img = document.createElement("img");
    img.src = "./src/assets/PinCheck.png";
    img.alt = "";

    div.appendChild(img);
    main.appendChild(div);
  }

  for (let i = 0; i < loyaltyCard.cutsRemaining; i++) {
    const div = document.createElement("div");
    div.className = "flex justify-items align-items";

    const img = document.createElement("img");
    img.alt = "";

    div.addEventListener("click", handleClick);

    if (i === loyaltyCard.cutsRemaining - 1) {
      img.id = "gift";
      img.src = "./src/assets/gift-solid-gray.svg";
    }

    div.appendChild(img);
    main.appendChild(div);
  }

  const fillPercentage = loyaltyCard.totalCuts * (100 / loyaltyCard.cutsNeeded);
  document
    .getElementById("loadingBar")
    .style.setProperty("--fill-width", `${fillPercentage}%`);
};

const historyData = (appointmentHistory) => {
  historyList.textContent = "";

  for (let i = 0; i < appointmentHistory.length; i++) {
    const li = document.createElement("li");
    li.className = "flex justify-between mb-1";

    const div = document.createElement("div");

    const dateP = document.createElement("p");
    dateP.className = "date";
    dateP.textContent = appointmentHistory[i].date;

    const timeP = document.createElement("p");
    timeP.textContent = appointmentHistory[i].time;

    div.appendChild(dateP);
    div.appendChild(timeP);

    const img = document.createElement("img");
    img.src = "./src/assets/check.svg";
    img.alt = "check icon";

    li.appendChild(div);
    li.appendChild(img);

    historyList.appendChild(li);
  }
};

const updateData = ({ id, totalCuts, cutsRemaining, cutsNeeded }) => {
  console.log(totalCuts);
  update({ id, totalCuts, cutsRemaining, cutsNeeded });
};

const handleClick = (event) => {
  const div = event.currentTarget; 
  const img = div.querySelector("img");
  if(img.id.includes("gift")){
    img.src = "./src/assets/PinGift.svg"

  } else{
    img.src = "./src/assets/PinCheck.png";
  }

  totalCuts.forEach((element, index) => {
    element.textContent = Number(element.textContent) + 1;
  });

  cutsRemaining.textContent = Number(cutsRemaining.textContent) - 1;

  const fillPercentage = Number(totalCuts[0].textContent) * (100 / Number(cutsNeeded.textContent));
  document
    .getElementById("loadingBar")
    .style.setProperty("--fill-width", `${fillPercentage}%`);

  if(totalCuts[0].textContent === "10"){
    const overlay = document.getElementById("overlay")
    const modal = document.getElementById("modal")

    overlay.style.display = "flex"
    modal.style.display = "flex"
  }

  updateData({
    id,
    totalCuts: Number(totalCuts[0].textContent),
    cutsRemaining: Number(cutsRemaining.textContent),
    cutsNeeded: Number(cutsNeeded.textContent),
  });

  div.removeEventListener("click", handleClick);
};