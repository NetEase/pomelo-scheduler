/**
 * This is the class of the job used in schedule module
 */
var cronTrigger = require('./cronTrigger');
var simpleTrigger = require('./simpleTrigger');

var jobId = 1;

var SIMPLE_JOB = 1;
var CRON_JOB  = 2;
var jobCount = 0;

var logger = require('log4js').getLogger(__filename);


//For test
var lateCount = 0;

var Job = function(trigger, jobFunc, jobData, options){
  this.settings = {
      runLateJobs: options.runLateJobs || true,
      lateJobInterval: options.lateJobInterval || 500
  };
  this.data = (!!jobData)?jobData:null;
  this.func = jobFunc;

  if(typeof(trigger) == 'string'){
    this.type = CRON_JOB;
    this.trigger = cronTrigger.createTrigger(trigger, this);
  }else if(typeof(trigger) == 'object'){
    this.type = SIMPLE_JOB;
    this.trigger = simpleTrigger.createTrigger(trigger, this);
  }

  this.id = jobId++;
  this.runTime = 0;
};

var pro = Job.prototype;

/**
 * Run the job code
 */
pro.run = function(){
  try{
    jobCount++;
    this.runTime++;
    var late = Date.now() - this.excuteTime();
    if (late>this.settings.lateJobInterval) {
        logger.warn('Run Job: count ' + jobCount + ' late :' + late + ' lateCount ' + (++lateCount));

        if (this.settings.runLateJobs) {
            logger.warn("Skipping late job: count " + jobCount + ' late :' + late + ' lateCount ' + (++lateCount));
        } else {
            this.func(this.data);
        }
    } else {
        this.func(this.data);
    }
  }catch(e){
    logger.error("Job run error for exception ! " + e.stack);
  }
};

/**
 * Compute the next excution time
 */
pro.nextTime = function(){
  return this.trigger.nextExcuteTime();
};

pro.excuteTime = function(){
    return this.trigger.excuteTime();
};

/**
 * The Interface to create Job
 * @param trigger The trigger to use
 * @param jobFunc The function the job to run
 * @param jobDate The date the job use
 * @return The new instance of the give job or null if fail
 */
function createJob(trigger, jobFunc, jobData, options){
  return new Job(trigger, jobFunc, jobData, options);
}

module.exports.createJob = createJob;
