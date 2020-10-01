const storage = window.localStorage
const allCustomers = JSON.parse(storage.getItem('customer')) || []

function searchFunction(param, value) {
  if (allCustomers.length) {
    document.getElementById('view-box').innerHTML = ''
    const allValues = allCustomers.filter(customer => param === 'email' ? customer[param].includes(value): customer[param].join(" ").includes(value) )
    if (allValues.length) {
      allValues.map(customer => {
        let container = document.createElement('div')
        container.setAttribute('class', 'tx-bg margin-horizontal grid-container')
        let flexContainer1 = document.createElement('div')
        flexContainer1.setAttribute('class', 'grid-item')
        let flexContainer2 = document.createElement('div', { class: 'grid-item' })
        flexContainer2.setAttribute('class', 'grid-item')
        let fullname = document.createElement('p')
        let emailVal = document.createElement('p')
        let favFood = document.createElement('p')
        let phoneNum = document.createElement('p')
        let customerOcc = document.createElement('p')

        fullname.textContent = `Fullname: ${customer.fname} ${customer.lname}`
        emailVal.textContent = `Email: ${customer.email}`
        favFood.textContent = `Favorite Foods: ${customer.favorite.join(", ")}`
        phoneNum.textContent = `Phone Number: ${customer.phone}`
        customerOcc.textContent = `Occupation: ${customer.occupation}`

        flexContainer1.append(fullname, emailVal, favFood)
        flexContainer2.append(phoneNum, customerOcc)
        container.append(flexContainer1, flexContainer2)

        let result = document.getElementById("view-box").appendChild(container)
        if(!value) {
        result = document.getElementById('view-box').innerHTML = ''
        return
      }
        return result
      })

    } else {
      document.getElementById('view-box').innerHTML = `<h3>Your ${value} search returned 0 results<h3>`
    }
  }
}

document.getElementById("searchmail").addEventListener('input', function (e) {
  searchFunction('email', e.target.value)
})

document.getElementById("searchfood").addEventListener('input', function (e) {
  searchFunction('favorite', e.target.value)
})