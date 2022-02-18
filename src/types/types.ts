export interface IUser {
  firstname: string;
  lastname: string;
  books: IBooks[];
  pets: string[]

  getFullName: () => string;
  addPet: (pet: string) => void;
  countPets: () => number;
  addBook: (bookName: string, author: string) => void;
  getBookNames: () => string[];
}

export interface IBooks {
  name: string,
  author: string,
}

export interface IProducts {
  title: string,
  thumbnail: string,
  price: number,
  id?: number,
}