$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

function checkyear(){
    var select = document.getElementById("year");
    var selectedOption = select.options[select.selectedIndex].value;

    switch (selectedOption) {
        case "2023-2024":
            var data = [
                {
                    "courseCode": "COMP 4021",
                    "courseTitle": "Introduction to Computer Science",
                    "grade": "A+"
                },
                {
                    "courseCode": "COMP 4032P",
                    "courseTitle": "Introduction to Computing with Java",
                    "grade": "A"
                },
                {
                    "courseCode": "COMP 4442",
                    "courseTitle": "Web Programming and Technologies",
                    "grade": "A-"
                },
                {
                    "courseCode": "COMP 4712H",
                    "courseTitle": "Object-Oriented Programming and Data Structures",
                    "grade": "B+"
                }
            ];
            updateTableData(data);
          break;
        case "2022-2023":
            var data = [
                {
                    "courseCode": "COMP 3021",
                    "courseTitle": "Introduction to Computer Science",
                    "grade": "A+"
                },
                {
                    "courseCode": "COMP 3032P",
                    "courseTitle": "Introduction to Computing with Java",
                    "grade": "A"
                },
                {
                    "courseCode": "COMP 3442",
                    "courseTitle": "Web Programming and Technologies",
                    "grade": "A-"
                },
                {
                    "courseCode": "COMP 3712H",
                    "courseTitle": "Object-Oriented Programming and Data Structures",
                    "grade": "B+"
                }
            ];
            updateTableData(data);
          break;
        case "2021-2022":
            var data = [
                {
                    "courseCode": "COMP 2021",
                    "courseTitle": "Introduction to Computer Science",
                    "grade": "A+"
                },
                {
                    "courseCode": "COMP 2032P",
                    "courseTitle": "Introduction to Computing with Java",
                    "grade": "A"
                },
                {
                    "courseCode": "COMP 2442",
                    "courseTitle": "Web Programming and Technologies",
                    "grade": "A-"
                },
                {
                    "courseCode": "COMP 2712H",
                    "courseTitle": "Object-Oriented Programming and Data Structures",
                    "grade": "B+"
                }
            ];
            updateTableData(data);
          break;
        case "2020-2021":
            var data = [
                {
                    "courseCode": "COMP 1021",
                    "courseTitle": "Introduction to Computer Science",
                    "grade": "A+"
                },
                {
                    "courseCode": "COMP 1032P",
                    "courseTitle": "Introduction to Computing with Java",
                    "grade": "A"
                },
                {
                    "courseCode": "COMP 1442",
                    "courseTitle": "Web Programming and Technologies",
                    "grade": "A-"
                },
                {
                    "courseCode": "COMP 1712H",
                    "courseTitle": "Object-Oriented Programming and Data Structures",
                    "grade": "B+"
                }
            ];
            updateTableData(data);
          break;
        default:
            alert("Invalid option selected");
      }
}

function updateTableData(data) {
    // Get the table element.
    var table = document.getElementById("academic-records");

    var rows = table.rows.length;
    for (var i = rows - 1; i > 0; i--) {
      table.deleteRow(i);
    }
    

    // Loop through the data and add rows to the table.
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        var courseCodeCell = row.insertCell(0);
        var courseTitleCell = row.insertCell(1);
        var gradeCell = row.insertCell(2);
        courseCodeCell.innerHTML = data[i].courseCode;
        courseTitleCell.innerHTML = data[i].courseTitle;
        gradeCell.innerHTML = data[i].grade;
    }
}

