function clearDisplay() {
    document.getElementById("display").innerHTML = "";
    document.getElementById("prevString").innerHTML = "";
}

function deleteLast() {
    let display = document.getElementById("display").innerHTML;
    document.getElementById("display").innerHTML = display.substring(0, display.length - 1);
}

function append(value) {
    document.getElementById("display").innerHTML += value;
}

function calculate() {
    let display = document.getElementById("display").innerHTML;
    try {
        document.getElementById("display").innerHTML = eval(display);
    } catch (error) {
        document.getElementById("display").innerHTML = "Error";
    }
}
