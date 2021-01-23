import {AnagramSearch} from '../src/anagram-search';
import {expect} from 'chai';


describe('anagram-search', () => {
  let anagramSearch;

  beforeEach(() => {
    anagramSearch = AnagramSearch.for('testword');
  });

  it('should be an anagram', () => {
    expect(anagramSearch.isAnagram('rdesttow')).to.eq(true);
  });

  it('should not be an anagram', () => {
    expect(anagramSearch.isAnagram('notanagramfortestword')).to.eq(false);
    expect(anagramSearch.isAnagram('rasdttow')).to.eq(false);
    expect(AnagramSearch.for(null).isAnagram('testword')).to.eq(false);
    expect(AnagramSearch.for(undefined).isAnagram('testword')).to.eq(false);
  });

});
