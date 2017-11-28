var AWS = require('aws-sdk');
var Guid = require('guid');

AWS.config.update({region:'us-east-1'});
var s3 = new AWS.S3();
var emr = new AWS.EMR();

var bucket = 'atmasim';

// Create request ID from GUID.
// Create data request in the proper format.
// Using the s3 bucket with name atmasim.
// Save it as key input-<GUID>.dat.
// Create key results-<GUID>.
// Construct EMR request with proper input name / results folder.

var guid = Guid.create().value;
var jobFlowData = '';

var combineTalents = function(choices) {
    var possibleChoices = [[]];
    choices.forEach((options) => {
        newPossibilities = [];
        possibleChoices.forEach((possibility) => {
            options.forEach((option) => {
                var p = possibility.slice();
                p.push(option)
                newPossibilities.push(p);
            })
        })
        possibleChoices = newPossibilities;
    });
    return possibleChoices;
}

var combineSims = function(model) {
    // Simply combine time and model strings. Since NH, no adds to worry about.
    var  sims = [];
    for (var sim in Object.keys(model.model)) {
        for (var time in Object.keys(model.timeModel)) {
            sims = sims.concat(Object.keys(model.timeModel)[time] + "_" + Object.keys(model.model)[sim]);
        }
    }
    return sims;
}

var combineReforge = function(params) {
    var totalBudget = params.budget;
    var intellect = params.intellect;
    var hfloor = params.hfloor;
    var hceiling = params.hceiling;
    var cfloor = params.cfloor;
    var cceiling = params.cceiling;
    var mfloor = params.mfloor;
    var mceiling = params.mceiling;
    var vfloor = params.vfloor;
    var vceiling = params.vceiling;
    var stepSize = params.step;
    var createState = function(c,m,h,v,i) {
        return {
            crit: c,
            mastery: m,
            haste: h,
            versatility: v,
            intellect: i,
            remainingBudget: totalBudget - (c+m+h+v),
            children: function() {
                if(this.remainingBudget < stepSize) {
                    return [];
                }
                var children = [];
                if(this.crit+stepSize<=cceiling) {
                    children.push(createState(this.crit+stepSize,this.mastery,this.haste,this.versatility,this.intellect));
                }
                if(this.mastery+stepSize<=mceiling) {
                    children.push(createState(this.crit,this.mastery+stepSize,this.haste,this.versatility,this.intellect));
                }
                if(this.haste+stepSize<=hceiling) {
                    children.push(createState(this.crit,this.mastery,this.haste+stepSize,this.versatility,this.intellect));
                }
                if(this.versatility+stepSize<=vceiling) {
                    children.push(createState(this.crit,this.mastery,this.haste,this.versatility+stepSize,this.intellect));
                }
                return children;
            },
            stringForm: function() {
                return "c:" + this.crit + ",m:" + this.mastery + ",h:" + this.haste + ",v:" + this.versatility + ",i:" + this.intellect;
            }
        }
    }
    var discard = {};
    var leaves = []; // Leaves are fully itemized and are the only nodes we want to look at.
    var threshold = [createState(cfloor,mfloor,hfloor,vfloor,intellect)];
    while(threshold.length>0) {
        var cursor = threshold.pop();
        if(discard[cursor.stringForm()]) {
            continue;
        }
        var children = cursor.children();
        if(children.length==0) {
            leaves.push(cursor.stringForm());
        } else {
            threshold = threshold.concat(children);
        }
        discard[cursor.stringForm()] = true;
    }
    return leaves;
}

var combineLegendaries = function(params) {
    var legendaries = [];
    for(var i=0; i<params.length; i++) {
        for(var j=i+1; j<params.length; j++) {
            legendaries.push(params[i]+";"+params[j]);
        }
    }
    return legendaries;
}

/*var combineRelics = function(params) {
    var relics = [];
    
    var usedRelicMapping = {};
    return relics;
}*/

var combineCrucible = function(params) {

}

var simModel = require('../models.js').models[0]; // Antorus
var simCombinations = combineSims(simModel); // 28 Combinations
console.log('Found ' + simCombinations.length + ' sim combinations.');
var talentChoices = [[1],[1],[1],[1],[2],[3],[1]];
var sothpTalentChoices = [[2],[1],[1],[1],[2],[3],[1]];
//var talentCombinations = [[0,0,0,0,0,0,0]];
var talentCombinations = combineTalents(talentChoices);
var sothpTalentCombinations = combineTalents(sothpTalentChoices);
console.log('Found ' + talentCombinations.length + ' talent combinations.');
var acridReforgeParameters1 = {budget: 36000, step: 500, 
    hceiling: 16500, hfloor: 11000, 
    cceiling: 19000, cfloor: 9000, 
    mceiling: 8500, mfloor: 3500, 
    vceiling: 4000, vfloor: 1000, intellect: 48000};
