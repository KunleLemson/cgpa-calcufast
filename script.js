let display = document.getElementById("display");
let errorDiv = document.getElementById("error");
let cCode = document.getElementById("ccode");
let cScore = document.getElementById("cscore");
let cUnit = document.getElementById("cunit");
let addBtn = document.getElementById("add-course");
let calcBtn = document.getElementById("calculate");
let nCourses = document.getElementById("n-courses");
let qp = document.getElementById("qp");
let cgpa = document.getElementById("cgpa");
let ucount = document.getElementById("ucount");
let div = document.getElementById("div");
let wrapper = document.getElementById("wrapper");
let arr = [];

addBtn.addEventListener("click", addCourseToTable);

function addCourseToTable(e) {
      var id = chance.guid();
  if (cCode.value === "" || cScore.value === "" || cUnit.value === "") {
    let timer = setTimeout(function () {
      errorDiv.style.visibility = "visible";
      errorDiv.innerHTML = "All fields must be filled";
    }, 500);
    let stop_timer = setTimeout(function () {
      errorDiv.style.visibility = "hidden";
    }, 3500);
  } else {
    if (Number(cScore.value) > 100 || cScore.value < 0) {
      let timer = setTimeout(function () {
        errorDiv.style.visibility = "visible";
        errorDiv.innerHTML = "Score must be between 0 and 100";
      }, 500);
      let stop_timer = setTimeout(function () {
        errorDiv.style.visibility = "hidden";
      }, 3500);
    } else {
      getTable();
      arr.push({
        code: cCode.value,
        score: cScore.value,
        unit: cUnit.value,
        id
      });
      localStorage.gpTable = JSON.stringify(arr);
      document.getElementById("details").reset();
      showTable();
    }}
}

function getTable() {
  let tableAsString = localStorage.gpTable;
  if (tableAsString != null) arr = JSON.parse(tableAsString);
}

function showTable() {
  getTable();

  var table = document.getElementsByTagName("table")[0];
  var x = table.rows.length;
  while (--x) {
    table.deleteRow(x);
  }

  for (i = 0; i < arr.length; i++) {
    var tbody = document.getElementById("tbody");
    var id = arr[i].id;

    tbody.innerHTML +=
    `<tr>
    <td id='count'></td>
    <td>
    ${arr[i].code.toUpperCase()}
    </td>
    <td>
    ${arr[i].score}
    </td>
    <td>
    ${arr[i].unit}
    </td><td style='text-align:center;'><i class='fa fa-trash' onclick='deleteRow(\"${id}\")'></i></td>
    </tr>`;
  }
}
showTable();

calcBtn.addEventListener("click", calculate);

function calculate() {
  getTable();
  let p = 0;
  let ucounter = 0;
  let pcounter = 0;
  arr.map((ar) => {
    if (ar.score < 0) {
      console.log('Invalid Score');
    } else if (ar.score <= 39) {
      p = 0;
    } else if (ar.score <= 44) {
      p = 1;
    } else if (ar.score <= 49) {
      p = 2;
    } else if (ar.score <= 59) {
      p = 3;
    } else if (ar.score <= 69) {
      p = 4;
    } else if (ar.score <= 100) {
      p = 5;
    }
    ucounter += Number(ar.unit);
    let qp = p * ar.unit;
    pcounter += qp;
  });
  wrapper.style.display = "block";

  nCourses.innerHTML = arr.length;
  qp.innerHTML = pcounter;
  ucount.innerHTML = ucounter;

  let cgpaF = parseFloat(pcounter/ucounter);
  var cgpaS = cgpaF.toString();

  if ((pcounter/ucounter) > 0 && (pcounter/ucounter) <= 0.9) {
    console.log("Failed");
    div.innerHTML = "🤐🤐🤐";
  } else if (cgpaF >= 1.00 && cgpaF <= 1.49) {
    div.innerHTML = "Pass Degree";
  } else if (cgpaF >= 1.50 && cgpaF <= 2.39) {
    div.innerHTML = "Third Class Honours";
  } else if (cgpaF >= 2.40 && cgpaF <= 3.49) {
    div.innerHTML = "Second Class Honours (Lower Division)";
  } else if (cgpaF >= 3.50 && cgpaF <= 4.49) {
    div.innerHTML = "Second Class Honours (Upper Division)";
  } else if (cgpaF >= 4.50 && cgpaF <= 5.00) {
    div.innerHTML = "First Class Honours";
  } else {
    div.innerHTML = "Invalid CGPA";
  }
  cgpa.innerHTML = cgpaS.slice(0, 4);
}

function deleteRow(id) {
    var arr = JSON.parse(localStorage.gpTable);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == id) {
            if (confirm("Delete?")) {
                arr.splice(i, 1);
            }
        }
    }
    localStorage.gpTable = JSON.stringify(arr);
    showTable();
}


function clearTable() {
  localStorage.removeItem("gpTable");
  location.reload();
}