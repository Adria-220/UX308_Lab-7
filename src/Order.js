let currentState = welcoming;
let userName = '';
let kitCount = 0;

export function handleInput(sInput) {
    return currentState(sInput);
}

export function clearInput() {
    currentState = welcoming;
    userName = '';
    kitCount = 0;
}

function welcoming() {
    let aReturn = [];
    currentState = gettingName;
    aReturn.push("Welcome to Adria's Rapid Test! 🧪");
    aReturn.push("What is your name?");
    return aReturn;
}

function gettingName(sInput) {
    let aReturn = [];
    userName = sInput.trim();
    currentState = askingIfReserve;
    aReturn.push(`Nice to meet you, ${userName}! 😊`);
    aReturn.push("Would you like to get a rapid test kit? (yes/no)");
    return aReturn;
}

function askingIfReserve(sInput) {
    let aReturn = [];
    if (sInput.toLowerCase().startsWith('y')) {
        currentState = gettingKitCount;
        aReturn.push("Great! How many kits would you like? (1-5)");
    } else {
        currentState = welcoming;
        aReturn.push(`No problem, ${userName}! Thanks for visiting.`);
        aReturn.push("Stay safe! 👋");
    }
    return aReturn;
}

function gettingKitCount(sInput) {
    let aReturn = [];
    const num = parseInt(sInput);
    if (isNaN(num) || num < 1 || num > 5) {
        aReturn.push("Please enter a number between 1 and 5.");
        return aReturn;
    }
    kitCount = num;
    currentState = confirming;
    aReturn.push(`Got it! Just to confirm:`);
    aReturn.push(`📋 Name: ${userName}`);
    aReturn.push(`📦 Kits: ${kitCount}`);
    aReturn.push("Shall I go ahead and reserve these? (yes/no)");
    return aReturn;
}

function confirming(sInput) {
    let aReturn = [];
    currentState = welcoming;
    if (sInput.toLowerCase().startsWith('y')) {
        let d = new Date();
        d.setMinutes(d.getMinutes() + 120);
        aReturn.push(`✅ Your ${kitCount} kit(s) are reserved, ${userName}!`);
        aReturn.push(`Please pick them up at 123 Somewhere Rd., Acton before ${d.toTimeString()}`);
        aReturn.push("Thank you and stay safe! 🧪");
    } else {
        aReturn.push("No problem! Your order has been cancelled.");
        aReturn.push(`Take care, ${userName}! 👋`);
    }
    return aReturn;
}