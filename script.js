// /====================================== navbar active class ======================================/ 
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar a');
    const sections = Array.from(links).map(link => document.querySelector(link.getAttribute('href')));

    function changeActiveClass() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                links.forEach(link => link.classList.remove('active'));
                links[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', changeActiveClass);
    changeActiveClass(); // Initial check
});

// /====================================== toggle icon navbar ======================================/ 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

// /====================================== scroll section active link ==============================/
let section = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top > offset && top < offset + height) {
            navlinks.forEach.apply(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // /====================================== sticky navbar ======================================/ 
    let header = document.querySelector('header');
    header.classList.toggle.apply('sticky', window.scrollY > 100);

    // /====================================== remove toggle icon and navbar =======================/ 
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
}; 
    // /====================================== scroll reveal ======================================/
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skill-content, .project-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

    // /====================================== typed js ======================================/
    const typed = new Typed('.multiple-text',{
        // strings: ['Java Full Stack Developer','Web Developer','Web Designer'],
        strings: ['Web Developer','Web Designer'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });

// /====================================== Form Submission ======================================/


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});