// http-server -c-1
var para;
var node;
var characterElement = document.getElementById("character-choice");
var classElement = document.getElementById("class-choice");
var g = 0;
var unluckyOrLucky = 0;
var HP, SM, Skl, Spd, Luck, Def, Res, HPProb, SMProb, SklProb, SpdProb, LuckProb, DefProb, ResProb;
var thirdTier = 0;
var inputCheck = true;
var draftedPPG = 0;
var draftedSeason = 0;
var optimalPPG = 0;
var optimalSeason = 0;

$("#qbcount")
  .on( "change", function() {
    console.log($("#qbvalue").val());
    $(".qbdiv").empty();
    for (let qbs = 0; qbs < $("#qbvalue").val(); qbs++) {
        $( ".qbdiv" ).append("<input type='text' placeholder='QB' class='form-control qb' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#rbcount")
  .on( "change", function() {
    console.log($("#rbvalue").val());
    $(".rbdiv").empty();
    for (let rbs = 0; rbs < $("#rbvalue").val(); rbs++) {
        $( ".rbdiv" ).append("<input type='text' placeholder='RB' class='form-control rb' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#wrcount")
  .on( "change", function() {
    console.log($("#wrvalue").val());
    $(".wrdiv").empty();
    for (let wrs = 0; wrs < $("#wrvalue").val(); wrs++) {
        $( ".wrdiv" ).append("<input type='text' placeholder='WR' class='form-control wr' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#tecount")
  .on( "change", function() {
    console.log($("#tevalue").val());
    $(".tediv").empty();
    for (let tes = 0; tes < $("#tevalue").val(); tes++) {
        $( ".tediv" ).append("<input type='text' placeholder='TE' class='form-control te' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#flexcount")
  .on( "change", function() {
    console.log($("#flexvalue").val());
    $(".flexdiv").empty();
    for (let flexs = 0; flexs < $("#flexvalue").val(); flexs++) {
        $( ".flexdiv" ).append("<input type='text' placeholder='FLEX' class='form-control flex' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#kcount")
  .on( "change", function() {
    console.log($("#kvalue").val());
    $(".kdiv").empty();
    for (let kickers = 0; kickers < $("#kvalue").val(); kickers++) {
        $( ".kdiv" ).append("<input type='text' placeholder='K' class='form-control k' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#dstcount")
  .on( "change", function() {
    console.log($("#dstvalue").val());
    $(".dstdiv").empty();
    for (let defenses = 0; defenses < $("#dstvalue").val(); defenses++) {
        $( ".dstdiv" ).append("<input type='text' placeholder='DST' class='form-control dst' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

$("#benchcount")
  .on( "change", function() {
    console.log($("#benchvalue").val());
    $(".benchdiv").empty();
    for (let benches = 0; benches < $("#benchvalue").val(); benches++) {
        $( ".benchdiv" ).append("<input type='text' placeholder='Bench' class='form-control bench' aria-label='Small' aria-describedby='inputGroup-sizing-sm' required>");
    }
} )

function fantasyCheck() {
    $(".qb").each(function(){
        $.getJSON("QB.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".rb").each(function(){
        $.getJSON("RB.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".wr").each(function(){
        $.getJSON("WR.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".te").each(function(){
        $.getJSON("TE.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".flex").each(function(){
        $.getJSON("FLEX.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".k").each(function(){
        $.getJSON("K.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".dst").each(function(){
        $.getJSON("DST.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    $(".bench").each(function(){
        $.getJSON("PPR.json", function(checkJSON) {
            for (let check = 0; check < Object.keys(checkJSON).length; check++) {
                if (checkJSON[check]["Name"] == $(this).val()) {
                    draftedPPG = draftedPPG + checkJSON[check]["PPG"];
                    draftedSeason = draftedSeason + checkJSON[check]["Season"];
                }
            }
        });
    })
    console.log(draftedPPG);
    console.log(draftedSeason);
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

$.getJSON("FE6Class.json", function(FE6StatSubtraction) {
    for (let check = 0; check < Object.keys(FE6StatSubtraction).length; check++) {
        if (FE6StatSubtraction[check]["Class"] == $("#class-choice").val() && $("#promotion-choice").val() != "Never") {
            HP = HP - FE6StatSubtraction[check]["HP"];
            SM = SM - FE6StatSubtraction[check]["S/M"];
            Skl = Skl - FE6StatSubtraction[check]["Skl"];
            Spd = Spd - FE6StatSubtraction[check]["Spd"];
            Def = Def - FE6StatSubtraction[check]["Def"];
            Res = Res - FE6StatSubtraction[check]["Res"];
        }
    }
});
addFE6();

function addCharacters(game) {
    if (game.options[game.selectedIndex].value == "The Binding Blade") {
        addFE6();
    } else if (game.options[game.selectedIndex].value == "Blazing Sword(Lyn Mode)") {
        addFE7L();
    } else if (game.options[game.selectedIndex].value == "Blazing Sword(Eliwood/Hector Mode)") {
        addFE7EH();
    } else if (game.options[game.selectedIndex].value == "The Sacred Stones") {
        addFE8();
    }
}

function addFE6() {
    $("#character-choice option").remove();
    $.getJSON("FE6.json", function(FE6json) {
        for (let index = 0; index < FE6json.length; index++) {
            para = document.createElement("option");
            node = document.createTextNode(FE6json[index]["Name"]);
            para.appendChild(node);
            characterElement.appendChild(para);
        }
    });
    $("#class-choice option").remove();
    $.getJSON("FE6Class.json", function(FE6Classjson) {
        for (let z = 0; z < FE6Classjson.length; z++) {
            para = document.createElement("option");
            node = document.createTextNode(FE6Classjson[z]["Class"]);
            para.appendChild(node);
            classElement.appendChild(para);
        }
    });
    g = 0;
}

function addFE7L() {
    $("#character-choice option").remove();
    $.getJSON("FE7L.json", function(FE7Ljson) {
        for (let index = 0; index < FE7Ljson.length; index++) {
            para = document.createElement("option");
            node = document.createTextNode(FE7Ljson[index]["Name"]);
            para.appendChild(node);
            characterElement.appendChild(para);
        }
    });
    $("#class-choice option").remove();
    $.getJSON("FE7Class.json", function(FE7Classjson) {
        for (let z = 0; z < FE7Classjson.length; z++) {
            para = document.createElement("option");
            node = document.createTextNode(FE7Classjson[z]["Class"]);
            para.appendChild(node);
            classElement.appendChild(para);
        }
    });
    g = 1;
}

function addFE7EH() {
    $("#character-choice option").remove();
    $.getJSON("FE7EH.json", function(FE7EHjson) {
        for (let index = 0; index < FE7EHjson.length; index++) {
            para = document.createElement("option");
            node = document.createTextNode(FE7EHjson[index]["Name"]);
            para.appendChild(node);
            characterElement.appendChild(para);
        }
    });
    $("#class-choice option").remove();
    $.getJSON("FE7Class.json", function(FE7Classjson) {
        for (let z = 0; z < FE7Classjson.length; z++) {
            para = document.createElement("option");
            node = document.createTextNode(FE7Classjson[z]["Class"]);
            para.appendChild(node);
            classElement.appendChild(para);
        }
    });
    g = 1;
}

function addFE8() {
    $("#character-choice option").remove();
    $.getJSON("FE8.json", function(FE8json) {
        for (let index = 0; index < FE8json.length; index++) {
            para = document.createElement("option");
            node = document.createTextNode(FE8json[index]["Name"]);
            para.appendChild(node);
            characterElement.appendChild(para);
        }
    });
    $("#class-choice option").remove();
    $.getJSON("FE8Class.json", function(FE8Classjson) {
        for (let z = 0; z < FE8Classjson.length; z++) {
            para = document.createElement("option");
            node = document.createTextNode(FE8Classjson[z]["Class"]);
            para.appendChild(node);
            classElement.appendChild(para);
        }
    });
    g = 2;
}

function characterFilterFunction() {
    var input, filter, option, i;
    input = document.getElementById("myCharacterInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("character-choice");
    option = div.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    }
}

function classFilterFunction() {
    var input, filter, option, i;
    input = document.getElementById("myClassInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("class-choice");
    option = div.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    } 
}

function calculateLuckyProbabilities() {
    unluckyOrLucky = 0;
    findBaseStats();
    setTimeout(function(){ probabilityCalculation(); }, 300);
    setTimeout(function(){ showResults(); }, 500);
}

function calculateUnluckyProbabilities() {
    unluckyOrLucky = 1; 
    findBaseStats();
    setTimeout(function(){ probabilityCalculation(); }, 300);
    setTimeout(function(){ showResults(); }, 500);
}

function oneMinus(og) {
    var inverse = 1 - og;
    return inverse;
}

function product_Range(a, b) {
    var prd = a; 
    var i = a;
    while (i++ < b) {
      prd *= i;
    }
    return prd;
}
  
  
function combinations(n, r) {
    if (n == r) {
        return 1;
    } else {
        r = (r < n - r) ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
    }
}

function binomialCalculation(n, x, p) {
    // Calculates cdf, but takes how lucky you got, not unlucky.
    if (x < 0) {
        return 0;
    }
    if (n < 1) {
        return "Input error.";
    }
    q = 1 - p;
    var binomialProbability = 0;
    for (let cdf = x; cdf < n + 1; cdf++) {
        y = n - cdf;
        binomialProbability = binomialProbability + combinations(n, cdf) * p ** cdf * q ** y;
    }
    binomialProbability = binomialProbability.toFixed(3);
    if (unluckyOrLucky == 1) {
        y = n - x;
        binomialProbability = (1 - parseFloat(binomialProbability) + combinations(n, x) * p ** x * q ** y).toFixed(3);
    }
    return binomialProbability;
}

function findBaseStats() {
    HP = $("#HP").val();
    SM = $("#StrMag").val();
    Skl = $("#Skill").val();
    Spd = $("#Speed").val();
    Luck = $("#Luck").val();
    Def = $("#Defense").val();
    Res = $("#Resistance").val();
    if (g == 0) {
        $.getJSON("FE6Class.json", function(FE6StatSubtraction) {
            for (let check = 0; check < Object.keys(FE6StatSubtraction).length; check++) {
                if (FE6StatSubtraction[check]["Class"] == $("#class-choice").val() && $("#promotion-choice").val() != "Never") {
                    HP = HP - FE6StatSubtraction[check]["HP"];
                    SM = SM - FE6StatSubtraction[check]["S/M"];
                    Skl = Skl - FE6StatSubtraction[check]["Skl"];
                    Spd = Spd - FE6StatSubtraction[check]["Spd"];
                    Def = Def - FE6StatSubtraction[check]["Def"];
                    Res = Res - FE6StatSubtraction[check]["Res"];
                }
            }
        });
    } else if (g == 1) {
        $.getJSON("FE7Class.json", function(FE7StatSubtraction) {
            for (let check = 0; check < Object.keys(FE7StatSubtraction).length; check++) {
                if (FE7StatSubtraction[check]["Class"] == $("#class-choice").val() && $("#promotion-choice").val() != "Never") {
                    HP = HP - FE7StatSubtraction[check]["HP"];
                    SM = SM - FE7StatSubtraction[check]["S/M"];
                    Skl = Skl - FE7StatSubtraction[check]["Skl"];
                    Spd = Spd - FE7StatSubtraction[check]["Spd"];
                    Def = Def - FE7StatSubtraction[check]["Def"];
                    Res = Res - FE7StatSubtraction[check]["Res"];
                }
            }
        });
    } else if (g == 2) {
        $.getJSON("FE8Class.json", function(FE8StatSubtraction) {
            for (let check = 0; check < Object.keys(FE8StatSubtraction).length; check++) {
                if (FE8StatSubtraction[check]["Class"] == $("#class-choice").val() && $("#promotion-choice").val() != "Never") {
                    HP = HP - FE8StatSubtraction[check]["HP"];
                    SM = SM - FE8StatSubtraction[check]["S/M"];
                    Skl = Skl - FE8StatSubtraction[check]["Skl"];
                    Spd = Spd - FE8StatSubtraction[check]["Spd"];
                    Def = Def - FE8StatSubtraction[check]["Def"];
                    Res = Res - FE8StatSubtraction[check]["Res"];
                    if (check == 33) {
                        HP = HP - FE8StatSubtraction[7]["HP"];
                        SM = SM - FE8StatSubtraction[7]["S/M"];
                        Skl = Skl - FE8StatSubtraction[7]["Skl"];
                        Spd = Spd - FE8StatSubtraction[7]["Spd"];
                        Def = Def - FE8StatSubtraction[7]["Def"];
                        Res = Res - FE8StatSubtraction[7]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 34) {
                        HP = HP - FE8StatSubtraction[5]["HP"];
                        SM = SM - FE8StatSubtraction[5]["S/M"];
                        Skl = Skl - FE8StatSubtraction[5]["Skl"];
                        Spd = Spd - FE8StatSubtraction[5]["Spd"];
                        Def = Def - FE8StatSubtraction[5]["Def"];
                        Res = Res - FE8StatSubtraction[5]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 31 && $("#character-choice").val() == "Amelia") {
                        HP = HP - FE8StatSubtraction[5]["HP"];
                        SM = SM - FE8StatSubtraction[5]["S/M"];
                        Skl = Skl - FE8StatSubtraction[5]["Skl"];
                        Spd = Spd - FE8StatSubtraction[5]["Spd"];
                        Def = Def - FE8StatSubtraction[5]["Def"];
                        Res = Res - FE8StatSubtraction[5]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 53 && $("#character-choice").val() == "Ewan") {
                        HP = HP - FE8StatSubtraction[15]["HP"];
                        SM = SM - FE8StatSubtraction[15]["S/M"];
                        Skl = Skl - FE8StatSubtraction[15]["Skl"];
                        Spd = Spd - FE8StatSubtraction[15]["Spd"];
                        Def = Def - FE8StatSubtraction[15]["Def"];
                        Res = Res - FE8StatSubtraction[15]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 55 && $("#character-choice").val() == "Ewan") {
                        HP = HP - FE8StatSubtraction[17]["HP"];
                        SM = SM - FE8StatSubtraction[17]["S/M"];
                        Skl = Skl - FE8StatSubtraction[17]["Skl"];
                        Spd = Spd - FE8StatSubtraction[17]["Spd"];
                        Def = Def - FE8StatSubtraction[17]["Def"];
                        Res = Res - FE8StatSubtraction[17]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 56 && $("#character-choice").val() == "Ewan") {
                        HP = HP - FE8StatSubtraction[17]["HP"];
                        SM = SM - FE8StatSubtraction[17]["S/M"];
                        Skl = Skl - FE8StatSubtraction[17]["Skl"];
                        Spd = Spd - FE8StatSubtraction[17]["Spd"];
                        Def = Def - FE8StatSubtraction[17]["Def"];
                        Res = Res - FE8StatSubtraction[17]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 38 && $("#character-choice").val() == "Ross") {
                        HP = HP - FE8StatSubtraction[23]["HP"];
                        SM = SM - FE8StatSubtraction[23]["S/M"];
                        Skl = Skl - FE8StatSubtraction[23]["Skl"];
                        Spd = Spd - FE8StatSubtraction[23]["Spd"];
                        Def = Def - FE8StatSubtraction[23]["Def"];
                        Res = Res - FE8StatSubtraction[23]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 61) {
                        HP = HP - FE8StatSubtraction[23]["HP"];
                        SM = SM - FE8StatSubtraction[23]["S/M"];
                        Skl = Skl - FE8StatSubtraction[23]["Skl"];
                        Spd = Spd - FE8StatSubtraction[23]["Spd"];
                        Def = Def - FE8StatSubtraction[23]["Def"];
                        Res = Res - FE8StatSubtraction[23]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 62) {
                        HP = HP - FE8StatSubtraction[25]["HP"];
                        SM = SM - FE8StatSubtraction[25]["S/M"];
                        Skl = Skl - FE8StatSubtraction[25]["Skl"];
                        Spd = Spd - FE8StatSubtraction[25]["Spd"];
                        Def = Def - FE8StatSubtraction[25]["Def"];
                        Res = Res - FE8StatSubtraction[25]["Res"];
                        thirdTier = 1;
                    }
                    if (check == 63 && $("#character-choice").val() == "Ross") {
                        HP = HP - FE8StatSubtraction[25]["HP"];
                        SM = SM - FE8StatSubtraction[25]["S/M"];
                        Skl = Skl - FE8StatSubtraction[25]["Skl"];
                        Spd = Spd - FE8StatSubtraction[25]["Spd"];
                        Def = Def - FE8StatSubtraction[25]["Def"];
                        Res = Res - FE8StatSubtraction[25]["Res"];
                        thirdTier = 1;
                    }
                }
            }
        });
    }
}

function probabilityCalculation() {
    var numberOfLevels, HPSuccesses, SMSuccesses, SklSuccesses, SpdSuccesses, LuckSuccesses, DefSuccesses, ResSuccesses;
    if (g == 0) {
        $.getJSON("FE6.json", function(FE6StatCalculation) {
            for (let c = 0; c < Object.keys(FE6StatCalculation).length; c++) { 
                if (FE6StatCalculation[c]["Name"] == $("#character-choice").val()) {
                    HPSuccesses = HP - FE6StatCalculation[c]["HP Base"];
                    SMSuccesses = SM - FE6StatCalculation[c]["S/M Base"];
                    SklSuccesses = Skl - FE6StatCalculation[c]["Skl Base"];
                    SpdSuccesses = Spd - FE6StatCalculation[c]["Spd Base"];
                    LuckSuccesses = Luck - FE6StatCalculation[c]["Lck Base"];
                    DefSuccesses = Def - FE6StatCalculation[c]["Def Base"];
                    ResSuccesses = Res - FE6StatCalculation[c]["Res Base"];
                    numberOfLevels = parseInt($("#level-choice").val()) - FE6StatCalculation[c]["Lv"];
                    if ($("#promotion-choice").val() != "Never") {
                        numberOfLevels = numberOfLevels + parseInt($("#promotion-choice").val()) - 1;
                    }
                    HPProb = binomialCalculation(numberOfLevels, HPSuccesses, FE6StatCalculation[c]["HP Growth"] / 100);
                    SMProb = binomialCalculation(numberOfLevels, SMSuccesses, FE6StatCalculation[c]["S/M Growth"] / 100);
                    SklProb = binomialCalculation(numberOfLevels, SklSuccesses, FE6StatCalculation[c]["Skl Growth"] / 100);
                    SpdProb = binomialCalculation(numberOfLevels, SpdSuccesses, FE6StatCalculation[c]["Spd Growth"] / 100);
                    LuckProb = binomialCalculation(numberOfLevels, LuckSuccesses, FE6StatCalculation[c]["Lck Growth"] / 100);
                    DefProb = binomialCalculation(numberOfLevels, DefSuccesses, FE6StatCalculation[c]["Def Growth"] / 100);
                    ResProb = binomialCalculation(numberOfLevels, ResSuccesses, FE6StatCalculation[c]["Res Growth"] / 100);
                }
            }
        });
    } else if (g == 1) {
        $.getJSON("FE7EH.json", function(FE7StatCalculation) {
            for (let c = 0; c < Object.keys(FE7StatCalculation).length; c++) {
                if (FE7StatCalculation[c]["Name"] == $("#character-choice").val()) {
                    HPSuccesses = HP - FE7StatCalculation[c]["HP Base"];
                    SMSuccesses = SM - FE7StatCalculation[c]["S/M Base"];
                    SklSuccesses = Skl - FE7StatCalculation[c]["Skl Base"];
                    SpdSuccesses = Spd - FE7StatCalculation[c]["Spd Base"];
                    LuckSuccesses = Luck - FE7StatCalculation[c]["Lck Base"];
                    DefSuccesses = Def - FE7StatCalculation[c]["Def Base"];
                    ResSuccesses = Res - FE7StatCalculation[c]["Res Base"];
                    numberOfLevels = parseInt($("#level-choice").val()) - FE7StatCalculation[c]["Lv"];
                    if ($("#promotion-choice").val() != "Never") {
                        numberOfLevels = numberOfLevels + parseInt($("#promotion-choice").val()) - 1;
                    }
                    HPProb = binomialCalculation(numberOfLevels, HPSuccesses, FE7StatCalculation[c]["HP Growth"] / 100);
                    SMProb = binomialCalculation(numberOfLevels, SMSuccesses, FE7StatCalculation[c]["S/M Growth"] / 100);
                    SklProb = binomialCalculation(numberOfLevels, SklSuccesses, FE7StatCalculation[c]["Skl Growth"] / 100);
                    SpdProb = binomialCalculation(numberOfLevels, SpdSuccesses, FE7StatCalculation[c]["Spd Growth"] / 100);
                    LuckProb = binomialCalculation(numberOfLevels, LuckSuccesses, FE7StatCalculation[c]["Lck Growth"] / 100);
                    DefProb = binomialCalculation(numberOfLevels, DefSuccesses, FE7StatCalculation[c]["Def Growth"] / 100);
                    ResProb = binomialCalculation(numberOfLevels, ResSuccesses, FE7StatCalculation[c]["Res Growth"] / 100);
                }
            }
        });
    } else if (g == 2) {
        $.getJSON("FE8.json", function(FE8StatCalculation) {
            for (let c = 0; c < Object.keys(FE8StatCalculation).length; c++) {
                if (FE8StatCalculation[c]["Name"] == $("#character-choice").val()) {
                    HPSuccesses = HP - FE8StatCalculation[c]["HP Base"];
                    SMSuccesses = SM - FE8StatCalculation[c]["S/M Base"];
                    SklSuccesses = Skl - FE8StatCalculation[c]["Skl Base"];
                    SpdSuccesses = Spd - FE8StatCalculation[c]["Spd Base"];
                    LuckSuccesses = Luck - FE8StatCalculation[c]["Lck Base"];
                    DefSuccesses = Def - FE8StatCalculation[c]["Def Base"];
                    ResSuccesses = Res - FE8StatCalculation[c]["Res Base"];
                    numberOfLevels = parseInt($("#level-choice").val()) - FE8StatCalculation[c]["Lv"];
                    if ($("#promotion-choice").val() != "Never") {
                        numberOfLevels = numberOfLevels + parseInt($("#promotion-choice").val()) - 1;
                        if (thirdTier == 1) {
                            numberOfLevels = numberOfLevels + 9;
                        }
                    }
                    thirdTier = 0;
                    HPProb = binomialCalculation(numberOfLevels, HPSuccesses, FE8StatCalculation[c]["HP Growth"] / 100);
                    SMProb = binomialCalculation(numberOfLevels, SMSuccesses, FE8StatCalculation[c]["S/M Growth"] / 100);
                    SklProb = binomialCalculation(numberOfLevels, SklSuccesses, FE8StatCalculation[c]["Skl Growth"] / 100);
                    SpdProb = binomialCalculation(numberOfLevels, SpdSuccesses, FE8StatCalculation[c]["Spd Growth"] / 100);
                    LuckProb = binomialCalculation(numberOfLevels, LuckSuccesses, FE8StatCalculation[c]["Lck Growth"] / 100);
                    DefProb = binomialCalculation(numberOfLevels, DefSuccesses, FE8StatCalculation[c]["Def Growth"] / 100);
                    ResProb = binomialCalculation(numberOfLevels, ResSuccesses, FE8StatCalculation[c]["Res Growth"] / 100);
                }
            }
        });
    }
}

function showResults() {
    var HPResults = "HP Probability: " + HPProb;
    var SMResults = "Strength/Magic Probability: " + SMProb;
    var SklResults = "Skill Probability: " + SklProb;
    var SpdResults = "Speed Probability: " + SpdProb;
    var LuckResults = "Luck Probability: " + LuckProb;
    var DefResults = "Defense Probability: " + DefProb;
    var ResResults = "Resistance Probability: " + ResProb;
    var Results = [HPResults, SMResults, SklResults, SpdResults, LuckResults, DefResults, ResResults];
    var resultDisplay = document.getElementsByClassName("resultsText");
    for (let r = 0; r < Results.length; r++) {
        resultDisplay[r].textContent = String(Results[r]);
        if (unluckyOrLucky == 0) {
            resultDisplay[r].classList.add("luckyColor");
        } else {
            resultDisplay[r].classList.remove("luckyColor");
        }
    }
}
