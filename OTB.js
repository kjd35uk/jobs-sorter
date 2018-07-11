// [Ruby hash-keys assigned by hash-rockets can facilitate strings for key-value pairs (e.g. 's' => x) - equivalent to JS key/value pairs]

const orderJobs = jobs => {
  //if passed no jobs, return an empty array
  if (typeof jobs === "string" && jobs.length === 0) return [];

  //otherwise, loop through the jobs list:
  let orderedJobs = [];
  for (let key in jobs) {
    //return an error if a job depends upon itself
    if (jobs[key] === key) return "Error: a job cannot depend on itself";

  //if the job is without dependencies:
    // if the job is not in final array already, push it.
    if (jobs[key] === "" && !orderedJobs.includes(key)) orderedJobs.push(key);
    //if the job is already in final array, skip over it.
    else if (jobs[key] === "" && orderedJobs.includes(key)) orderedJobs.push();

  //otherwise, if the job has dependecies:
    else {
      //if both key and dependency value are already in final array, return error message
      if (orderedJobs.includes(jobs[key]) && orderedJobs.includes(key)) {
        return "Error: the jobs list cannot contain circular dependencies";
      }
      //if neither key nor dependency value are in final array, push both in correct order
      else if (!orderedJobs.includes(jobs[key]) && !orderedJobs.includes(key)) {
        orderedJobs.push(jobs[key], key);
      }
      //if key is already in final array, insert dependency value before it
      else if (orderedJobs.includes(key) && !orderedJobs.includes(jobs[key])) {
        let keyIndex = orderedJobs.findIndex(job => job === key);
        orderedJobs.splice(keyIndex, 0, jobs[key]);
      }
      //if dependency value is already in final array, insert key after it
      else {
        let valueIndex = orderedJobs.findIndex(job => job === jobs[key]);
        orderedJobs.splice(valueIndex + 1, 0, key);
      }
    }
  }
  return orderedJobs;
};

module.exports = { orderJobs };
