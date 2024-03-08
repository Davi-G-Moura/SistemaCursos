// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import UserIcon from "@mui/icons-material/Book";

// Pages
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";

const routes = [
  {
    name: "Paginas",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Informações",
        collapse: [
          {
            name: "Contato",
            route: "/pages/landing-pages/contact-us",
            component: <ContactUs />,
          },
          {
            name: "Criador",
            route: "/pages/landing-pages/author",
            component: <Author />,
          },
        ],
      },
    ],
  },
  {
    name: "WhatsApp",
    icon: <WhatsAppIcon />,
    href: "https://wa.me/5561999789428",
  },
  {
    name: "Espaço Aluno",
    route: "/pages/authentication/sign-in",
    icon: <UserIcon />,
    component: <SignIn />,
  },
];

export default routes;
