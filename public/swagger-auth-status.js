document.addEventListener("DOMContentLoaded", () => {
  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/auth-status");
      const data = await response.json();

      const topbarWrapper = document.querySelector(".swagger-ui .topbar .wrapper");
      if (!topbarWrapper) return;

      // Evitar duplicar el contenedor si ya existe
      let authContainer = document.getElementById("swagger-auth-container");
      if (authContainer) {
        authContainer.remove();
      }

      authContainer = document.createElement("div");
      authContainer.id = "swagger-auth-container";

      // Estilos CSS inyectados para forzar la alineación horizontal limpia
      const styles = `
        /* Forzar que el contenedor padre distribuya elementos horizontalmente */
        .swagger-ui .topbar .wrapper {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          flex-wrap: nowrap !important;
          width: 100% !important;
        }

        /* Asegurar que el logo no empuje el resto de los elementos hacia abajo */
        .swagger-ui .topbar .wrapper a.link {
          display: flex !important;
          align-items: center !important;
          margin-right: 15px !important;
        }

        #swagger-auth-container {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          margin-left: auto !important; /* Empuja todo al extremo derecho */
          white-space: nowrap !important;
          font-family: sans-serif;
        }

        .auth-badge {
          display: inline-flex !important;
          align-items: center !important;
          height: 30px !important;
          padding: 0 12px !important;
          border-radius: 4px;
          font-size: 12px !important;
          font-weight: 700;
          line-height: 1;
          color: #ffffff;
          box-sizing: border-box;
        }

        .auth-badge.logged-in {
          background-color: #49cc90; /* Verde idéntico a Authorize en Swagger */
        }

        .auth-badge.logged-out {
          background-color: #f89406; /* Ámbar/Naranja equilibrado */
        }

        .auth-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 30px !important;
          padding: 0 14px !important;
          font-size: 12px !important;
          font-weight: 700;
          line-height: 1;
          border-radius: 4px;
          text-decoration: none !important;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border: 1px solid transparent;
          box-sizing: border-box;
        }

        .auth-btn-login {
          background-color: #4990e2;
          color: #ffffff !important;
          border-color: #357ae8;
        }

        .auth-btn-login:hover {
          background-color: #357ae8;
        }

        .auth-btn-logout {
          background-color: transparent;
          color: #f93e3e !important;
          border-color: #f93e3e;
        }

        .auth-btn-logout:hover {
          background-color: #f93e3e;
          color: #ffffff !important;
        }
      `;

      // Inyectar etiquetas de estilo si aún no están en la página
      if (!document.getElementById("swagger-auth-styles")) {
        const styleTag = document.createElement("style");
        styleTag.id = "swagger-auth-styles";
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
      }

      if (data.isAuthenticated) {
        authContainer.innerHTML = `
          <span class="auth-badge logged-in">
            👤 ${data.user.name || data.user.nickname || data.user.email}
          </span>
          <a href="/logout" class="auth-btn auth-btn-logout">Logout</a>
        `;
      } else {
        authContainer.innerHTML = `
          <span class="auth-badge logged-out">
            🔒 Not Logged In
          </span>
          <a href="/login" class="auth-btn auth-btn-login">Login with Auth0</a>
        `;
      }

      topbarWrapper.appendChild(authContainer);
    } catch (error) {
      console.error("Error loading Auth Status in Swagger UI:", error);
    }
  };

  // Reintento controlado para asegurar que Swagger UI cargó en el DOM
  setTimeout(checkAuthStatus, 300);
});
