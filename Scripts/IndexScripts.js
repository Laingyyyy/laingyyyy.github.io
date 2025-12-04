const terminal = document.getElementById("terminal");
const hiddenInput = document.getElementById("hidden-input");

let currentCommand = "";

const commands = {
    help: showHelp,
    about: showAbout,
    skills: showSkills,
    projects: showProjects,
    clear: clearTerminal
};

function focusInput() {
    hiddenInput.focus();
}

window.addEventListener("load", () => {
    focusInput();
    createInputLine();
});

hiddenInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Backspace") {
        currentCommand = currentCommand.slice(0, -1);
        updateInputLine();
    }
    else if (e.key === "Enter") {
        handleCommand(currentCommand.trim())
        currentCommand = "";
        createInputLine();
    }
    else if (e.key.length === 1) {
        currentCommand += e.key;
        updateInputLine();
    }
});

function createInputLine() {
    const line = document.createElement("div");
    line.className = "line input-line";

    const promptSpan = document.createElement("span");
    promptSpan.className = "prompt";
    promptSpan.textContent = "ShaunLaing@portfolio:~$ ";

    const commandSpan = document.createElement("span");
    commandSpan.className = "command";
    commandSpan.id = "current-command";
    commandSpan.textContent = "";

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "cursor";
    cursorSpan.textContent = " ";

    line.appendChild(promptSpan);
    line.appendChild(commandSpan);
    line.appendChild(cursorSpan);

    terminal.appendChild(line);
    scrollToBottom();
}

function updateInputLine() {
    const commandSpan = document.getElementById("current-command");
    if (commandSpan) commandSpan.textContent = currentCommand;
}

function handleCommand(command) {
    const lastCursor = terminal.querySelector(".input-line . cursor:last-child");

    if (lastCursor) {
        lastCursor.remove();
    }

    if (!command) return;

    const [cmd] = command.split(" ");
    const commandFn = commands[cmd.toLowerCase()];

    if (commandFn) commandFn();

    else {
        printOutput(`Command '${cmd}' not found. Type "help".`);
    }
}

function printOutput(text) {
    const lines = Array.isArray(text) ? text : [text];
    lines.forEach((line) => {
      const span = document.createElement("span");
      span.className = "line output";
      span.textContent = line;
      terminal.appendChild(span);
    });

    scrollToBottom();
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

// Commands

function showHelp() {
    printOutput([
        "help       - Shows this message",
        "about      - Shows information about me",
        "skills     - Shows my skills",
        "projects   - Shows my projects",
        "clear      - Clears the terminal"
    ]);
}

function showAbout() {
    printOutput([
        "About Me:",
        "I am Shaun Laing, A Software Developer",
        "I enjoy working with APIs, databases and solving real world problems.",
        "",

        "Github: https://github.com/Laingyyyy",
        "LinkedIn: https://www.linkedin.com/in/shaun-laing-064385263/"
    ]);
}

function showSkills() {
    printOutput([
        "Skills:",
        "Backend: C#, Javascript",
        "Frontend: HTML, CSS",
        "Databases: EFCore, MySQL",
    ]);
}

function showProjects() {
    printOutput([
        "Projects:",
        "1) Terminal Portfolio",
        "A Simple Terminal Portfolio Website",
        "Website: https://laingyyyy.github.io/  Repo: https://github.com/Laingyyyy/laingyyyy.github.io",
        "",

        "2) Battle Sim",
        "A Console Battle Sim Made in C#",
        "Repo: https://github.com/Laingyyyy/BattleSim"
    ]);
}

function clearTerminal() {
    terminal.innerHTML = "";
    const welcome = [
        "Welcome to my Terminal Portfolio!",
        `Type "help" to see commands.`
    ]
}