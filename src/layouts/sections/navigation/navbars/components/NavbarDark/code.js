const navbarDarkCode = `// IdiomaFast React components
import MKBox from "components/MKBox";

// IdiomaFast React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

// Pages
import SignIn from "layouts/pages/authentication/sign-in";

function NavbarDark() {
  return (
    <MKBox variant="gradient" bgColor="dark" shadow="sm" py={0.25}>
    <DefaultNavbar routes={routes} transparent light />
    </MKBox>
  );
}

export default NavbarDark;`;

export default navbarDarkCode;
