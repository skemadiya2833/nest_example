import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {

  filePath = './DB/users.json';

  updateUser(emailId: string, user: User): string {
    const list: User[] = this.readJsonArrayFromFile();
    for (let elem of list) {
      if (elem?.email === emailId) {
        elem.firstName = user.firstName;
        elem.lastName = user.lastName;
        elem.alternateEmail = user.alternateEmail;
        break;
      }
    }
    const jsonData = JSON.stringify(list);
    this.updateJsonArray(jsonData);
    return "Successfully updated";
  }

  readJsonArrayFromFile = (): User[] => {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      const jsonArray: User[] = JSON.parse(fileContent);
      return jsonArray;
    } catch (err) {
      throw new InternalServerErrorException(err?.message)
    }
  }

  updateJsonArray = (jsonData: string) => {
    fs.writeFile(this.filePath, jsonData, (err) => {
      if (err) {
        throw new InternalServerErrorException(err?.message)
      }
    });
  }

  createUser(user: User): string {
    const list = this.readJsonArrayFromFile();
    list.push(user);
    const jsonData = JSON.stringify(list);
    this.updateJsonArray(jsonData);
    return "Successfully added";
  }
  getAllUsers(): User[] {
    return this.readJsonArrayFromFile();
  }

  getUserById(email: string): User | null {
    const list = this.readJsonArrayFromFile();
    const user = list.find((elem) => elem.email === email);
    if (!user) throw new NotFoundException('Record not found.');
    return user;
  }
}
