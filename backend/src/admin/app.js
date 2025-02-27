import logo from "./extensions/logo.jpg";

const config = {
  locales: [ 'it', 'en' ],
  auth: {
    logo
  },
  head: {
    logo
  },
  menu: {
    logo
  },
  translations: {
    en: {
      "Auth.form.welcome.title": "Welcome to MISTRA",
      "Auth.form.welcome.subtitle": "Log in with your credential",
      "app.components.LeftMenu.navbrand.title": "MISTRA",
      "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      "Auth.form.button.password-recovery": "Password Recovery",
      "Auth.link.ready": "Log in if you have the credentials"
    },
    it: {
      "Auth.form.welcome.title": "Benvenuto nel MISTRA",
      "Auth.form.welcome.subtitle": "Accedi con le tue credenziali",
      "app.components.LeftMenu.navbrand.title": "MISTRA",
      "app.components.LeftMenu.navbrand.workplace": "Admin Panel",
      "Auth.form.button.password-recovery": "Recupero Password",
      "Auth.link.ready": "Accedi se ha le credenziali"
    }
  },
  notifications: {
    releases: false
  },
  tutorials: false
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
