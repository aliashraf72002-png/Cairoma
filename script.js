document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = document.getElementById('loader');
    const successMessage = document.getElementById('successMessage');
    const WEBHOOK_URL = 'https://searchlessai.cloud/webhook/46482f21-bc8d-472f-939e-1914032e683e';

    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prepare data
        const formData = new FormData(feedbackForm);
        const data = {
            restaurant_name: 'CAIROMA',
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            feedback: formData.get('feedback')
        };

        // UI State: Loading
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        loader.style.display = 'block';

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success
                feedbackForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Something went wrong. Please try again later.');
            
            // Revert UI State
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            loader.style.display = 'none';
        }
    });
});
