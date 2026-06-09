dragElement(document.querySelector("#welcome")) //element to be dragged
dragElement(document.querySelector("#notepad")) //element to be dragged

const images = ["100%_charging"]


navigator.getBattery().then(battery => { //get battery info and call update to display it
    document.getElementById("Battery").textContent = "Battery Level: " + parseInt(battery.level * 100) + "%" + ", " + 
    (battery.charging ? "Charging" : "Not Charging"); //display battery level and charging status   

    battery.addEventListener("levelchange", update);
    battery.addEventListener("chargingchange", update);




    function update() { //function to update battery info when it changes
        document.getElementById("Battery").textContent = "Battery Level: " + parseInt(battery.level * 100) + "%" + ", " + 
        (battery.charging ? "charging" : "Not Charging"); 

        const level = Math.round(battery.level * 100 / 10) * 10;
        const charging = battery.charging ? "_charging" : "";
        const png_name = `${level}${"%"}${charging}.png`;
        console.log(png_name)
        

        

}

});



function dragElement(el) { //el is element passed in, which is welcome
    var initX = 0; //x and y 
    var initY = 0;
    var currX = 0;
    var currY = 0;

    const parent = document.getElementById(el.id);
    console.log(el.id);
    console.log(parent);
    const child = parent.querySelector(".header");
    
    if(child) { //if header exists, drag only header
        child.onmousedown = dragMouseDown;
    }
    else {
        el.onmousedown = dragMouseDown; //else, just drag entire thing
    }

function dragMouseDown(e) { //dragging function, e is event object
    e = e || window.event; //cross-browser compatibility for ancient browsers like ie or some shi, still works without
    e.preventDefault(); //prevents default behavior of dragging images etc
    initX = e.clientX; //initial x and y coordinates of mouse when click
    initY = e.clientY;

    var rect = el.getBoundingClientRect(); //function gets a lot of stuff but most importantly the top and left coords of the el relative to the viewport
    el.style.top = rect.top + "px"; //gets top and left coords from function above and sets el's top and left to those coords
    el.style.left = rect.left + "px";
    el.style.transform = "none"; //remove transform to ignore offset so it works properly

    document.onmousemove = elementDrag; //when move call elementDrag
    document.onmouseup = closeDragElement; //when mouse release call closeDragElement
}

    function elementDrag(e) { //function for actually dragging
        e = e || window.event; //again cross-browser compatibility
        e.preventDefault();
        currX = e.clientX - initX; //how much the mouse has moved since starting drag
        currY = e.clientY - initY;
        initX = e.clientX; //update initial coordinates to current coordinates for next iteration
        initY = e.clientY;

        var newTop = el.offsetTop + currY; //new position by adding how much mouse has moved to current position
        var newLeft = el.offsetLeft + currX;
        //clamp newTop and newLeft to prevent dragging outside of viewport
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - el.offsetHeight)); 
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - el.offsetWidth));

        el.style.top = newTop + "px"; //update el's position
        el.style.left = newLeft + "px";
    }

    function closeDragElement() { //remove listening for event when mouse released
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
//variables for welcome screen and buttons to open and close it
var welcomeScreen = document.querySelector("#welcome"); 
var notepadScreen = document.querySelector("#notepad");
var welcomeOpen = document.querySelector("#welcomeopen");
var notepadOpen = document.querySelector("#notepadopen");

function closeWindow(el) {
    el.classList.remove("open"); //remove open class to reset state
    el.classList.add("close"); //add fade-out class to trigger animation
}

function openWindow(el) {
    el.classList.remove("close"); //remove fade-out class to reset state
    el.classList.add("open");
}

// Close buttons for welcome and notepad
document.querySelector("#welcome .close").addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

document.querySelector("#notepad .close").addEventListener("click", function() {
    closeWindow(notepadScreen);
});

welcomeOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

notepadOpen.addEventListener("click", function() {
    openWindow(notepadScreen);
});




//------END------