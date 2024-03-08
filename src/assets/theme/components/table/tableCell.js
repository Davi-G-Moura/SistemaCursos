/**
=========================================================
* IdiomaFast React - v2.1.0
=========================================================

Projeto

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// IdiomaFast React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// IdiomaFast React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

export default {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};
