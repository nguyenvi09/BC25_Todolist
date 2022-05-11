export default class Services{
    fetchData(){
        return axios({
            url: "https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist",
            method: "GET"
        });
    };

    addTask(task){
        return axios({
            url: "https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist",
            method: "POST",
            data: task
        });
    };

    deleteTask(id){
        return axios({
            url: `https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist/${id}`,
            method: "DELETE"
        });
    };

    getTaskById(id){
        return axios({
            url: `https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist/${id}`,
            method: "GET"
        });
    };

    updateTask(task){
        return axios({
            url: `https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist/${task.id}`,
            method: "PUT",
            data: task,
        });
    }
};