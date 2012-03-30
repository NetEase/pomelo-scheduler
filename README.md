# pomelo-shedule
pomelo-schedule is a schedule tool for nodejs, it's purpose is to provide a product level schedulemodule which is high efficient and can support large number job schedule.You can 

As a schedule tool, it support two kinds of trigger: A simple trigger which use a js object and  a Cron time trigger which use a Cron time string.
##Installation
```
npm install pomelo-schedule
```
##Simple Trigger
``` javascript
var schedule = require('../lib/schedule');

var simpleJob = function(data){
   console.log("run simpleJob :" + data.id);
}

schedule.scheduleJob({start:Date.now(), period:3000, count: 10}, simpleJob, {id:id++, period:period});
```

run this code, you will find that the job will run for every 3  second, and run
##Cron Trigger

The cron trigger has 7 fields, which means second, minite, day, 

*     *     *     *   *    *        command to be executed
-     -     -     -   -    -
|     |     |     |   |    |
|     |     |     |   |    +----- day of week (0 - 6) (Sunday=0)
|     |     |     |   +------- month (1 - 12)
|     |     |     +--------- day of        month (1 - 31)
|     |     +----------- hour (0 - 23)
|     +------------- min (0 - 59)
+------------- second (0 - 59)

Exampe of cron tirggers

"0/2 1-10,50 10 * * 6" Fire every 2 seconde 


###Special charactors

-: '-' means range. For example, 1-3 in the second field means the seconds 1, 2 and 3

/: means increasement. For exapmle, 1/20 in the second field means 1, 21 and 41 second, and 1/2 means for every odd seconds as 1, 3, 5 ... ...

,: means additional values. For example, 1, 10, 15 in the second field means 1, 10 and 15 second. You can use '-', and '/' with ',', for example, 11,20-22,0/2 in the second filed means 11, 21 and all the even seconds. 

