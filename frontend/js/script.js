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
  const loginForm = document.querySelector(".login-card form");
  const registrationForm = document.querySelector(".registration-form form");

  console.log("🔍 Formularios encontrados:", { loginForm, registrationForm });

  // Login form handling
  if (loginForm) {
    console.log(
      "✅ Formulario de login encontrado, agregando event listener..."
    );
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("🔑 Formulario de login enviado - preventDefault ejecutado");

      const account = document.getElementById("account").value;
      const accountType = document.getElementById("account-type").value;
      const password = document.getElementById("password").value;

      console.log("📝 Datos de login:", { account, accountType, password });

      if (!account || !password) {
        showNotification("Por favor completa todos los campos", "error");
        return;
      }

      // Mostrar loading
      showNotification("Iniciando sesión...", "info");

      try {
        console.log("📤 Enviando datos de login al backend");

        // Llamar a la API del backend
        const response = await apiService.login(account, password);

        console.log("📥 Respuesta de login del backend:", response);

        if (response.success) {
          console.log("✅ Login exitoso, preparando redirección...");

          // Guardar datos del usuario en localStorage
          const userData = {
            cuenta: response.data.cuenta,
            tipo: response.data.tipo,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            dinero: response.data.dinero || 0, // Obtener saldo del backend
          };

          localStorage.setItem("userData", JSON.stringify(userData));
          console.log("💾 Datos guardados en localStorage:", userData);

          showNotification("¡Bienvenido a BANCOOP!", "success");

          // Redirigir al dashboard después de un breve delay
          setTimeout(() => {
            console.log("🔄 Redirigiendo al dashboard...");
            window.location.href = "dashboard.html";
          }, 1000);
        } else {
          console.log("❌ Login falló:", response);
          showNotification("Error en el login. Intenta de nuevo.", "error");
        }
      } catch (error) {
        console.error("Error en login:", error);

        // Mostrar mensaje específico según el tipo de error
        let errorMessage = "Error al iniciar sesión. Intenta de nuevo.";

        if (error.message.includes("Credenciales inválidas")) {
          errorMessage =
            "❌ Credenciales incorrectas. Verifica tu número de cuenta y clave.";
        } else if (error.message.includes("Cuenta y clave son requeridos")) {
          errorMessage = "❌ Por favor completa todos los campos.";
        } else if (error.message.includes("Error interno del servidor")) {
          errorMessage = "❌ Error del servidor. Intenta más tarde.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "❌ No se puede conectar al servidor. Verifica tu conexión.";
        }

        showNotification(errorMessage, "error");
      }
    });
  } else {
    console.log("❌ Formulario de login no encontrado");
  }

  // Registration form handling
  if (registrationForm) {
    registrationForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("🚀 Formulario de registro enviado");

      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const cuenta = document.getElementById("cuenta").value;
      const tipoCuenta = document.getElementById("tipo-cuenta").value;
      const dineroInicial = document.getElementById("dinero-inicial").value;
      const clave = document.getElementById("clave").value;

      console.log("📝 Datos del formulario:", {
        nombre,
        apellido,
        cuenta,
        tipoCuenta,
        dineroInicial,
        clave,
      });

      if (!nombre || !apellido || !cuenta || !tipoCuenta || !clave) {
        showNotification("Por favor completa todos los campos", "error");
        return;
      }

      // Validar número de cuenta
      if (cuenta.length < 6) {
        showNotification(
          "El número de cuenta debe tener al menos 6 dígitos",
          "error"
        );
        return;
      }

      // Validar saldo inicial
      const saldo = parseInt(dineroInicial);
      if (saldo < 0) {
        showNotification("El saldo inicial no puede ser negativo", "error");
        return;
      }

      // Basic password validation
      if (clave.length < 4) {
        showNotification("La clave debe tener al menos 4 caracteres", "error");
        return;
      }

      // Mostrar loading
      showNotification("Creando tu cuenta...", "info");

      try {
        // Preparar datos para el registro según la función fun_insert_usuario
        const userData = {
          cuenta: cuenta,
          tipo: tipoCuenta,
          clave: clave,
          dinero: saldo,
          nombre: nombre,
          apellido: apellido,
        };

        console.log("📤 Enviando datos al backend:", userData);

        // Llamar a la API del backend
        const response = await apiService.register(userData);

        console.log("📥 Respuesta del backend:", response);

        if (response.success) {
          showNotification(
            "¡Cuenta creada exitosamente! Ya puedes iniciar sesión.",
            "success"
          );
          registrationForm.reset();

          // Cambiar a la sección de login después del registro exitoso
          setTimeout(() => {
            showMainSection();
          }, 2000);
        }
      } catch (error) {
        console.error("Error en registro:", error);
        showNotification(
          error.message || "Error al crear la cuenta. Intenta de nuevo.",
          "error"
        );
      }
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
            animation: slideInRight 1s ease-out;
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
      notification.style.animation = "slideOutRight 1s ease-in forwards";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 1s ease-in forwards";
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
