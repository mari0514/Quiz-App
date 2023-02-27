const signUp = e => {
    let firstName = document.getElementById('firstName').value,
        lastName = document.getElementById('lastName').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('password').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.firstName.toLowerCase() == firstName.toLowerCase() && 
            data.lastName.toLowerCase() == lastName.toLowerCase()
        );

    if(!exist){
        formData.push({ firstName, lastName, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('firstName').focus();
        alert("Account Created.\n\nPlease Sign In using the link below.");
    }
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
    }
    e.preventDefault();
}

function signIn(e) {
    let email = document.getElementById('email').value, pwd = document.getElementById('password').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        location.href = "/";
    }
    e.preventDefault();
}