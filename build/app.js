import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc as firestoreDoc } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {

    var showtime = document.getElementById("time");

    function updateTime() {
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();
        var currentSecond = currentTime.getSeconds();
        var formattedTime = currentHour + ":" + (currentMinute < 10 ? "0" : "") + currentMinute + ":" + (currentSecond < 10 ? "0" : "") + currentSecond;
        showtime.textContent = formattedTime;
    }

    updateTime();
    setInterval(updateTime, 1000);

    // Dark mode coding
    let isDarkMode = false;
    const container = document.querySelector('.container');
    const moon = document.querySelector(".fa-moon");
    const sun = document.querySelector(".fa-sun");
    let darkmode = document.getElementById('dark');
    let lightmode = document.getElementById('light');

    darkmode.addEventListener('click', dark);
    lightmode.addEventListener('click', light);

    function dark() {
        isDarkMode = true;
        container.style.backgroundColor = '#333';
        container.style.color = '#fff';
        moon.style.display = 'none';
        sun.style.display = 'block';
    }

    function light() {
        isDarkMode = false;
        container.style.backgroundColor = '#fff';
        container.style.color = '#333';
        moon.style.display = 'block';
        sun.style.display = 'none';
    }

    // User interface code / UI Code end

    const addTodo = document.getElementById('add');
    var todo = document.getElementById("todo");

    addTodo.addEventListener('click', async (event) => {
        event.preventDefault();
        let inputValue = document.getElementById('input').value;
        if (inputValue.trim() !== "") {
            try {
                const docRef = await addDoc(collection(db, "todos"), { 
                    task: inputValue
                });
                console.log("Document written with ID: ", docRef.id);
                getdatafromfirestore();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log("Input cannot be empty");
        }
        document.getElementById('input').value = ''; 
    });

    async function getdatafromfirestore(){
        todo.innerHTML = ''; 
        try {
            const querySnapshot = await getDocs(collection(db, "todos"));
            querySnapshot.forEach((docSnapshot) => {
                let li = document.createElement("li");
                li.textContent = docSnapshot.data().task;

                var icon = document.createElement('div');
                var del_icon = document.createElement('i');
                var edit_icon = document.createElement('i');
                del_icon.setAttribute("class", "fa-solid fa-trash");
                edit_icon.setAttribute("class", "fa-solid fa-pen-to-square");

                // Add event listener for delete icon
                del_icon.addEventListener('click', async () => {
                    try {
                        await deleteDoc(firestoreDoc(db, "todos", docSnapshot.id));
                        console.log("Document successfully deleted!");
                        getdatafromfirestore();
                    } catch (e) {
                        console.error("Error removing document: ", e);
                    }
                });

                // Add event listener for edit icon
                edit_icon.addEventListener('click', () => {
                    showEditField(docSnapshot.id, docSnapshot.data().task);
                });

                icon.appendChild(del_icon);
                icon.appendChild(edit_icon);
                li.appendChild(icon);
                todo.appendChild(li);
            });
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    }

    getdatafromfirestore();

    

    function showEditField(id, currentTask) {
        const newTask = prompt('Enter your updated value:', currentTask).trim();
    
        if (newTask !== "") {
            try {
                updateDoc(firestoreDoc(db, "todos", id), {
                    task: newTask
                });
                console.log("Document successfully updated!");
                getdatafromfirestore();
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            console.log("Input cannot be empty");
        }
    }
    

    
});
