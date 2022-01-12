const { expect } = require("chai");
const util = require("./util");

describe("util.js Module", () => {
  it("문자열의 첫번째 문자를 대문자로 변환한다", () => {
    const val = "changi";
    expect(util.capitalize(val)).to.equal("Changi");
  });
});
