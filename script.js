// http-server -c-1
var draftedPPG = 0;
var draftedSeason = 0;
var optimalPPG = Number(0);
var optimalSeason = Number(0);
var thisHolder = "";
var roundNumber = Number(18);
var roundText = "Round " + roundNumber;
var ADP = Number(259);
var fullNames = true;

document.querySelector("form").addEventListener("submit", checkSubmit);

function checkSubmit(event)
{
    event.preventDefault();
    $(".player").each(function() {
        if ($(this).val().length == 0) {
            fullNames = false;
        }
    })
    if (fullNames) {
        fantasyCheck();
    }
}

$("#qbcount")
  .on( "change", function() {
    console.log($("#qbvalue").val());
    $(".qbdiv").empty();
    for (let qbs = 0; qbs < $("#qbvalue").val(); qbs++) {
        $( ".qbdiv" ).append("<input type='text' placeholder='QB' class='form-control qb' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#rbcount")
  .on( "change", function() {
    console.log($("#rbvalue").val());
    $(".rbdiv").empty();
    for (let rbs = 0; rbs < $("#rbvalue").val(); rbs++) {
        $( ".rbdiv" ).append("<input type='text' placeholder='RB' class='form-control rb' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#wrcount")
  .on( "change", function() {
    console.log($("#wrvalue").val());
    $(".wrdiv").empty();
    for (let wrs = 0; wrs < $("#wrvalue").val(); wrs++) {
        $( ".wrdiv" ).append("<input type='text' placeholder='WR' class='form-control wr' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#tecount")
  .on( "change", function() {
    console.log($("#tevalue").val());
    $(".tediv").empty();
    for (let tes = 0; tes < $("#tevalue").val(); tes++) {
        $( ".tediv" ).append("<input type='text' placeholder='TE' class='form-control te' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#flexcount")
  .on( "change", function() {
    console.log($("#flexvalue").val());
    $(".flexdiv").empty();
    for (let flexs = 0; flexs < $("#flexvalue").val(); flexs++) {
        $( ".flexdiv" ).append("<input type='text' placeholder='FLEX' class='form-control flex' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#kcount")
  .on( "change", function() {
    console.log($("#kvalue").val());
    $(".kdiv").empty();
    for (let kickers = 0; kickers < $("#kvalue").val(); kickers++) {
        $( ".kdiv" ).append("<input type='text' placeholder='K' class='form-control k' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#dstcount")
  .on( "change", function() {
    console.log($("#dstvalue").val());
    $(".dstdiv").empty();
    for (let defenses = 0; defenses < $("#dstvalue").val(); defenses++) {
        $( ".dstdiv" ).append("<input type='text' placeholder='DST' class='form-control dst' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

$("#benchcount")
  .on( "change", function() {
    console.log($("#benchvalue").val());
    $(".benchdiv").empty();
    for (let benches = 0; benches < $("#benchvalue").val(); benches++) {
        $( ".benchdiv" ).append("<input type='text' placeholder='Bench' class='form-control bench' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
    roundAdjust();
} )

function roundAdjust() {
    $(".draftOrder").empty();
    $(".optimalTeam").empty();
    roundNumber = Number($("#qbvalue").val()) + Number($("#rbvalue").val()) + Number($("#wrvalue").val()) + Number($("#tevalue").val()) + Number($("#flexvalue").val()) + Number($("#kvalue").val()) + Number($("#dstvalue").val()) + Number($("#benchvalue").val());
    roundText = "Round " + 1;
    for (let picks = 1; picks <= roundNumber; picks++) {
        roundText = "Round " + picks;
        $(".draftOrder").append("<input type='text' placeholder={roundText} class='form-control round player' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
        $(".round").last().attr("placeholder", roundText);
        $(".optimalTeam").append("<input type='text' class='form-control optimal' aria-label='Small' aria-describedby='inputGroup-sizing-sm' readonly />")
    }
}

function bestPossible(position, pick) {
    var foundBelow = false;
    if (position != "Bench") {
        var correctFile = position + ".json";
        $.getJSON(correctFile, async function(positionJSON) {
            for (let player = 0; player < Object.keys(positionJSON).length; player++) {
                console.log(Object.keys(positionJSON).length);
                $.getJSON("ADP.json", function(adpJSON) {
                    for (let check = 0; check < Object.keys(adpJSON).length; check++) {
                        if (adpJSON[check]["Name"] == positionJSON[player]["Name"]) {
                            console.log(player);
                            console.log(adpJSON[check]["Name"]);
                            console.log(adpJSON[check]["Rank"]);
                            console.log(pick);
                            if (adpJSON[check]["Rank"] >= pick || adpJSON[check]["Rank"] === undefined) {
                                console.log("Found below.");
                                $(".optimal").each(function() {
                                    if ($(this).val().length == 0) {
                                        $(this).val(String(positionJSON[player]["Name"]));
                                        return false;
                                    }
                                })
                                optimalPPG = optimalPPG + Number(positionJSON[player]["PPG"]);
                                optimalSeason = optimalSeason + Number(positionJSON[player]["Season"]);
                                foundBelow = true;
                                player = 1000;
                                check = 1000;
                                console.log(player);
                                console.log(check);
                                break;
                            }
                            console.log("No more what ifs.");
                            break;
                        }
                    }
                });
                await new Promise(done => setTimeout(() => done(), 100));
                if (foundBelow) {
                    break;
                }
            }
        });
    } else {
        $.getJSON("PPR.json", async function(positionJSON) {
            for (let player = 0; player < Object.keys(positionJSON).length; player++) {
                console.log(Object.keys(positionJSON).length);
                $.getJSON("ADP.json", function(adpJSON) {
                    for (let check = 0; check < Object.keys(adpJSON).length; check++) {
                        if (adpJSON[check]["Name"] == positionJSON[player]["Name"]) {
                            console.log(player);
                            console.log(adpJSON[check]["Name"]);
                            console.log(adpJSON[check]["Rank"]);
                            console.log(pick);
                            if (adpJSON[check]["Rank"] >= pick || adpJSON[check]["Rank"] === undefined) {
                                console.log("Found below.");
                                $(".optimal").each(function() {
                                    if ($(this).val().length == 0) {
                                        $(this).val(String(positionJSON[player]["Name"]));
                                        return false;
                                    }
                                })
                                optimalPPG = optimalPPG + Number(positionJSON[player]["PPG"]);
                                optimalSeason = optimalSeason + Number(positionJSON[player]["Season"]);
                                foundBelow = true;
                                player = 1000;
                                check = 1000;
                                console.log(player);
                                console.log(check);
                                break;
                            }
                            console.log("No more what ifs.");
                            break;
                        }
                    }
                });
                await new Promise(done => setTimeout(() => done(), 100));
                if (foundBelow) {
                    break;
                }
            }
        });
    }
}

function findMatch(name) {
    var currentPick = Number($("#pickvalue").val());
    var initialPick = Number(currentPick);
    var currentRound = Number(1);
    $(".round").each(function(){
        console.log($(this).val());
        console.log(name);
        console.log(currentPick);
        if ($(this).val() == name) {
            console.log("Match found at Pick " + currentPick);
            return false;
        }
        else {
            currentRound++;
            currentPick = nextPick(currentRound, Number(initialPick));
        }
    })
    return currentPick;
}

function nextPick(round, pick) {
    if (round % 2 == 0) {
        return 12 * round - pick + 1;
    } else {
        return 12 * (round - 1) + pick;
    }
}

async function fantasyCheck() {
    draftedPPG = 0;
    draftedSeason = 0;
    optimalPPG = 0;
    optimalSeason = 0;
    $(".qb").each(function(){
        thisHolder = $(this).val();
        var qbCopy = thisHolder;
        $.getJSON("QB.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == qbCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                    console.log("success");
                }
            }
        });
        console.log(qbCopy);
        ADP = findMatch(qbCopy);
        console.log(ADP);
        if (ADP != 1000) {
            bestPossible("QB", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
        // currentPick = $(".pickvalue").val();
        // initialPick = currentPick;
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".rb").each(function(){
        thisHolder = $(this).val();
        var rbCopy = thisHolder;
        $.getJSON("RB.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == rbCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(rbCopy);
        console.log(ADP);
        if (ADP != 1000) {
            bestPossible("RB", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 2000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".wr").each(function(){
        thisHolder = $(this).val();
        var wrCopy = thisHolder;
        $.getJSON("WR.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == wrCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(wrCopy);
        console.log(ADP);
        if (ADP != 1000) {
            bestPossible("WR", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".te").each(function(){
        thisHolder = $(this).val();
        var teCopy = thisHolder;
        $.getJSON("TE.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == teCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(teCopy);
        if (ADP != 1000) {
            bestPossible("TE", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".flex").each(function(){
        thisHolder = $(this).val();
        var flexCopy = thisHolder;
        $.getJSON("FLEX.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == flexCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(flexCopy);
        if (ADP != 1000) {
            bestPossible("FLEX", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".k").each(function(){
        thisHolder = $(this).val();
        var kCopy = thisHolder;
        $.getJSON("K.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == kCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(kCopy);
        if (ADP != 1000) {
            bestPossible("K", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".dst").each(function(){
        thisHolder = $(this).val();
        var dstCopy = thisHolder;
        $.getJSON("DST.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == dstCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(dstCopy);
        if (ADP != 1000) {
            bestPossible("DST", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 100));
    $(".bench").each(function(){
        thisHolder = $(this).val();
        var benchCopy = thisHolder;
        $.getJSON("PPR.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == benchCopy) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
        ADP = findMatch(benchCopy);
        if (ADP != 1000) {
            bestPossible("Bench", ADP);
        } else {
            console.log("Error: Unmatched names.");
            return;
        }
        setTimeout(() => {
            console.log(optimalPPG);
            console.log(optimalSeason);
        }, 1000);
    })
    await new Promise(done => setTimeout(() => done(), 200));
    $("#draftPPG").text("Drafted PPG: " + draftedPPG.toFixed(2));
    $("#draftSeason").text("Drafted Season: " + draftedSeason.toFixed(2));
    $("#optimalPPG").text("Optimal PPG: " + optimalPPG.toFixed(2));
    $("#optimalSeason").text("Optimal Season: " + optimalSeason.toFixed(2));
    $("#PPGPercent").text("PPG Percent: " + (draftedPPG / optimalPPG).toFixed(2));
    $("#seasonPercent").text("Season Percent: " + (draftedSeason / optimalSeason).toFixed(2));
}

function fantasyCalculate(fantasyJSON) {
    $.getJSON(fantasyJSON, function(checkJSON) {
        for (let check = 0; check < Object.keys(checkJSON).length; check++) {
            if (checkJSON[check]["Name"] == $("#class-choice").val() && $("#promotion-choice").val() != "Never") {
                HP = HP - checkJSON[check]["HP"];
                SM = SM - checkJSON[check]["S/M"];
                Skl = Skl - checkJSON[check]["Skl"];
                Spd = Spd - checkJSON[check]["Spd"];
                Def = Def - checkJSON[check]["Def"];
                Res = Res - checkJSON[check]["Res"];
            }
        }
    });
}
