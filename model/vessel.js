import Weapon from "./weapon";

const Vessel = function(vessel) {
    this.name = vessel.name;
    this.armor = vessel.armor;
    this.speed = vessel.speed;
    this.sensor = vessel.sensor;
    this.range = vessel.range;
    this.weapon = new Weapon(vessel.weapon)
}

export default Vessel;