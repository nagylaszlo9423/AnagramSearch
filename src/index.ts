import {UserInputReader} from './user-input-reader';
import {FileInputReader} from './file-input-reader';
import {AnagramApplication} from './anagram-application';

const filePath = 'wordlist.txt';
const fileInputReader = new FileInputReader(filePath);
const userInputReader = new UserInputReader();

new AnagramApplication(fileInputReader, userInputReader).run()
