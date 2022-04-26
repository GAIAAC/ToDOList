var addBtn;          //1                // dichiaro le variabili
var taskTxt;         //2
var taskListHTML;    //3
var tasksList = [];  //4

window.addEventListener("load", init);   // load della pagina lancia la funzione init

function init(){     //1
    addBtn = document.querySelector("#add_btn");    // aggancia le variabili ad html
    taskTxt = document.querySelector("#task_txt");
    taskListHTML = document.querySelector("#tasks_list_html");
    eventHandlers();                                            // chiama le due funzioni
    checkData();
}

function eventHandlers(){   //1 
    addBtn.addEventListener("click", addTask);  // si mette in ascolto in attesa di un evento click sul bottone
}                                               // quando avviene il click chiama addTask

function addTask(){                //1
    tasksList.push(taskTxt.value);    // inserisce nell'array tasklist il valore scritto nell'input 
    buildList();
    saveData();
    clearForms();
}

function checkData(){            //2   // controlla se nel localstorage è stata memorizzata la chiave tasks, se c'è creo l'array splittando i contenuti in base alla virgola
    if(localStorage.getItem('tasks')){
        tasksList = localStorage.getItem('tasks').split(",");
    }
    buildList();
}

function buildList(){          //3 
    var list = "";       // pulisce la stringa
    for(var i=0; i < tasksList.length; i++){   // fa il ciclo sull'array ottenuto con lo split di sopra 
        list += "<li class='list-group-item d-flex justify-content-between align-items-center'>" + tasksList[i] + "<span onclick='removeTask("+i+")' class='remove_btn badge bg-danger rounded-pill pointer'>X</span></li>"; // costruisco la stringa html
    }
    taskListHTML.innerHTML = list; // inserisco l'html nella pagina
}

function saveData(){
    localStorage.setItem('tasks', tasksList); // salva la variabile nel localstorage
}                                             //localStorage.setItem(chiave,array)

function clearForms(){    //4
    taskTxt.value = '';   // pulisce il campo input -> value="";
}

function removeTask(id){  //5
    tasksList.splice(id, 1);
    saveData();            // rilanciare sia savedata (per aggiornare il local storage), sia buildlist (per aggiornare l'html)
    buildList();
}