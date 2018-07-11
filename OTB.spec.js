const {expect} = require('chai');
const {orderJobs} = require('../OTB');

describe('orderJobs' , () => {
  it('returns an empty array when passed an empty string (no jobs)' , () => {
    const input = '';
    const actual = orderJobs(input);
    expect(actual).to.eql([]);
  });
  it('returns an array of one element when passed one job without dependencies' , () => {
    const input = {'a': ''};
    const actual = orderJobs(input);
    expect(actual).to.eql(['a']);
  });
  it('returns an array containing all the jobs in any order when passed three jobs without dependencies' , () => {
    const input = {'a': '', 'b': '', 'c': ''};
    const actual = orderJobs(input);
    expect(actual).to.eql(['a', 'b', 'c']);
  });
  it('returns an array that contains all three jobs and places a job before any other jobs that depend upon it' , () => {
    const input = {'a': '', 'b': 'c', 'c': ''};
    const actual = orderJobs(input);
    expect(actual).to.eql(['a', 'c', 'b']);
  });
  it('returns an array that contains all jobs and places a job before any other jobs that depend upon it' , () => {
  const input = {'a': '', 'b': 'c', 'c': 'f', 'd': 'a', 'e': 'b', 'f': ''};
  const actual = orderJobs(input);
    expect(actual).to.eql([ 'a', 'd', 'f', 'c', 'b', 'e' ]);
  });
  it('returns an error if a job depends on itself' , () => {
    const input = {'a': '', 'b': '', 'c': 'c'};
    const actual = orderJobs(input);
    expect(actual).to.equal('Error: a job cannot depend on itself');
  });
  it('returns an error if the jobs list contains circular dependencies' , () => {
    const input = {'a': '', 'b': 'c', 'c': 'f', 'd': 'a', 'e': '', 'f': 'b'};
    const actual = orderJobs(input);
    expect(actual).to.equal('Error: the jobs list cannot contain circular dependencies');
  });
});