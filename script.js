const start = document.getElementById("start");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const main = document.getElementsByTagName("main")[0];
const timerOver = new Audio("./assets/timeover.mp3");
const obj = {};
var id = 0;

function deleteEle(currId) {
  if (obj[currId]) {
    obj[currId].style.display = "none";
    delete obj[currId];
    displayEmpty();
  }
}
function displayEmpty() {
  if (Object.keys(obj).length == 0)
    document.getElementById("empty-para").style.display = "block";
}

function callme() {
  document.getElementById("empty-para").style.display = "none";
  const element = document.createElement("div");
  element.style.id = id;
  obj[id] = element;
  var found = false;
  element.classList.add("timer");
  element.innerHTML = ` <div class="set">Time Left:</div>
    <div class="time time-extra">
        <input id="hour${id}" type="number" value=${Number(hour.value)<10?"0"+hour.value:hour.value}>
        <p>:</p>
        <input id="minute${id}" type="number" value=${Number(minute.value)<10?"0"+minute.value:minute.value}>
        <p>:</p>
        <input id="second${id}" type="number" value=${Number(second.value)<10?"0"+second.value:second.value}>
    </div>
    <button  type="button"  onclick="deleteEle(${id})">Delete</button>`;

    main.appendChild(element);
  const currHr = document.getElementById(`hour${id}`);
  const currMin = document.getElementById(`minute${id}`);
  const currSec = document.getElementById(`second${id}`);
  var interval = null;
  var total = 0;
  function getTotal() {
    total =
      Number(currHr.value) * 3600 +
      Number(currMin.value) * 60 +
      Number(currSec.value);
  }
  function changeDesign(currId) {
    element.style.backgroundColor = "yellow";
    element.innerHTML = `
           <div class="time-up">
              Timer Is Up !
           </div>
           <button class="btn btn-secondary" type="button"  onclick="deleteEle(${currId})">Stop</button>`;
  }

  function Timer() {
    getTotal();
  

    total--;

    if (total >= 0) {
      var hr = Math.floor(total / 3600);
      var mt = Math.floor(total / 60 - hr * 60);
      var sc = total - (hr * 3600 + mt * 60);
      currMin.value = mt < 10 ? "0" + mt : mt;
      currHr.value = hr < 10 ? "0" + hr : hr;
      currSec.value = sc < 10 ? "0" + sc : sc;
    } else {
        if(obj[element.style.id]){
            if(!found){
                timerOver.play();
                found = true;
            }
            
          changeDesign(element.style.id);

        }
       
    }
  }

  clearInterval(interval);
  interval = setInterval(Timer, 1000);
  
}

start.addEventListener("click", () => {
  if (!isValid()) {
    alert("Enter valid timings!");
    return;
  }
  id++;
  callme();
});
function isValid() {
  const hr = Number(hour.value);
  const min = Number(minute.value);
  const sec = Number(second.value);
  if (hr < 0 || min < 0 || sec < 0 || min > 60 || sec > 60 || hr > 23)
    return false;
  return true;
}
