let title = ""
let fname = ""
let lname = ""
let email = ""
let phone = ""
let occupation = ""
let preference = ""
let favorites = []

const storage = window.localStorage


function showFeedback(id, message) {
  document.getElementById(id).innerHTML = message
}

function validateForm() {
  const allCustomers = JSON.parse(storage.getItem('customer')) || []
  if (!title) {
    showFeedback('error', 'Title is required')
    return false
  }
  if (!fname) {
    showFeedback('error', 'Firstname is required')
    return false
  }
  if (!lname) {
    showFeedback('error', 'Lastname is required')
    return false
  }
  if (!email) {
    showFeedback('error', 'Email is required')
    return false
  }
  if (!phone) {
    showFeedback('error', 'Phone number is required')
    return false
  }
  if (!preference) {
    showFeedback('error', 'Please include customers favorite food')
    return false
  }
  if (allCustomers.length &&
    allCustomers.filter(customer => customer.email === email).length
  ) {
    showFeedback('error', 'Customer email already exists')
    return false
  }
  showFeedback('error', '')
  return true
}

function getFormValues() {
  title = document.getElementById("title").value
  fname = document.getElementById("fname").value
  lname = document.getElementById("lname").value
  email = document.getElementById("email").value
  phone = document.getElementById("phone").value
  occupation = document.getElementById("occupation").value
  preference = document.getElementById("preference").value

  if (!validateForm()) return;
  favorites = preference.replace(/, /g, ",").split(",")

  const newUser = {
    title: title ? title : '',
    fname: fname ? fname : '',
    lname: lname ? lname : '',
    email: email ? email : '',
    phone: phone ? phone : '',
    occupation: occupation ? occupation : '',
    favorite: favorites ? favorites : []
  }
  const allCustomers = JSON.parse(storage.getItem('customer')) || []
  const newCustomers = [...allCustomers, newUser]

  storage.setItem('customer', JSON.stringify(newCustomers))
  document.getElementById("title").value = ''
  document.getElementById("fname").value = ''
  document.getElementById("lname").value = ''
  document.getElementById("email").value = ''
  document.getElementById("phone").value = ''
  document.getElementById("occupation").value = ''
  document.getElementById("preference").value = ''

  document.getElementById("notificationBox6").innerHTML = `<p class="text-center" id="notification" style="background-color: white; color: green; padding: 1rem; border-radius: 1rem;">customer ${email} added</p>`
  setTimeout(() => {
    document.getElementById("notificationBox6").innerHTML = '<p class="text-center error-color" id="error"></p>'
  }, 5000)
}


