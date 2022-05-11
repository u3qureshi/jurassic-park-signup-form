const multiStepForm = document.querySelector('[data-multi-step-form]');
const separateSignupSteps = [...multiStepForm.querySelectorAll('[data-signup-step]')];
let currentStep =
    separateSignupSteps.findIndex(step => {
        return step.classList.contains('active')
    });

if (currentStep < 0) {
    currentStep = 0;
    separateSignupSteps[currentStep].classList.add('active');
    displayCurrentStep();
}

/**Verifying if the password and confirm password match */
const passwordInput = document.querySelector('[data-password]');
const confirmPasswordInput = document.querySelector('[data-confirm-password]');
const nextButtons = document.querySelectorAll('[data-next-button]');
const previousButtons = document.querySelectorAll('[data-previous-button]');
const firstNextButton = document.querySelector("[data-next-button='1']");
passwordInput.addEventListener('input', checkPassword);
confirmPasswordInput.addEventListener('input', checkPassword);

//checkValidity() pretends like you clicked submit and returns true or false if they are accurately entered
//reportValidity() does the same thing as checkValidity() but it also reports the error to the user
nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', e => {
        let incrementor;
        if (e.target.matches('[data-next-button]'))
            incrementor = 1;

        if (incrementor == null) return;


        //The some() method checks if any array elements pass a test 
        //The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
        const inputFields = [...separateSignupSteps[currentStep].querySelectorAll('input')];
        if (inputFields.every(input => input.reportValidity())) {
            currentStep += incrementor;
            displayCurrentStep();
        }

    });
});
previousButtons.forEach(previousButton => {
    previousButton.addEventListener('click', e => {
        if (e.target.matches('[data-previous-button]'))
            incrementor = -1;
        if (incrementor == null) return;

        //The some() method checks if any array elements pass a test 
        //The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
        const inputFields = [...separateSignupSteps[currentStep].querySelectorAll('input')];
        currentStep += incrementor;
        displayCurrentStep();

    });
});


/*This function will toggle the class 'active' for the currentStep*/
function displayCurrentStep() {
    separateSignupSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
        //The second version of the method accepts a Boolean parameter. If this parameter is true, then the matched elements are shown; if false, the elements are hidden
    });
}

function checkPassword() {
    const text1 = document.querySelector('h4');
    const text2 = document.querySelectorAll('li');


    if (passwordInput.value === confirmPasswordInput.value && passwordInput.checkValidity() && confirmPasswordInput.checkValidity()) {
        firstNextButton.disabled = false;
        passwordInput.style.border = '2px solid green';
        confirmPasswordInput.style.border = '2px solid green';
        text1.style.color = 'darkgreen';
        text2.forEach(text => text.style.color = 'darkgreen');

    } else {
        firstNextButton.disabled = true;
        passwordInput.style.border = '2px solid red';
        confirmPasswordInput.style.border = '2px solid red';
        text1.style.color = 'red';
        text2.forEach(text => text.style.color = 'red');
    }

}