var selectedRow = null;
let list = [];
let file = {};
function onFormSubmit () {
  if (validate ()) {
    var formData = readFormData ();
    if (selectedRow !== null) updateRecord (formData);
    else insertNewRecord (formData);
    resetForm ();
  }
}

function readFormData () {
  var formData = {};
  let photos = document.getElementById ('profile_pic').files[0];
  console.log (photos);
  /*if (photos && photos.name) {
    formData['photo'] = {
      name: photos.name,
      size: photos.size,
      type: photos.type,
    };
  } else {
    formData['photo'] = {};
  }*/
  formData['photo'] = {name: photos.name, size: photos.size, type: photos.type};
  formData['fullName'] = document.getElementById ('fullName').value;
  formData['email'] = document.getElementById ('email').value;
  formData['pwd'] = document.getElementById ('pwd').value;
  formData['age'] = document.getElementById ('age').value;
  formData['country'] = document.getElementById ('country').value;

  if (document.getElementById ('male').checked) {
    formData['gender'] = document.getElementById ('male').value;
  } else if (document.getElementById ('female').checked) {
    formData['gender'] = document.getElementById ('female').value;
  }

  let selected = [];
  let hobby = document.getElementsByName ('hobby');
  for (var i = 0; i < hobby.length; i++) {
    if (hobby[i].checked) {
      selected.push (hobby[i].value);
    }

    if (selected.length > 0) {
      selected.join (',');
    }
  }
  // console.log (selected);
  formData['hobby'] = selected;

  return formData;
}

function rendertable () {
  $ ('#tbody').empty ();
  list.forEach ((value, index) => {
    let row = '<tr>';
    row +=
      '<td>' +
      "<img src='" +
      value.photo.name +
      "' width='50' ,height='50'/>" +
      '</td>';
    row += '<td>' + value.fullName + '</td>';
    row += '<td>' + value.email + '</td>';
    row += '<td>' + value.pwd + '</td>';
    row += '<td>' + value.gender + '</td>';
    row += '<td>' + value.age + '</td>';
    row += '<td>' + value.country + '</td>';
    row += '<td>' + value.hobby + '</td>';
    row += '<td>';
    row +=
      "<input type='button'  class='btn btn-warning'  value='Edit' onClick='onEdit(" +
      index +
      ")'></input>&nbsp";

    row +=
      "<input type='button' class='btn btn-danger'  value='Delete' onClick='onDelete(" +
      index +
      ")'></input>";
    row += '</td>';
    row += '</tr>';

    $ ('#tbody').append (row);
  });
}

function insertNewRecord (data) {
  list.push (data);
  rendertable ();
  localStorage.setItem ('list', JSON.stringify (list));
}

function resetForm () {
  document.getElementById ('profile_pic').value = '';
  document.getElementById ('i').src = '';
  document.getElementById ('fullName').value = '';
  document.getElementById ('email').value = '';
  document.getElementById ('pwd').value = '';
  document.getElementById ('male').checked = false;
  document.getElementById ('female').checked = false;
  document.getElementById ('age').value = '';
  document.getElementById ('country').value = '';
  document.getElementById ('Cricket').checked = false;
  document.getElementById ('Football').checked = false;
  document.getElementById ('Hockey').checked = false;
  document.getElementById ('Basketll').checked = false;
  // file = {};
  //previewFile ();
  selectedRow = null;
}

function onEdit (index) {
  const newdata = list[index];
  document.getElementById ('fullName').value = newdata.fullName;
  document.getElementById ('email').value = newdata.email;
  document.getElementById ('pwd').value = newdata.pwd;
  //document.getElementById ('gender').value = newdata.gender;
  if ((document.getElementById ('male').checked = true)) {
    newdata.gender = document.getElementById ('male').value;
  } else if ((document.getElementById ('female').checked = true)) {
    newdata.gender = document.getElementById ('female').value;
  }
  document.getElementById ('age').value = newdata.age;
  document.getElementById ('country').value = newdata.country;
  //document.getElementById ('hobby').value = newdata.hobby;
  //console.log (newdata.hobby);

  for (var i = 0; i < newdata.hobby.length; i++) {
    document.getElementById (newdata.hobby[i]).checked = true;
  }
  selectedRow = index;
  //console.log (selectedRow);
}
function updateRecord (formData) {
  list[selectedRow].photo = formData.photo;
  list[selectedRow].fullName = formData.fullName;
  list[selectedRow].email = formData.email;
  list[selectedRow].pwd = formData.pwd;
  list[selectedRow].gender = formData.gender;
  list[selectedRow].age = formData.age;
  list[selectedRow].country = formData.country;
  list[selectedRow].hobby = formData.hobby;
  selectedRow = null;
  localStorage.setItem ('list', JSON.stringify (list));
  list = JSON.parse (localStorage.getItem ('list'));
  rendertable ();
}

