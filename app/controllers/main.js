import Services from "../models/Services.js";
import Tasks from "../models/Tasks.js";

const service = new Services();

const getEle = id => document.getElementById(id);

//renderHTML 
const renderHTML = data => {
    let arrTrue = data.filter(item => item.status === true);
    let arrFalse = data.filter(item => item.status === false);

    const contentCompleted = arrTrue.reduce((contentHTML, item) => {
        return (contentHTML += `
            <li>
                ${item.activity}
                <div>
                    <button class="btn-delete" onclick="deleteTask(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="btn-check" onclick="checkComplete(${item.id})"><i class="fa-solid fa-circle-check"></i></button>
                </div>    
            </li>
        `)
    }, "");
    
    getEle("completed").innerHTML = contentCompleted;

    const contentTodo = arrFalse.reduce((contentHTML, item) => {
        return (contentHTML += `
            <li>
                ${item.activity}
                <div>
                    <button class="btn-delete" onclick="deleteTask(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="btn-check" onclick="checkComplete(${item.id})"><i class="fa-solid fa-circle-check"></i></button>
                </div>    
            </li>
        `)
    }, "");
    
    getEle("todo").innerHTML = contentTodo;
};

//lấy dữ liệu
const getTodoList = () => {
    service
        .fetchData()
        .then(result => {
            renderHTML(result.data);
        })
        .catch(error => {
            console.log(error);
        });
    
};

getTodoList();

//thêm
getEle("addItem").addEventListener("click", () => {
    //lấy value
    const newTask =  getEle("newTask").value;

    const task = new Tasks("", newTask);

    service.addTask(task)
        .then(() => {
            getTodoList();
        })
        .catch(error =>{
            console.log(error);
        });
});

//xóa
const deleteTask = id => {
    service.deleteTask(id)
        .then(() => {
            getTodoList();
        })
        .catch(error => {
            console.log(error);
        });
};
window.deleteTask = deleteTask;

//đánh dấu các việc làm xong
const checkComplete = id =>{
    console.log(id);
    service.getTaskById(id)
        .then(result => {
            console.log(result);
            result.data.status = true;

            service.updateTask(result.data)
                .then(() => {
                    getTodoList();
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error);
        });
};
window.checkComplete = checkComplete;


//Hàm sắp xếp
const sortTasks = (type = 0) => {
    switch(type){
        case 0:
            service.fetchData()
                .then(result => {
                    let arrFasle =  result.data.filter(item => item.status === false);
                    arrFasle.sort( (a, b) => {
                        const nameA = a.activity.toUpperCase();
                        const nameB = b.activity.toUpperCase();

                        if(nameA < nameB){
                            return -1;
                        }
                        if(nameA > nameB){
                            return 1;
                        }
                        return 0;
                    });
                    renderHTML(arrFasle);
                })
                .catch(error => {
                    console.log(error);
                });
            break;
        case 1:
            service.fetchData()
                .then(result => {
                    let arrFasle =  result.data.filter(item => item.status === false);
                    arrFasle.sort( (b, a) => {
                        const nameA = a.activity.toUpperCase();
                        const nameB = b.activity.toUpperCase();

                        if(nameA < nameB){
                            return -1;
                        }
                        if(nameA > nameB){
                            return 1;
                        }
                        return 0;
                    });
                    renderHTML(arrFasle);
                })
                .catch(error => {
                    console.log(error);
                });
            break;
    };
};

//sắp xếp a->z
getEle("two").addEventListener("click", ()=>{
    sortTasks();
});

// sắp xếp z -> a
getEle("three").addEventListener("click", ()=>{
    sortTasks(1);
});