// BANCOOP Landing Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Toggle icon between hamburger and X
      const icon = mobileMenuToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });
  }

  // Registration navigation
  const registerButton = document.querySelector(".btn-register");
  if (registerButton) {
    registerButton.addEventListener("click", function (e) {
      e.preventDefault();
      showRegistrationSection();
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
        const icon = mobileMenuToggle.querySelector("i");
        icon.className = "fas fa-bars";
      }
    });
  });

  // Form validation and submission
  const loginForm = document.querySelector(".login-form form");
  const registrationForm = document.querySelector(".registration-form form");

  // Login form handling
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const account = document.getElementById("account").value;
      const accountType = document.getElementById("account-type").value;
      const password = document.getElementById("password").value;

      if (!account || !accountType || !password) {
        showNotification("Por favor completa todos los campos", "error");
        return;
      }

      // Simulate login process
      showNotification("Iniciando sesión...", "info");

      setTimeout(() => {
        showNotification("¡Bienvenido a BANCOOP!", "success");
        // Here you would typically redirect to the dashboard
        console.log("Login attempt:", { account, accountType });
      }, 1500);
    });
  }

  // Registration form handling
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("full-name").value;
      const email = document.getElementById("email").value;
      const document = document.getElementById("document").value;
      const newPassword = document.getElementById("new-password").value;

      if (!fullName || !email || !document || !newPassword) {
        showNotification("Por favor completa todos los campos", "error");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification(
          "Por favor ingresa un correo electrónico válido",
          "error"
        );
        return;
      }

      // Basic password validation
      if (newPassword.length < 6) {
        showNotification("La clave debe tener al menos 6 caracteres", "error");
        return;
      }

      // Simulate registration process
      showNotification("Creando tu cuenta...", "info");

      setTimeout(() => {
        showNotification(
          "¡Cuenta creada exitosamente! Revisa tu correo electrónico.",
          "success"
        );
        registrationForm.reset();
      }, 1500);
    });
  }

  // Transacciones sidebar interactions
  const transaccionItems = document.querySelectorAll(".transaccion-item");
  transaccionItems.forEach((item) => {
    item.addEventListener("click", function () {
      const transaccionName = item.textContent;
      showNotification(`Accediendo a ${transaccionName}...`, "info");
    });
  });

  // Tarjetas de crédito interactions
  const tarjetaItems = document.querySelectorAll(".tarjeta-item");
  tarjetaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const tarjetaName = item.textContent;
      showNotification(`Información sobre ${tarjetaName}...`, "info");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Notification system
  function showNotification(message, type = "info") {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 400px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid;
            color: white;
        `;

    // Set colors based on type
    switch (type) {
      case "success":
        notification.style.background = "rgba(16, 185, 129, 0.9)";
        notification.style.borderLeftColor = "#10b981";
        break;
      case "error":
        notification.style.background = "rgba(239, 68, 68, 0.9)";
        notification.style.borderLeftColor = "#ef4444";
        break;
      case "info":
      default:
        notification.style.background = "rgba(59, 130, 246, 0.9)";
        notification.style.borderLeftColor = "#3b82f6";
        break;
    }

    // Add close functionality
    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => {
      notification.style.animation = "slideOutRight 0.3s ease-in forwards";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.3s ease-in forwards";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);

    document.body.appendChild(notification);
  }

  function getNotificationIcon(type) {
    switch (type) {
      case "success":
        return "fa-check-circle";
      case "error":
        return "fa-exclamation-circle";
      case "info":
      default:
        return "fa-info-circle";
    }
  }

  // Add notification animations to CSS
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-content i:first-child {
                font-size: 1.25rem;
                flex-shrink: 0;
            }
            
            .notification-content span {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: background-color 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
    document.head.appendChild(style);
  }

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".form-card, .product-card, .transaction-categories"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Initialize any tooltips or additional interactive features
  console.log("BANCOOP Landing Page initialized successfully");
});

// Navigation functions
function showRegistrationSection() {
  document.querySelector(".main-layout-section").style.display = "none";
  document.querySelector(".registration-section").style.display = "block";

  // Scroll to top
  window.scrollTo(0, 0);
}

function showMainSection() {
  document.querySelector(".main-layout-section").style.display = "block";
  document.querySelector(".registration-section").style.display = "none";

  // Scroll to top
  window.scrollTo(0, 0);
}
