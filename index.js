import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://javascriptapp-339fc-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsmentsInDB = ref(database, "Endorsments")

const inputFieldEl =  document.getElementById("txtarea")
const buttonEl = document.getElementById("publish-btn")
const endorsmentList = document.getElementById("Endorsment-List")

buttonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(endorsmentsInDB, inputValue)
    
 clearInputFieldEl()
})

// Listen for changes to the data in the database
onValue(endorsmentsInDB, (snapshot) => {
    // Clear the existing list of endorsements
   endorsmentList.innerHTML ="";
    // Iterate through each child of the "Endorsments" node
    snapshot.forEach((childSnapshot) => {
        // Get the value of the child
        const endorsment = childSnapshot.val();
        // Create a new list item element
        const listItem = document.createElement("li");
        // Set the text content of the list item to the endorsement value
        listItem.textContent = endorsment;
        // Append the list item to the endorsmentList
        endorsmentList.appendChild(listItem);
    });
});


function clearInputFieldEl(){
    inputFieldEl.value =""
}
