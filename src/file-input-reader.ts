import {createReadStream, ReadStream} from 'fs';
import {createInterface} from 'readline';

export class FileInputReader {

  private fileStream: ReadStream;
  private iterator: AsyncIterableIterator<string>;
  private isOpen = false;

  constructor(private readonly filePath: string) {}

  public async nextLine(): Promise<string> {
    return this.iterator.next().then(value => value.value);
  }

  public open() {
    if (this.isOpen) {
      throw Error('FileInputReader is already open!');
    }

    this.fileStream = createReadStream(this.filePath, {
      encoding: 'utf8',
    });

    this.iterator = createInterface({
      input: this.fileStream,
      crlfDelay: Infinity
    })[Symbol.asyncIterator]();

    this.isOpen = true;
  }

  public close() {
    if (this.isOpen) {
      this.fileStream.close();
      this.isOpen = false;
    }
  }

}
