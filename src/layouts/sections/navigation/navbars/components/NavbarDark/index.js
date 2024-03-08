/* eslint-disable no-param-reassign */
/**
=========================================================
* IdiomaFast React - v2.1.0
=========================================================

Projeto

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// IdiomaFast React components
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

export default NavbarDark;
