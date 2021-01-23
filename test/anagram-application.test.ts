import {AnagramApplication} from '../src/anagram-application';
import {FileInputReader} from '../src/file-input-reader';
import {UserInputReader} from '../src/user-input-reader';
import chai, {expect} from 'chai';

chai.use(require('chai-string'));

const mockedConsoleLog = jest.fn();

const mockedUserInputReader = {
  next: jest.fn()
};

const mockedFileInputReader = {
  open: jest.fn(),
  close: jest.fn(),
  nextLine: jest.fn()
};

global.console = <any>{log: mockedConsoleLog};

const MockUserInputReader = jest.fn<UserInputReader, any[]>(() => <any>mockedUserInputReader);

const MockFileInputReader = jest.fn<FileInputReader, any[]>(() => <any>mockedFileInputReader);

describe('anagram-application', () => {
  let anagramApplication: AnagramApplication;

  beforeEach(() => {
    anagramApplication = new AnagramApplication(new MockFileInputReader(), new MockUserInputReader());
  });

  it('should find find anagram', async () => {
    mockedUserInputReader.next.mockReturnValueOnce('testword');
    mockedUserInputReader.next.mockReturnValueOnce(null);
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswgfott');
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswdrott');
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswgasdfott');

    await anagramApplication.run();

    expect(mockedConsoleLog.mock.calls[mockedConsoleLog.mock.calls.length - 1][0]).to.containIgnoreCase('eswdrott');
  });

  it('should not find find anagram', async () => {
    mockedUserInputReader.next.mockReturnValueOnce('testwrd');
    mockedUserInputReader.next.mockReturnValueOnce(null);
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswgfott');
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswdrott');
    mockedFileInputReader.nextLine.mockReturnValueOnce('eswgasdfott');

    await anagramApplication.run();

    expect(mockedConsoleLog.mock.calls[mockedConsoleLog.mock.calls.length - 1][0]).to.containIgnoreCase('No anagrams found!');
  });

});
