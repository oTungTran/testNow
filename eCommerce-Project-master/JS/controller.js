const controller = {};

controller.register = (data) => {
    console.log(data);
    view.setErrorMessage('name-error', data.name === '' ? 'Please Enter Your Name' : '');
    view.setErrorMessage('phone-error', data.phone === '' ? 'Please Enter Your Phone' : '');


    if (data.email === '') {
        view.setErrorMessage('email-error', 'Please Enter Your Email')

    } else {
        if (controller.validateEmail(data.email) == true) {
            view.setErrorMessage('email-error', '')
            document.getElementById('email-error').innerHTML = '';
        } else {
            view.setErrorMessage('email-error', 'Invalid Email')
        }
    }

    if (data.password === '') {
        view.setErrorMessage('password-error', 'Please Enter Your Password');
    } else {
        if (validatePassword(data.password)) {
            view.setErrorMessage('password-error', '');
        } else {
            view.setErrorMessage('password-error', 'Password Must Be Longer Than 6 Characters, Contains 1 Upper Case Character and 1 Number');
        }
    }

    if (data.confirmPassword === '') {
        view.setErrorMessage('confirmPw-error', 'Please Confirm Your Password');
    } else {
        if (data.confirmPassword !== data.password) {
            view.setErrorMessage('confirmPw-error', "Confirm Password Doesn't Match With PassWord");
        } else {
            view.setErrorMessage('confirmPw-error', '');
        }
    }
    if (data.name !== '' && data.email !== '' && data.password !== '') {
        console.log('ok');
        model.register(data);
    }else{
        console.log('2');
    };
};

controller.login = (data) => {
    
    if (data.email !== '' && data.password !== '') {
        model.login(data);
    };
};

controller.addressForm = (data) => {
    let flag = true;
    if (data.name == '' || data.email == '' || data.address == '' || data.phone == '') {
        
        alert('Enter Your Information!');
        flag = false;
    }
    return flag;
};





controller.validateEmail=(email)=> {
    const emailFomat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFomat.test(String(email).toLowerCase());
};

function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return re.test(password);
};