document.addEventListener('DOMContentLoaded', () => {

    // --- On-Scroll Reveal Animations (Your existing code) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Re-usable observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view, add the 'in-view' class
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1 // Animation triggers when 10% of the element is visible
    });

    // Observe each element with the animation class
    animatedElements.forEach(el => observer.observe(el));


    // --- New code for Contact Form and Success Modal ---

    const contactForm = document.getElementById('contact-form');
    // Ensure the contact form exists on the page before adding listeners
    if (contactForm) {
        const modal = document.getElementById('successModal');
        const closeButton = document.querySelector('.close-button');

        // Function to show the modal
        function showModal() {
            if (!modal) return; // Do nothing if modal isn't on the page
            modal.style.display = 'block';
            setTimeout(function() {
                modal.style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10); // A short delay allows the CSS transition to work
        }

        // Function to hide the modal
        function closeModal() {
            if (!modal) return; // Do nothing if modal isn't on the page
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
            setTimeout(function() {
                modal.style.display = 'none';
            }, 300); // Wait for the transition to finish
        }

        // Event listener for the form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission (page reload)

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // If submission is successful
                    showModal();
                    contactForm.reset(); // Clear the form fields
                } else {
                    // If there was a server error
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oops! There was a problem submitting your form.');
                        }
                    })
                }
            }).catch(error => {
                // If there was a network error
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form.');
            }).finally(() => {
                // Re-enable the button and restore its text
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });

        // Close the modal when the user clicks on the close button (x)
        if (closeButton) {
            closeButton.onclick = function() {
                closeModal();
            }
        }

        // Close the modal when the user clicks anywhere outside of the modal content
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    }
});