//var reforgeParameters1 = {budget: 42000, step: 1000, floor: 3000, hceiling: 20000, hfloor: 8000, ceiling: 18000, intellect: 61000}; 
var acridReforgeParameters2 = {budget: 38000, step: 500, 
    hceiling: 175000, hfloor: 12000, 
    cceiling: 19500, cfloor: 9500, 
    mceiling: 8500, mfloor: 3500, 
    vceiling: 4000, vfloor: 1000, intellect: 67500};
//var reforgeParameters2 = {budget: 40000, step: 1000, floor: 3000, hceiling: 20000, hfloor: 8000, ceiling: 18000, intellect: 53000};
var soulAcridReforgeParameters1 = {budget: 34000, step: 500, 
    hceiling: 16500, hfloor: 11000, 
    cceiling: 16500, cfloor: 6500, 
    mceiling: 9500, mfloor: 4500, 
    vceiling: 4000, vfloor: 1000, intellect: 48000};
//var soulReforgeParameters1 = {budget: 40000, step: 1000, floor: 3000, hceiling: 20000, hfloor: 8000, ceiling: 18000, intellect: 61001}; 
var soulAcridReforgeParameters2 = {budget: 36000, step: 500, 
    hceiling: 17500, hfloor: 12000, 
    cceiling: 17000, cfloor: 7000, 
    mceiling: 9500, mfloor: 4500, 
    vceiling: 4000, vfloor: 1000, intellect: 67500};
//var soulReforgeParameters2 = {budget: 38000, step: 1000, floor: 3000, hceiling: 20000, hfloor: 8000, ceiling: 18000, intellect: 53001};  
var legendaryParameters = ["sephuz","mangaza"]//,"shahraz","zeks"]; // Soul has to be added separately because of talent issues.
//var legendaryCombinations = combineLegendaries(legendaryParameters);
var legendaryCombinations = ["mangaza;sephuz"];
console.log('Found ' + legendaryCombinations.length + ' legendary combinations.');
// Take exactly 6, where a maximum of 3 from any given trait.
var relicParameters = [779,778];
var relicCombinations = ["1573:775:775:775:775:775","1573:1573:775:775:775:775","1573:1573:1573:775:775:775","775:775:775:775:775:775"];
console.log('Found ' + relicCombinations.length + ' relic combinations.');
// 1739:3 is always required.
var crucibleParameters = [1780,1778,1779,1777,1770,1782,1783];
var crucibleCombinations = ["1739:3"];
console.log('Found ' + crucibleCombinations.length + ' crucible combinations.');
// At each step, 500 can go 1 way, with a maximum of 17000 in any single way. Aka n^3 expansion, pruning duplicates and constraint failures.
// Floor is budget force allocated each way at least. So effective budget = budget - way*floor.
// 11000 available budget, 22 steps. 22^3 = O(10,648) reforge points, including duplicates.

// Expecting 84 crucible combinations.
// Expecting 56 trait combinations.

var reforge = true;
if(reforge) {
    //var reforgeCombinations1 = combineReforge(reforgeParameters1);
    //var reforgeCombinations2 = combineReforge(reforgeParameters2);
    var acridReforgeCombinations1 = combineReforge(acridReforgeParameters1);
    var acridReforgeCombinations2 = combineReforge(acridReforgeParameters2);
    //var soulReforgeCombinations1 = combineReforge(soulReforgeParameters1);
    //var soulReforgeCombinations2 = combineReforge(soulReforgeParameters2);
    var soulAcridReforgeCombinations1 = combineReforge(soulAcridReforgeParameters1);
    var soulAcridReforgeCombinations2 = combineReforge(soulAcridReforgeParameters2);
    //var reforgeCombinations3 = combineReforge(reforgeParameters3);
    //var reforgeCombinations = reforgeCombinations1.concat(reforgeCombinations2)//.concat(reforgeCombinations3)
    var acridReforgeCombinations = acridReforgeCombinations1.concat(acridReforgeCombinations2)//.concat(reforgeCombinations3)
    //var soulReforgeCombinations = soulReforgeCombinations1.concat(soulReforgeCombinations2)//.concat(reforgeCombinations3)
    var soulAcridReforgeCombinations = soulAcridReforgeCombinations1.concat(soulAcridReforgeCombinations2)//.concat(reforgeCombinations3)
    //var reforgeCombinations = reforgeCombinations3
    //var reforgeCombinations = [["c:5000,m:5000,h:5000"],["c:2000,m:5000,h:8000"],["c:5000,m:2000,h:8000"],["c:8000,m:5000,h:2000"]]
    console.log('Found ' + (/*reforgeCombinations.length +*/ acridReforgeCombinations.length) + ' reforge combinations.');

    // Now shit gets real. We take the cartesian product of all 3 of these basically. And line-by-line add records into jobFlowData.

    var numJobs = 0;

    // Add base info
    /*
    simCombinations.forEach((sim) => {
        talentCombinations.forEach((talent) => {
            reforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                    legendaryCombinations.forEach((legendaries) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';' + legendaries + ';' + crucible + ';false\n';
                            numJobs++;
                        })
                    })
                })
            })
        })
    })*/
    simCombinations.forEach((sim) => {
        talentCombinations.forEach((talent) => {
            acridReforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                    legendaryCombinations.forEach((legendaries) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';' + legendaries + ';' + crucible + ';true\n';
                            numJobs++;
                        })
                    })
                })
            })
        })
    })
    /*
    // Soul of the High Priest
    simCombinations.forEach((sim) => {
        sothpTalentCombinations.forEach((talent) => {
            soulReforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';mangaza;soul;' + crucible + ';false\n';
                            numJobs++;
                        })
                    })
                })
        })
    })*/
    simCombinations.forEach((sim) => {
        sothpTalentCombinations.forEach((talent) => {
            soulAcridReforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';mangaza;soul;' + crucible + ';true\n';
                            numJobs++;
                        })
                })
            })
        })
    })
    /*
    // No Legendary
    simCombinations.forEach((sim) => {
        talentCombinations.forEach((talent) => {
            reforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';none;none;' + crucible + ';false\n';
                            numJobs++;
                        })
                    })
                })
        })
    })
    simCombinations.forEach((sim) => {
        talentCombinations.forEach((talent) => {
            acridReforgeCombinations.forEach((gear) => {
                relicCombinations.forEach((relic) => {
                        crucibleCombinations.forEach((crucible) => {
                            jobFlowData += sim + ';' + talent + ';' + gear + ';' + relic + ';none;none;' + crucible + ';true\n';
                            numJobs++;
                        })
                })
            })
        })
    })*/

}

