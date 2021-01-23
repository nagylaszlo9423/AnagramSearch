import {UserInputReader} from '../src/user-input-reader';
import {MockSTDIN, stdin} from 'mock-stdin';
import {expect} from 'chai';
import mock = jest.mock;

mock('readline');

describe('user-input-reader', () => {
  let userInputReader: UserInputReader;
  let stdinMock: MockSTDIN;

  beforeEach(() => {
    stdinMock = stdin();
    userInputReader = new UserInputReader();
  });

  it('should read user input', async () => {
    const input = 'recently';

    process.nextTick(() => {
      stdinMock.send(`${input}\r`);
    });

    expect(await userInputReader.next()).to.eq(input);
  });

  it('should ask for another input', async () => {
    const input = 'other';

    process.nextTick(() => {
      stdinMock.send('\r');
    });

    const userInputPromise = userInputReader.next();

    process.nextTick(() => {
      stdinMock.send(`${input}\r`);
    });

    expect(await userInputPromise).to.eq(input);
  });

});
