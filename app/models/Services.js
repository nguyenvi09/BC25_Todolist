class Services{
    fetchData(){
        return axios({
            url: "https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist",
            method: "GET"
        });
    };

    addToDo(todo){
        return axios({
            url: "https://626614c8dbee37aff9abd41e.mockapi.io/api/todolist",
            method: "POST",
            data: todo
        });
    };
};