import { IBooks, IUser } from "../types/types";

class User implements IUser {

  firstname: string;
  lastname: string;
  books: IBooks[];
  pets: string[]

  constructor(firstname: string, lastname: string, books: IBooks[] = [], pets: string[] = []){
    

    if (!firstname || !lastname) throw new Error('Params firstname and lastname are required.')

    this.firstname = firstname;
    this.lastname = lastname;
    this.books = books;
    this.pets = pets;
  }

  getFullName = (): string => `${this.firstname} ${this.lastname}`

  addPet = (pet: string): void => {
    this.pets.push(pet);
  }

  countPets = (): number => this.pets.length

  addBook = (bookName: string, author: string): void => {
    this.books.push({
      name: bookName,
      author
    })
  }

  getBookNames = (): string[] => {
    return this.books.map((book) => book.name)
  }
}

export default User;