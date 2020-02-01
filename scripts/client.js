$(onReady);
///-----DECLARE_VARIABLES-----///
let exampleEmployee1= {
    firstName: 'Haley',
    lastName: 'Ryan',
    employeeID: 1234,
    title: 'Student',
    annualSalary: 5,
}

let exampleEmployee2 = {
    firstName: 'Dad',
    lastName: 'Erino',
    employeeID: 666,
    title: 'Alarm Clock',
    annualSalary: 5000,
}

let exampleEmployee3 = {
    firstName: 'Stub',
    lastName: 'Erino',
    employeeID: 667,
    title: 'Councilperson',
    annualSalary: 5001,
}

let exampleEmployee4 = {
    firstName: 'Lyn',
    lastName: 'Corelle',
    employeeID: 4321,
    title: 'Author',
    annualSalary: 1000000,
}

let exampleRoster = [exampleEmployee1, exampleEmployee2, exampleEmployee3, exampleEmployee4];

function onReady(){
    console.log('jq');
    displayInfo();
    //set up click listener on existing submit button
    $('#addEmployeeButton').on('click', addNewEmployee);
    //set up click listeners on not-yet existing employee delete buttons
    $('#employee-table tbody').on('click', '.edit-remove', removeEmployee);
}

///-----FUNCTIONS-----///
function displayInfo(){
    //identify table body as the place to put stuff
    let el = $('#employee-table tbody');
    //empty table body
    el.empty();
    //go through the list of employees and append rows of data
    for (employee of exampleRoster){
        el.append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td class="id-number">${employee.employeeID}</td>
                <td>${employee.title}</td>
                <td>${employee.annualSalary}</td>
                <td><button class="edit-remove">Edit/Remove</button></td>
            </tr>
        `)   
    }//end for
    //show total monthly labor cost
    //target span in h3 that shows it 
    let sumShow=$('#total-cost');
    let totalSalary=addSalaries();
    sumShow.empty();
    sumShow.append(`Total Monthly Labor Cost: ${totalSalary}`);
}

function addSalaries(){
    let totalSalary=0;
    //go through employee list
    for (employee of exampleRoster){
        totalSalary+=Number(employee.annualSalary);
    }
    return totalSalary;
}

function addNewEmployee(){
    //using values from the input boxes, make new employeeObject
    let employeeObject= {
        firstName: $('#firstNameIn').val(),
        lastName: $('#lastNameIn').val(),
        employeeID: $('#employeeIDIn').val(),
        title: $('#titleIn').val(),
        annualSalary: $('#annualSalaryIn').val(),
    }
    //add that new employeeObject to the array of employee objects
    exampleRoster.push(employeeObject);
    //display the new list of employees and the total labor cost
    displayInfo();
    //clear the input fields
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#employeeIDIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}

function removeEmployee(){
    //target table row that contains the button- its parent's parent
    let trEl = ($(this).parent()).parent();
    //use .text() to get a string of what's in the table row
    let rowText = trEl.text();
    //go through employee list- if the employee's ID is in the string of row text, remove from list!
    for (let i=0; i<exampleRoster.length; i++) {
        let thisID = exampleRoster[i].employeeID;
        if (rowText.includes(thisID)) {
            exampleRoster.splice(i, 1);
            displayInfo();
        }
    }//end for
}//end removeEmployee
////this function won't work if it the employee annual salary contains the same string of numbers as the employee ID. should be more specific, but it works at a basic level now.


