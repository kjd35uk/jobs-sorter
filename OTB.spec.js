const { expect } = require("chai");
const { orderJobs } = require("./OTB");

describe("orderJobs", () => {
  it("returns an empty array when passed an empty string ie. no jobs", () => {
    const input = "";
    const actual = orderJobs(input);
    expect(actual).to.eql([]);
  });

  it("returns an array of one element when passed one job without dependencies", () => {
    let input = '{"a": ""}';
    let actual = orderJobs(input);
    expect(actual).to.eql(["a"]);
    input = '{"z": ""}';
    actual = orderJobs(input);
    expect(actual).to.eql(["z"]);
  });

  it("returns an array of two elements in the correct order when passed one job that has a dependency", () => {
    let input = '{"a": "b"}';
    let actual = orderJobs(input);
    expect(actual).to.eql(["b", "a"]);
    input = '{"z": "x"}';
    actual = orderJobs(input);
    expect(actual).to.eql(["x", "z"]);
  });

  it("returns an error message when passed one job that depends on itself", () => {
    let input = '{"a": "a"}';
    let actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
    input = '{"z": "z"}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
  });

  it("returns an array of three elements in any order when passed three jobs without dependencies", () => {
    const input = '{"a": "", "b": "", "c": ""}';
    const actual = orderJobs(input);
    expect(actual).to.be.an("array").that.includes("a", "b", "c");
  });

  it("returns an array of three elements in the correct order when passed three jobs, some with  dependencies", () => {
    let input = '{"a": "", "b": "c", "c": ""}';
    let actual = orderJobs(input);
    expect(actual).to.eql(["a", "c", "b"]);
    input = '{"a": "b", "b": "", "c": ""}';
    actual = orderJobs(input);
    expect(actual).to.eql(["b", "a", "c"]);
  });

  it("returns an error message when passed three jobs, including one that depends on itself", () => {
    let input = '{"a": "", "b": "b", "c": ""}';
    let actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
    input = '{"a": "", "b": "", "c": "c"}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
  });

  it("returns an error message when passed three jobs that include circular dependencies", () => {
    let input = '{"a": "b", "b": "a", "c": ""}';
    let actual = orderJobs(input);
    expect(actual).to.equal("Error: the jobs list cannot contain circular dependencies");
    input = '{"a": "", "b": "c", "c": "b"}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: the jobs list cannot contain circular dependencies");
  });

  it("returns a longer array including all elements in any order when passed a list of many jobs without dependencies", () => {
    const input = '{"a": "", "b": "", "c": "", "d": "", "e": "", "f": ""}';
    const actual = orderJobs(input);
    expect(actual).to.be.an("array").that.includes("a", "b", "c", "d", "e", "f");
  });

  it("returns an array that contains all jobs in the correct order when passed a list of many jobs", () => {
    let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "b", "f": ""}';
    let actual = orderJobs(input);
    expect(actual).to.eql(["a", "d", "f", "c", "b", "e"]);
    input = '{"a": "b", "b": "c", "c": "f", "d": "a", "e": "b", "f": ""}';
    actual = orderJobs(input);
    expect(actual).to.eql(["f", "c", "b", "e", "a", "d"]);
    input = '{"a": "b", "b": "c", "c": "", "d": "a", "e": "b", "f": "c"}';
    actual = orderJobs(input);
    expect(actual).to.eql(["c", "f", "b", "e", "a", "d"]);
  });

  it("returns an error message when passed a list of many jobs, including jobs that depend on themselves", () => {
    let input = '{"a": "a", "b": "", "c": "", "d": "", "e": "", "f": ""}';
    let actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
    input = '{"a": "", "b": "", "c": "c", "d": "d", "e": "", "f": ""}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
    input = '{"a": "", "b": "", "c": "", "d": "", "e": "e", "f": "f"}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: a job cannot depend on itself");
  });

  it("returns an error message when passed a list of many jobs that contains circular dependencies", () => {
    let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "", "f": "b"}';
    let actual = orderJobs(input);
    expect(actual).to.equal("Error: the jobs list cannot contain circular dependencies");
    input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "", "f": "c"}';
    actual = orderJobs(input);
    expect(actual).to.equal("Error: the jobs list cannot contain circular dependencies");
  });
});
