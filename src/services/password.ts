import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);


export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    //console.log('Hashed password:', `${buf.toString("hex")}.${salt}`);
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    if (!salt) {
      throw new Error("Invalid stored password format");
    }
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    //console.log('Comparing hashed passwords:', buf.toString("hex"), hashedPassword);
    return buf.toString("hex") === hashedPassword;
  }
}

// Password.toHash("mypassword"); // "drowssapym"

// Password.compare("drowssapym", "mypassword"); // true

// Password.toHash("anotherpassword"); // Error: Property 'toHash' does not exist on type 'Password'.