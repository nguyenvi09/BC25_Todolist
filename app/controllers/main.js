import Services from "../models/Services.js";
import Todolist from "../models/Todolist.js";

const service = new Services();

const getEle = id => document.getElementById(id);

//renderHTML 
const renderHTML = data => {
    const content = data.reduce((contentHTML, item) => {
        return (contentHTML += `
            <li>
                ${item.activity}
                <div>
                    <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                    <button class ="btn-check"><i class="fa-solid fa-circle-check"></i></button>
                </div>    
            </li>
        `)
    }, "");

    getEle("todo").innerHTML = content;
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

    const todo = new Todolist("", newTask);

    service.addToDo(todo)
        .then(() => {
            getTodoList();
        })
        .catch(error =>{
            console.log(error);
        });
});