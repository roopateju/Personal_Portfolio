
        const inputs = document.querySelectorAll(".container .fields input");
        const verifyButton = document.querySelector(".container .verify-btn");

        const handleOtp = (e) => {
            const input = e.target;
            const inputValue = input.value;
            const inputIndex = parseInt(input.dataset.index, 10);

            input.value = inputValue ? inputValue[0] : '';

            if (inputValue.length > 0 && inputIndex < inputs.length - 1) {
                inputs[inputIndex + 1].disabled = false;
                inputs[inputIndex + 1].focus();
                inputs[inputIndex].disabled = true;
            }

            if (e.key === "Backspace" && inputIndex > 0) {
                inputs[inputIndex - 1].disabled = false;
                inputs[inputIndex - 1].focus();
                inputs[inputIndex].disabled = true;
            }

            verifyButton.disabled = !Array.from(inputs).every(input => input.value !== '');
            verifyButton.classList.toggle("active", !verifyButton.disabled);
        }

        inputs.forEach((input, index) => {
            input.dataset.index = index;
            input.addEventListener('keyup', handleOtp);
            if (index === 0) input.disabled = false;
        });
    
