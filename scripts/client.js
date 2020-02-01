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
                <td>${employee.employeeID}</td>
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
        totalSalary+=employee.annualSalary;
    }
    return totalSalary;
}