import fs from 'fs'
import Logger from './LoggerService';
import { IProducts } from '../types/types';

class Container {
  name: string;
  path: string;
  url: string;

  constructor(path: string, name: string) {
    this.name = name;
    this.path = path;
    this.url = `${this.path}/${this.name}`
  }

  save = async (arg: IProducts): Promise<number> => {
    try {
      const response = await this.getAll() || [];
      const newId = response[response.length - 1]?.id || 0;

      const object = {
        ...arg,
        id: newId + 1,
      }

      response.push(object)

      await fs.promises.writeFile(this.url, JSON.stringify(response, null, 2))

      return newId + 1;
    } catch (e) {
      if (e instanceof Error) Logger.error('Container.save ' + e.message)
      return -1
    }
  }

  getAll = async (): Promise<IProducts[] | undefined> => {
    try {
      const response = await fs.promises.readFile(this.url, 'utf-8');
      const data: IProducts[] = JSON.parse(response);

      return data;
    } catch (e) {
      if (e instanceof Error) Logger.error('Container.getAll ' + e.message);
    }
  }

  getById = async (id: number): Promise<IProducts | undefined> => {
    try {
      const response = await this.getAll();
      if (!response) throw new Error ('Could not get the file: ' + this.name);

      const object = response.find(element => element.id === id);

      return object;
    } catch (e) {
      if (e instanceof Error) Logger.error('Container.getById ' + e.message);
    }
  }

  deleteAll = async (): Promise<void> => {
    try {
      const response = await this.getAll();  
      if (!response) throw new Error ('Could not get the file: ' + this.name);

      await fs.promises.writeFile(this.url, JSON.stringify([]))
    } catch (e) {
      if (e instanceof Error) Logger.error('Container.deleteAll ' + e.message);
    }
  }

  deleteById = async (id: number): Promise<void> => {
    try {
      const response = await this.getAll();  
      if (!response) throw new Error ('Could not get the file: ' + this.name);

      const index = response.findIndex((element: any) => element.id === id);
      if (index === -1) throw new Error (`The element with id ${id} does not exist`);

      if (index >= 0) {
        response.splice(index, 1);
        await fs.promises.writeFile(this.url, JSON.stringify(response, null, 2))
      }
    } catch (e) {
      if (e instanceof Error) Logger.error('Container.deleteById ' + e.message);
    }
  }
}

export default Container;