import { faker } from "@faker-js/faker";
import {db} from "./index"
import { person } from "./schema";

function generatePersons(count: number) {
  const persons = [];
  for (let i = 0; i < count; i++) {
    persons.push({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      gender: faker.person.sex(),
      age: faker.number.int({ min: 18, max: 60 }),
      phone: faker.phone.number({ style: "international" }),
      address: faker.location.streetAddress(),
    });
  }
  return persons;
}
const main = async () => {
        await db.insert(person).values(generatePersons(50)); 
};

main();