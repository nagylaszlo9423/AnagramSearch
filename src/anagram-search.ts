
export class AnagramSearch {
  private readonly baseWordMap: Map<string, number>;

  private constructor(baseWord: string) {
    this.baseWordMap = this.createMap(baseWord);
  }

  public static for(baseWord: string): AnagramSearch {
    return new AnagramSearch(baseWord);
  }

  public isAnagram(otherWord: string): boolean {
    return this.compareMap(this.createMap(otherWord))
  }

  private compareMap(otherMap: Map<string, number>): boolean {

    if (this.baseWordMap === undefined || otherMap === undefined || this.baseWordMap.size !== otherMap.size) {
      return false;
    }

    for (let [key, val] of this.baseWordMap) {
      if (!otherMap.has(key) || otherMap.get(key) !== val) {
        return false;
      }
    }

    return true;
  }

  private createMap(text: string): Map<string, number> {
    const result: Map<string, number> = new Map<string, number>();

    if (text === undefined || text === null) {
      return result;
    }

    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);

      if (result.has(char)) {
        result.set(char, result.get(char) + 1);
      } else {
        result.set(char, 1);
      }
    }

    return result;
  }

}
