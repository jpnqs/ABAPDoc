var tableRow = '<td> <select><option value="@parameter" default>@parameter</option><option value="@raising">@raising</option><option value="@exception">@exception</option> </select></td><td><input placeholder="Name..."></td><td><input placeholder="Shorttext..."></td><td><button class="remove" onclick="removeParameterRow(this)">-</button></td>';

var syncShorttext = true;

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function addParameterRow () {
    var tr = document.createElement("tr");
    tr.innerHTML = tableRow;
    document.getElementById("_ParametersBody").appendChild(tr);
    showSnackbar("Added row");
}

function removeParameterRow (el) {
    var r = el.parentElement.parentElement;
    el.parentElement.parentElement.parentElement.removeChild(r);
    showSnackbar("Removed row");
}

function showSnackbar (msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    if (x.className != 'show') {
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
}

function generate () {
    try {
        var out ;
        out = "";
        out += writeHeader() + "\n";
        var parameters = document.getElementById("_ParametersBody").childNodes;
        for (var i=0; i<parameters.length; i++) {
            var tr = parameters[i];
            if (i != 0) {
                var param = writeParameter(
                    tr.childNodes[0].childNodes[1].value,
                    tr.childNodes[1].childNodes[0].value,
                    tr.childNodes[2].childNodes[0].value,
                    i
                )
                out += param + "\n";
            }
        }
        showSnackbar("ABAP Docs generated");
        var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
        win.document.body.innerHTML = '<textarea style="height: 100%; width: 100%">' + out + '</textarea>';
    } catch (ex) {
        showSnackbar(ex);
    }
}

function writeParameter (type, name, shorttext, row) {

    if (type.trim() == "" || name.trim() == "") {
        throw "Input in row " + row + " has to be filled!";
    }

    var r = '"! ' + type + " " + name + ' | <p';
    
    if (syncShorttext) {
        r += ' class="shorttext synchronized"';
    }

    r += ">";

    r += shorttext;

    r += "</p>";
    return r;
}

function writeHeader () {
    var val = document.getElementById("_Description").value;
    if (val.trim() == "") {
        throw "Description has to be filled";
    }
    var p = "\"! <p";
    if (syncShorttext) {
        p += ' class="shorttext synchronized"';
    }
    p += ">";
    p += val;
    p += "</p>";
    return p;
}

function checkboxChange (el) {
    syncShorttext = el.checked;
}
