/*
=========================================================
* IdiomaFast React - v2.1.0
=========================================================

Projeto

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// IdiomaFast React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// IdiomaFast React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/team-5.jpg";
import team2 from "assets/images/bruce-mars.jpg";
import team3 from "assets/images/ivana-squares.jpg";
import team4 from "assets/images/ivana-square.jpg";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Nossa equipe de ensino
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              Os melhores professores estão aqui. Nativos de países de seu respectivo idioma.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Emma Roberts"
                position={{ color: "info", label: "Professora de Ingles" }}
                description="Emma Roberts nasceu nos Estados Unidos, veio nos trazer seu conhecimento na lingua inglesa!"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Gabriel Mota"
                position={{ color: "info", label: "Professor de Japones" }}
                description="Gabriel Mota o criador do nosso sistema, veio nos trazer seu conhecimento da lingua japonesa"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="Ivana Flow"
                position={{ color: "info", label: "Professora de Frances" }}
                description="Ivana Flow nasceu na França, veio nos trazer seu conhecimento na lingua francesa"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Marquez Garcia"
                position={{ color: "info", label: "Professor de Espanhol" }}
                description="Marquez Garcia, veio direto da Espanha ensinar seu idioma e cultura!"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
