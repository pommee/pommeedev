var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var commands_counter = 0;
var commands = [];

setTimeout(function () {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
    if (e.keyCode == 13) {
        commands.push(command.innerHTML);
        commands_counter = commands.length;
        addLine("[user@pommeedev.com ~]$ " + command.innerHTML, "no-animation", 0);
        commander(command.innerHTML);
        command.innerHTML = "";
        textarea.value = "";
    }
    if (e.keyCode == 38 && commands_counter != 0) {
        commands_counter -= 1;
        textarea.value = commands[commands_counter];
        command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && commands_counter != commands.length) {
        commands_counter += 1;
        if (commands[commands_counter] === undefined) {
            textarea.value = "";
        } else {
            textarea.value = commands[commands_counter];
        }
        command.innerHTML = textarea.value;
    }
}

function commander(cmd) {
    switch (cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 50);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 50);
            break;
        case "neofetch":
            loopLines(neofetch, "", 50);
            break
        case "ll":
            loopLines(ll, "", 50);
            break
        case "social":
            loopLines(social, "color2 margin", 50);
            break;
        case "projects":
            loopLines(projects, "color2 margin", 50);
            break;
        case "clear":
            setTimeout(function () {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
            break;
        case "linkedin":
            addLine("Opening LinkedIn...", "color2", 0);
            newTab(linkedin);
            break;
        case "github":
            addLine("Opening GitHub...", "color2", 0);
            newTab(github);
            break;
        default:
            firstCommand = cmd.split(" ")[0]
            addLine("<span class=\"inherit\">" + firstCommand + ": command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
            break;
    }
}

function newTab(link) {
    setTimeout(function () {
        window.open(link, "_blank");
    }, 500);
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function () {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        terminal.scrollTo(0, 100000000);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function (item, index) {
        addLine(item, style, index * time);
    });
}
