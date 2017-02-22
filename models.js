var totalScaleFactor = (1.5*7.91) + (7.99/1.5);
var addScaleFactor = (7.91*1.5)/totalScaleFactor;
var bossScaleFactor = 7.99/(1.5*totalScaleFactor);
module.exports = [
    {"dispName": "Mythic+ Composite", "name": "mythicplus",
        "model": {
            '30_lowmovement_4_adds': 0.1/addScaleFactor,
            '30_lowmovement_5_adds': 0.06/addScaleFactor,
            '50_lowmovement_3_adds': 0.15/addScaleFactor,
            '50_lowmovement_4_adds': 0.22/addScaleFactor,
            '50_lowmovement_5_adds': 0.22/addScaleFactor,
            '55_lowmovement_3_adds': 0.15/addScaleFactor,
            '55_lowmovement_4_adds': 0.3/addScaleFactor,
            '55_lowmovement_5_adds': 0.29/addScaleFactor,
            '60_lowmovement_3_adds': 0.14/addScaleFactor,
            '60_lowmovement_4_adds': 0.23/addScaleFactor,
            '60_lowmovement_5_adds': 0.12/addScaleFactor,
            '30_patchwerk_4_adds': 0.3/addScaleFactor,
            '30_patchwerk_5_adds': 0.19/addScaleFactor,
            '50_patchwerk_3_adds': 0.45/addScaleFactor,
            '50_patchwerk_4_adds': 0.66/addScaleFactor,
            '50_patchwerk_5_adds': 0.66/addScaleFactor,
            '55_patchwerk_3_adds': 0.45/addScaleFactor,
            '55_patchwerk_4_adds': 0.9/addScaleFactor,
            '55_patchwerk_5_adds': 0.86/addScaleFactor,
            '60_patchwerk_3_adds': 0.41/addScaleFactor,
            '60_patchwerk_4_adds': 0.69/addScaleFactor,
            '60_patchwerk_5_adds': 0.36/addScaleFactor,
            patchwerk_ba_st: 0.33/bossScaleFactor,
            patchwerk_na_st: 1.43/bossScaleFactor,
            lowmovement_ba_st: 1.86/bossScaleFactor,
            lowmovement_na_2t: 0.58/bossScaleFactor,
            lowmovement_na_st: 1.2/bossScaleFactor,
            highmovement_ba_st: 0.2/bossScaleFactor,
            highmovement_na_2t: 0.2/bossScaleFactor,
            highmovement_na_st: 2.17/bossScaleFactor
        }
    },
    {   "dispName": "Skorpyron", "name": "skorpyron",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0.1,
            patchwerk_sa_st: 0.1,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0.55,
            lowmovement_na_2t: 0.25,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Chronomatic Anomaly", "name": "anomaly",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0.2,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0.8,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Trilliax", "name": "trilliax",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0.3,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0.7,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Spellblade Aluriel", "name": "aluriel",
        "model": {
            patchwerk_ba_2t: 0.1,
            patchwerk_ba_st: 0.25,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0.65,
            lowmovement_ba_st: 0,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Tichondrius", "name": "tichondrius",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0.65,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0.35,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "High Botanist Tel'arn", "name": "botanist",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0.6,
            lowmovement_ba_st: 0,
            lowmovement_sa_2t: 0.25,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0.15,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Star Augur Etraeus", "name": "augur",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0.35,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0.65,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Krosus", "name": "krosus",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0.4,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0.6,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Grand Magistrix Elisande", "name": "elisande",
        "model": {
            patchwerk_ba_2t: 0,
            patchwerk_ba_st: 0,
            patchwerk_sa_2t: 0,
            patchwerk_sa_st: 0,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0,
            lowmovement_ba_2t: 0.3,
            lowmovement_ba_st: 0.6,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0.1,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Gul'dan", "name": "guldan",
        "model": {
            patchwerk_ba_2t: 0.15,
            patchwerk_ba_st: 0.15,
            patchwerk_sa_2t: 0.1,
            patchwerk_sa_st: 0.2,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0.1,
            lowmovement_ba_2t: 0,
            lowmovement_ba_st: 0.1,
            lowmovement_sa_2t: 0,
            lowmovement_sa_st: 0,
            lowmovement_na_2t: 0.2,
            lowmovement_na_st: 0,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0,
            highmovement_sa_2t: 0,
            highmovement_sa_st: 0,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    },
    {"dispName": "Nighthold Composite", "name": "nighthold",
        "model": {
            patchwerk_ba_2t: 0.025,
            patchwerk_ba_st: 0.07,
            patchwerk_sa_2t: 0.02,
            patchwerk_sa_st: 0.07,
            patchwerk_na_2t: 0,
            patchwerk_na_st: 0.07,
            lowmovement_ba_2t: 0.155,
            lowmovement_ba_st: 0.195,
            lowmovement_sa_2t: 0.05,
            lowmovement_sa_st: 0.12,
            lowmovement_na_2t: 0.03,
            lowmovement_na_st: 0.065,
            highmovement_ba_2t: 0,
            highmovement_ba_st: 0.08,
            highmovement_sa_2t: 0.015,
            highmovement_sa_st: 0.035,
            highmovement_na_2t: 0,
            highmovement_na_st: 0
        }
    }
]