$(onReady);
///-----SETUP-----///
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

let employeeRoster = [];

function onReady(){
    displayInfo();
    //set up click listener on existing submit button
    $('#addEmployeeButton').on('click', addNewEmployee);
    //set up click listeners on not-yet existing employee delete buttons
    $('#employee-table tbody').on('click', '.edit-remove', removeEmployee);
}//end onReady

///-----CALLED_FUNCTIONS-----///
function displayInfo(){
    //identify table body as the place to put stuff
    let el = $('#employee-table tbody');
    //empty table body
    el.empty();
    //go through the list of employees and append rows of data
    for (employee of employeeRoster){
        el.append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td class="id-number">${employee.employeeID}</td>
                <td>${employee.title}</td>
                <td>$${employee.annualSalary}</td>
                <td><button class="edit-remove">Remove</button></td>
            </tr>
        `)   
    }//end for
    //show total monthly labor cost
    //target span in h3 that shows it 
    let sumSpan=$('#total-cost span');
    let totalMonthly=addSalaries()/12;
    let totalMonthlyRounded=totalMonthly.toFixed(2);
    sumSpan.empty();
    sumSpan.append(` $${totalMonthlyRounded}`);
    if (totalMonthlyRounded>20000){
        sumSpan.css('background-color', 'red');
    }else{
        sumSpan.css('background-color', 'inherit');
    }
}//end displayInfo

function addSalaries(){
    let totalSalary=0;
    //go through employee list
    for (employee of employeeRoster){
        totalSalary+=Number(employee.annualSalary);
    }
    return totalSalary;
}//end addSalaries

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
    employeeRoster.push(employeeObject);
    //display the new list of employees and the total labor cost
    displayInfo();
    //clear the input fields
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#employeeIDIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}//end addNewEmployee

function removeEmployee(){
    //target table row that contains the button- its parent's parent
    let trEl = ($(this).parent()).parent();
    //use .text() to get a string of what's in the table row
    let rowText = trEl.text();
    //go through employee list- if the employee's ID is in the string of row text, remove from list!
    for (let i=0; i<employeeRoster.length; i++) {
        let thisID = employeeRoster[i].employeeID;
        if (rowText.includes(thisID)) {
            employeeRoster.splice(i, 1);
            displayInfo();
        }
    }//end for
}//end removeEmployee
////this function won't work if it the employee annual salary contains the same string of numbers as the employee ID. should be more specific, but it works at a basic level now.


