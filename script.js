//get form on button click
//store data in a global variable
//create a function to display all the data from the arrayto our entry list

let taskList = [];
let badList = [];
const hrsPerWeek = 24 * 7;

document.querySelector("#form-submit").addEventListener("click", (e) => {
  e.preventDefault();

  const task = document.querySelector(".task-input").value;
  const hr = document.querySelector(".hrs-input").value;
  if (!task && !hr) {
    return;
  }
  const obj = {
    task,
    hr,
  };
  const totalAllocatedHrs=totalTaskHours()
  if(totalAllocatedHrs+hr>hrsPerWeek){
    return alert("sorry, do not have enough time to add more tasks this week")
  }
  taskList.push(obj);
  displayTask();
  totalTaskHours();
});

const displayTask = () => {
  let str = "";
  taskList.map((item, i) => {
    str += `

<tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hrs</td>
<td class="text-end">
<button onclick="deleteTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
<button onclick="markAsNotToDo(${i})" class="btn btn-success"><i class="fa-solid fa-right-long"></i></button>
</td>
</tr>
`;
  });
  document.querySelector("#task-list").innerHTML = str;
};

const displayBadTask = () => {
  let str = "";
  badList.map((item, i) => {
    str += `
  
  <tr>
  <td>${i + 1}</td>
  <td>${item.task}</td>
  <td>${item.hr}hrs</td>
  <td class="text-end">
  <button onclick="markAsToDo(${i})" class="btn btn-warning"><i class="fa-solid fa-left-long"></i></button>
  <button onclick="deleteBadTask(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
  </td>
  </tr>
  `;
  });
  document.querySelector("#bad-task").innerHTML = str;
  totalBadHours();
};
//for left to right
const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1);
  badList.push(item[0]);
  displayTask();
  displayBadTask();
};

// for right to left
const markAsToDo = (i) => {
  const item = badList.splice(i, 1);
  taskList.push(item[0]);
  displayTask();
  displayBadTask();
};
const deleteTask = (i) => {
  if (window.confirm("Are yoiu sure you want to delete this task?")) {
    taskList = taskList.filter((item, index) => index !== i);

    displayTask();
    totalTaskHours()//for reducing the hours when deleted
  }
};

const deleteBadTask = (i) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    badList = badList.filter((item, index) => index !== i);
    displayBadTask();
  }
};

// for displaying the total hours
// +str changes into number from string
const totalBadHours = () => {
  const total = badList.reduce((a, i) => a + +i.hr, 0);
  document.querySelector("#totalbadHrs").innerText = total;
  return total;
};

const totalTaskHours = () => {
  const total = taskList.reduce((a, i) => a + Number(i.hr), 0);
  document.querySelector("#totalHrs").innerText = total + totalBadHours();
  return total;
};
