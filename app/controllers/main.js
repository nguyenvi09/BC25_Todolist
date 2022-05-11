/**
 * đánh dấu
 * sắp xếp a->z và ngược lại
 */

import Services from "../models/Services.js";
import Todolist from "../models/Todolist.js";

const service = new Services();

const getEle = id => document.getElementById(id);

//renderHTML 
const renderHTML = data => {
    // const content = data.reduce((contentHTML, item) => {
    //     return (contentHTML += `
    //         <li>
    //             ${item.activity}
    //             <div>
    //                 <button class="btn-delete" onclick="deleteTask(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
    //                 <button class="btn-check" onclick="checkComplete(${item.id})"><i class="fa-solid fa-circle-check"></i></button>
    //             </div>    
    //         </li>
    //     `)
    // }, "");
    
    // getEle("todo").innerHTML = content;
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
            console.log(result.data);
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

    const task = new Todolist("", newTask);

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
    service
        .getTaskById(id)
        .then(result => {
            console.log(result.data);
            result.data.status = true;
            console.log(result.data);
            service.updateTask(result.data)
                .then(result => {
                    console.log(result.data);
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