console.log('Found ' + numJobs + ' jobs.');

var instances = 16;

s3.upload({
    Bucket: bucket,
    Key: 'in/input-' + guid + '.txt',
    Body: jobFlowData,
    ContentType: "text/plain",
    ACL: 'public-read'
    },function (err, data) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Successfully uploaded input data: ' + 'input-' + guid + '.txt');
        emr.runJobFlow({
            Name: "Atmasim Job Flow",
            Applications: [
                {
                    Name: "Hadoop"
                },
                {
                    Name: "Hue"
                },
                {
                    Name: "Ganglia"
                }
            ],
            Configurations: [
                {
                    Classification: "mapred-site",
                    Properties: {
                        "mapred.tasktracker.map.tasks.maximum": "2",
                        "mapreduce.job.reduce.slowstart.completedmaps": "1.0" // So I stop getting cucked by Reduce containers. Stop fucking shuffling jesus.
                    }
                }
            ],
            Instances: {
                Ec2SubnetId: "subnet-4b4bf203",
                Ec2KeyName: "magicsim", 
                KeepJobFlowAliveWhenNoSteps: false,
                TerminationProtected: true,
                InstanceGroups: [{
                    Name: "Master Instance Group",
                    InstanceRole: "MASTER",
                    InstanceCount: 1,
                    InstanceType: "m1.medium",
                    Market: "ON_DEMAND"
                }, {
                    Name: "Core Instance Group",
                    InstanceRole: "CORE",
                    InstanceCount: instances,
                    InstanceType: "c4.8xlarge",
                    Market: "ON_DEMAND"
                }]
            },
            JobFlowRole: "EMR_EC2_DefaultRole",
            ServiceRole: "EMR_DefaultRole",
            Steps: [{
                Name: "Copy Input to HDFS",
                ActionOnFailure: "TERMINATE_JOB_FLOW",
                HadoopJarStep: {
                    Jar: "command-runner.jar",
                    Args: [
                        "s3-dist-cp",
                        "--s3Endpoint=s3.amazonaws.com",
                        "--src=s3://atmasim/in",
                        "--dest=hdfs:///atmasim",
                        "--deleteOnSuccess"
                    ]
                }    
            },
                {
                Name: "Atmasim Driver",
                ActionOnFailure: "TERMINATE_JOB_FLOW",
                HadoopJarStep: {
                    Jar: "s3://atmasim/bin/atmasimDriver.jar",
                    Args: [
                        "hdfs:///atmasim/input-" + guid + ".txt" ,
                        "s3://atmasim/out/results-" + guid + "/",
                        numJobs + "", // Pretty dumb but I gotta cast it to a string explicitly.
                        (36*2*instances) + ""
                    ]
                }
            }],
            BootstrapActions: [ 
            { 
                Name: "Install SimC",
                ScriptBootstrapAction: { 
                    Path: "s3://atmasim/bin/installGate.bash"
                }
            },
            ],
            LogUri: "s3://atmasim/logs/",
            VisibleToAllUsers: false,
            ReleaseLabel: "emr-5.10.0"
        }, (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log("Successfully started cluster for job: " + data.JobFlowId);
        })
});
