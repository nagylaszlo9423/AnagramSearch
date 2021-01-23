import {FileInputReader} from './file-input-reader';
import {UserInputReader} from './user-input-reader';
import {AnagramSearch} from './anagram-search';


export class AnagramApplication {

  constructor(private fileInputReader: FileInputReader, private userInputReader: UserInputReader) {}

  public async run() {

    let expression: string;
    let line: string;

    while ((expression = await this.userInputReader.next()) !== null && expression != undefined) {
      console.log('\nSearching...');

      const startDate: number = new Date().getTime();
      const anagrams = [];
      const anagramSearch = AnagramSearch.for(expression);

      this.fileInputReader.open();

      while ((line = await this.fileInputReader.nextLine()) !== null && line !== undefined) {
        if (anagramSearch.isAnagram(line)) {
          anagrams.push(line);
        }
      }

      this.fileInputReader.close();

      const duration = new Date().getTime() - startDate;
      this.printResults(anagrams, duration);
    }
  }

  private printResults(anagrams: string[], duration: number) {
    let results;

    if (anagrams.length === 0) {
      results = 'No anagrams found!';
    } else {
      results = anagrams.join(', ');
    }

    console.log(`Execution time: ${duration} ms\nResults: ${results}`);
  }

}
