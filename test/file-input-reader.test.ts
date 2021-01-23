import {FileInputReader} from '../src/file-input-reader';
import {expect} from 'chai';

describe('file-input-reader', () => {
  let fileInputReader: FileInputReader;

  beforeEach(() => {
    fileInputReader = new FileInputReader('wordlist.txt');
    fileInputReader.open();
  });

  it('should find first 3 words of wordlist.txt', async () => {
    let lines = [];

    for (let i = 0; i < 3; i++) {
      lines.push(await fileInputReader.nextLine());
    }

    expect(lines[0]).to.eq('\'');
    expect(lines[1]).to.eq('\'due');
    expect(lines[2]).to.eq('\'enoemos');

    expect(() => fileInputReader.close()).to.not.throw();
  });

  it('should throw error as reader is open', () => {
    expect(() => fileInputReader.open()).to.throw();
  });

});
