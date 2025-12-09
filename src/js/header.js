// header.js - Logique du header

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
});

function initHeader() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && 
                !event.target.closest('#mainNav') && 
                !event.target.closest('#menuToggle') &&
                mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
        
        // Mobile nav dropdown toggle
        if (window.innerWidth <= 768) {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                if (item.querySelector('.nav-dropdown')) {
                    item.querySelector('a').addEventListener('click', function(e) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    });
                }
            });
        }
        
        // Desktop dropdown hover
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const dropdown = item.querySelector('.nav-dropdown');
            if (dropdown) {
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.opacity = '1';
                        dropdown.style.visibility = 'visible';
                        dropdown.style.transform = 'translateY(0)';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateY(10px)';
                    }
                });
            }
        });
    }
    
    // Dropdown user menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Highlight active page in navigation
    highlightActivePage();
}

function highlightActivePage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if current path matches link path
        if (linkPath && linkPath !== '#') {
            const absoluteLinkPath = new URL(linkPath, window.location.origin).pathname;
            if (currentPath === absoluteLinkPath) {
                link.classList.add('active');
                
                // Also highlight parent dropdown if applicable
                const parentItem = link.closest('.nav-item');
                if (parentItem) {
                    const parentLink = parentItem.querySelector('a:first-child');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
            }
        }
    });
}