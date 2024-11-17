// Function to calculate the shift from a 5-letter key (A=1, B=2, ..., Z=26)
function calculateShift(key) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shift = 0;

    // Loop through each character in the key and sum the corresponding alphabet values
    for (let char of key.toUpperCase()) {
        if (alphabet.includes(char)) {
            shift += alphabet.indexOf(char) + 1; // A=1, B=2, ..., Z=26
        }
    }

    return shift;
}

function processMessage() {
    const operation = document.getElementById("operation").value;
    const message = document.getElementById("message").value.toUpperCase();
    const key = document.getElementById("key").value;

    // Validate that both the key and message contain only letters before proceeding
    if (!validateKeyInput(key)) {
        alert("Key must contain only letters (A-Z).");
        return;
    }
    
    if (!validateMessageInput(message)) {
        alert("Message must contain only letters (A-Z).");
        return;
    }

    const shift = calculateShift(key); // Calculate the shift based on the key
    const result = operation === "encrypt" ? encryptMessage(message, shift) : decryptMessage(message, shift);
    document.getElementById("result").value = result;
}

function encryptMessage(message, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let encryptedMessage = "";

    // Generate the shifted alphabet key based on the calculated shift value
    const shiftedAlphabet = generateKey(shift);

    // Encrypt the message
    for (let char of message) {
        if (alphabet.includes(char)) {
            encryptedMessage += shiftedAlphabet[alphabet.indexOf(char)];
        } else {
            encryptedMessage += char;
        }
    }

    return encryptedMessage;
}

function decryptMessage(message, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let decryptedMessage = "";

    // Generate the shifted alphabet key based on the calculated shift value
    const shiftedAlphabet = generateKey(shift);

    // Decrypt the message by reversing the shift direction
    for (let char of message) {
        if (shiftedAlphabet.includes(char)) {
            decryptedMessage += alphabet[shiftedAlphabet.indexOf(char)];
        } else {
            decryptedMessage += char;
        }
    }

    return decryptedMessage;
}

// Function to generate a shifted alphabet key based on the shift value
function generateKey(shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.slice(shift % 26) + alphabet.slice(0, shift % 26); // Shift by the user-defined value
}

// Check if the key is valid (only letters, exactly 5 characters)
function validateKeyInput(key) {
    const regex = /^[A-Za-z]{5}$/; // Key must be exactly 5 letters
    return regex.test(key); // Returns true if valid
}

// Check if the message is valid (only letters, A-Z, and spaces allowed)
function validateMessageInput(message) {
    const regex = /^[A-Za-z\s]*$/; // Message can only contain letters and spaces
    return regex.test(message); // Returns true if valid
}
