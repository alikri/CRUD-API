import { v4 as uuidv4 } from 'uuid';
import { data } from '../mockData/usersDefaultData';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}


export class InMemoryDB {
  private users: User[] = data;

  createUser(user: Omit<User, 'id'>): User | false {
    const { username, age, hobbies } = user;
    if (
      typeof username !== 'string' ||
      username.trim() === '' ||
      typeof age !== 'number' ||
      age <= 0 ||
      !Array.isArray(hobbies) ||
      hobbies.some((hobby) => typeof hobby !== 'string')
    ) {
      return false; 
    }

    const newUser: User = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, userData: Partial<Omit<User, 'id'>>): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      Object.assign(user, userData);
      return user;
    }
    return undefined;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const db = new InMemoryDB();
