import * as readline from 'readline';

export class UserInputReader {

  private readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  next(): Promise<string> {
    return new Promise<string>(resolve => this.readline.question('\nFind anagrams for: ', answer => {
      if (answer === undefined || answer.length === 0) {
        return this.next().then(resolve);
      }

      return resolve(answer);
    }))
  }

}
