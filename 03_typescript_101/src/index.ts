import { User } from "./User";
import { Company } from "./Company";
import { Mappable, CustomMap } from "./CustomMap";
const user = new User();
console.log(user);

const compony = new Company();
console.log(compony);

const map = new CustomMap("map");
map.addMarker(user);
map.addMarker(compony);
