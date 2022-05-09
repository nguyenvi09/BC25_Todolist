import Services from "../models/Services.js";
import Todolist from "../models/Todolist.js";

const service = new Services();

const getEle = id => document.getElementById(id);

const getTodoList = () => {
    service
        .fetchData()
        .then(result => {
            console.log(result.data);
        })
        .catch(error => {
            console.log(error);
        });
};

getTodoList();