function previewFile () {
  var preview = document.getElementById ('profile_pic').files[0];
  document.getElementById ('i').src = preview.name;
}

function onDelete (index) {
  console.log(index)

  if (confirm ('Are you sure to delete this record ?')) {
    list.splice(index,1)
    localStorage.setItem('list', JSON.stringify(list));
    rendertable();
   // document.getElementById ('employeeList').deleteRow (row.rowIndex);
   resetForm ();
 }
}


function validate () {
  var uname = document.getElementById ('fullName');
  var uemail = document.getElementById ('email');
  var inputtxt = document.getElementById ('pwd');
  var umsex = document.getElementById ('male');
  var ufsex = document.getElementById ('female');
  var age_s = document.getElementById ('age');
  var ucountry = document.getElementById ('country');

  if (allLetter(uname)) {
    if (ValidateEmail(uemail)) {
      if (passid_validation(inputtxt)) {
        if (validsex(umsex, ufsex)) {
          if (ages(age_s)) {
            if (countryselect (ucountry)) {
            }
          }
        }
      }
    }
  }
  return true;
}

function passid_validation (inputtxt) { 
var passw=  /^[A-Za-z]\w{7,14}$/;
  if (inputtxt.value.match(passw)) { 
  document.getElementById ('lbltext1').innerHTML =
  'Password should not be empty / length be between 7 or 14';
document.getElementById ('lbltext1').style.visibility = 'visible';
document.getElementById ('lbltext1').style.color = 'red';
passid.focus ();
return false;
} else {
  return true;  
}
}

function allLetter (uname) {
  var letters = /^[A-Za-z]+$/;
  if (uname.value.match (letters)) {
    return true;
  } else {
    document.getElementById ('lbltext2').innerHTML =
      'Username must have alphabet characters only';
    document.getElementById ('lbltext2').style.visibility = 'visible';
    document.getElementById('lbltext2').style.color = 'red';
    uname.focus();
    return false;
  }
}

function countryselect (ucountry) {
  if (ucountry.value == '') {
    document.getElementById ('lbltext3').innerHTML =
      'Select your country from the list';
    document.getElementById ('lbltext3').style.visibility = 'visible';
    document.getElementById('lbltext3').style.color = 'red';
    ucountry.focus ();
    return false;
  } else {
    return true;
  }
}

function ValidateEmail (uemail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (uemail.value.match (mailformat)) {
    return true;
  } else {
    document.getElementById ('lbltext').innerHTML =
      'You have entered an invalid email address!';
    document.getElementById ('lbltext').style.visibility = 'visible';
    document.getElementById ('lbltext').style.color = 'red';
    uemail.focus ();
    return false;
  }
}

function validsex (umsex, ufsex) {
  if (umsex.checked == false && ufsex.checked == false) {
    document.getElementById ('lbltext4').innerHTML =
      'You must select male and female';
    document.getElementById ('lbltext4').style.visibility = 'visible';
    document.getElementById('lbltext4').style.color = 'red';
    umsex.focus();
    ufsex.focus();
    return false;
  } else {
    return true;
  }
}

function ages (age_s) {
  if (age_s.value <= 13 || age_s.value > 60) {
    document.getElementById ('lbltext5').innerHTML =
      'Your age is 13 to 59 valid';
    document.getElementById ('lbltext5').style.visibility = 'visible';
    document.getElementById('lbltext5').style.color = 'red';
    age_s.focus();
    return false;
  } else {
    return true;
  }
}

const text = localStorage.getItem ('list');
const c = JSON.parse (text);
if (c.length !== 0) {
  list = c;
}
rendertable ();
function onSearch() {
    let filter = document.getElementById('myInput').value.toUpperCase();
    let mytable = document.getElementById('tbody');
    let tr = tbody.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        let textvalue = td.textContent || td.innerHTML;
        if (textvalue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}

const searchFun = () => {
  let filter = document.getElementById('myInput').value.toUpperCase();
  let mytable = document.getElementById('tbody');
  let tr = tbody.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName('td')[1];
    if (td) {
      let textvalue = td.textContent || td.innerHTML;
      if (textvalue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
