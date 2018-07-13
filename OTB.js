const orderJobs = jobs => {
  //if passed no jobs, return an empty array
  if (jobs.length === 0) return [];

  //otherwise, coerce string into jobs object and loop through:
  let jobsObj = JSON.parse(jobs);
  let orderedJobs = [];
  for (let key in jobsObj) {
    //return an error if a job depends upon itself
    if (jobsObj[key] === key) return "Error: a job cannot depend on itself";

    // if a job without dependencies is not in final array already, push it.
    if (jobsObj[key].length === 0) {
      if (!orderedJobs.includes(key)) orderedJobs.push(key);
    }

    //otherwise, for a job with dependencies:
    else {
      //if both key and dependency value are already in final array, return error message
      if (orderedJobs.includes(jobsObj[key]) && orderedJobs.includes(key))
        return "Error: the jobs list cannot contain circular dependencies";

      //if neither key nor dependency value are in final array, push both in correct order
      else if (!orderedJobs.includes(jobsObj[key]) && !orderedJobs.includes(key)) {
        orderedJobs.push(jobsObj[key], key);
      }

      //if key is already in final array, insert dependency value before it
      else if (orderedJobs.includes(key) && !orderedJobs.includes(jobsObj[key])) {
        let keyIndex = orderedJobs.indexOf(key);
        orderedJobs.splice(keyIndex, 0, jobsObj[key]);
      }

      //if dependency value is already in final array, insert key after it
      else {
        let valueIndex = orderedJobs.indexOf(jobsObj[key]);
        orderedJobs.splice(valueIndex + 1, 0, key);
      }
    }
  }
  return orderedJobs;
};
module.exports = { orderJobs };
