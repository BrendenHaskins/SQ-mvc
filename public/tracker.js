const KEY = "SQTrackerVessels"

document.addEventListener("DOMContentLoaded", function () {
    const allStoredVessels = localStorage.getItem(KEY);
    if (allStoredVessels) {
    
        document.getElementById("no-ships").remove();
        const vessels = JSON.parse(allStoredVessels);
        for (let vessel of vessels) {
            addVesselToPage(vessel);
        }
    }
  });

function addVesselToPage(obj) {
    const card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "18rem";
  
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
  
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = obj.name || "Unnamed Vessel";
  
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = `
      <strong>Movement:</strong> ${obj.movement} <br>
      <strong>Armor:</strong> ${obj.armor} <br>
      <strong>Engines:</strong> ${obj.engines} <br>
      <strong>Sensor Range:</strong> ${obj.sensor}
    `;
  
    const weaponList = document.createElement("ul");
    weaponList.className = "list-group list-group-flush";
    (obj.weapons || []).forEach(weapon => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = weapon;
      weaponList.appendChild(li);
    });
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    if (weaponList.childNodes.length > 0) {
      card.appendChild(weaponList);
    }
  
    document.getElementById("card-container").appendChild(card);
  }

function addVesselToLocalStorage(obj) {
    try{
        const allVessels = localStorage.getItem(KEY) ?? "[]";
        const parsed = JSON.parse(allVessels);
        parsed.push(obj)
        const newVessels = JSON.stringify(parsed);
        localStorage.setItem(KEY, newVessels);
        return true;
        
    } catch (err) {
        return false;
    }

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
    
    if(addVesselToLocalStorage(formData))
    {
        window.location.reload();
    } else {
        showBootstrapAlert("Could not add vessel.", "danger")
    }
}

function showBootstrapAlert(message, type = "primary") {
    const alertHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    document.getElementById("alert-container").insertAdjacentHTML("beforeend", alertHTML);
}

function clearAllShips() {
    localStorage.removeItem(KEY);
    window.location.reload();
}

