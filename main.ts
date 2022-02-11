import User from "./classes/User";

const user = new User('Lautaro', 'Gonzalez')

//Init with no pets and books
console.log(user.getFullName()) // Lautaro Gonzalez

user.addPet('cat')
user.addPet('dog')
console.log(user.countPets()) // 2

user.addBook('Siddharta', 'Herman Hesse')
user.addBook('A brief history of times', 'Stephen Hawkings');
console.log(user.getBookNames()) // ['Siddharta', 'A brief history of times']