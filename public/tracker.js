document.addEventListener("DOMContentLoaded", function() {
    const allStoredVessels = localStorage.getItem("SQTrackerVessels")
    if(allStoredVessels)
    {
        for(let vessel in JSON.parse(allStoredVessels))
        {
            document.getElementById("cards").appendChild()
        }
    }
});

function addVesselToPage()
{
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Add title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = "Card Title";

    // Add text
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = "This is some text inside the card.";

    // Optional: Add a button
    const cardButton = document.createElement("a");
    cardButton.className = "btn btn-primary";
    cardButton.href = "#";
    cardButton.textContent = "Go somewhere";

    // Append elements together
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(cardBody);

    // Append card to the container
    document.getElementById("card-container").appendChild(card);
}

function addVesselToLocalStorage() {

}

function addAnotherWeapon() {
    let count = 1;
    let searchStr = `weapon${count}`;

    while(document.getElementById(searchStr) != null)
    {
        count++;
        searchStr = `weapon${count}`;
    }
    
    const extraField = `
                <div class="mb-3">
                    <label for="${searchStr}" class="form-label">Weapon</label>
                    <input type="text" class="form-control" id="${searchStr}">
                </div>
    `;
    document.getElementById("addVesselBody").insertAdjacentHTML("beforeend",extraField)
}

function submitVesselForm() {
    const formData = {
      name: document.getElementById("name").value.trim(),
      movement: parseInt(document.getElementById("movement").value),
      armor: parseInt(document.getElementById("armor").value),
      engines: parseInt(document.getElementById("engines").value),
      sensor: parseInt(document.getElementById("sensor").value),
      weapons: []
    };
  
    // Dynamically collect all weapon inputs: weapon0, weapon1, weapon2...
    let weaponCount = 0;
    let weaponInput = document.getElementById(`weapon${weaponCount}`);
  
    while (weaponInput !== null) {
      const weaponValue = weaponInput.value.trim();
      if (weaponValue) {
        formData.weapons.push(weaponValue);
      }
      weaponCount++;
      weaponInput = document.getElementById(`weapon${weaponCount}`);
    }
  
    // Example: Log the collected form data
    console.log("Vessel submitted:", formData);
  
    // You can now do something with formData (e.g., send it to a backend or store in localStorage)
  }

