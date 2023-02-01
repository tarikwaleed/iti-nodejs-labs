import { appendFileSync, readFileSync } from "fs";

function addTodo(todo) {
  // readFileSync("/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/db.json",function(err,data){
  //     var json=JSON.parse(data)

  // })

  try {
    appendFileSync(
      "/media/tarikwaleed/Data/iti/NODEJS/iti-nodejs-labs/assignment1/db.json",
      JSON.stringify(todo)
    );
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    console.log("ERROR, not appended");
    /* Handle the error */
  }
}

const todoObj = {
  id: 1,
  title: "first todo",
  content: "this is my very todo in the app",
  checked: true,
};

addTodo(todoObj);
