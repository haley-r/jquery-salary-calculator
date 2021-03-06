$(onReady);
///-----SETUP-----///
let employeeRoster = [];

function onReady(){
    displayInfo();
    //set up click listener on existing submit button
    $('#addEmployeeButton').on('click', addNewEmployee);
    //set up click listeners on not-yet existing buttons
    $('#employee-table tbody').on('click', '.edit-remove', removeEmployee);
    $('body').on('click', '.pop-up', clickAway);
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
        sumSpan.css('background-color', 'rgb(227, 89, 82)');
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

function popUpRemoved(){
    $('body').append(`
        <div class="pop-up">
            <h4>Employee has been removed from the database.</h4>
        <//div>
    `)
}

function clickAway(){
    $('.pop-up').remove();
}

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
            //give user a pop up saying the user has been removed
            popUpRemoved();
        }
    }//end for
}//end removeEmployee
////this function won't work if it the employee annual salary contains the same string of numbers as the employee ID. should be more specific, but it works at a basic level now. maybe use siblings method to just select siblings with the class of whatever I gave the ID td


