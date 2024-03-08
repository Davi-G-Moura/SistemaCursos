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

// Pages
import SignIn from "layouts/pages/authentication/sign-in";

// IdiomaFast React examples
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";

function Information() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="public"
                    title="Idiomas"
                    description="Temos professores que ensinam os idiomas mais falados do mundo!"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={5}>
                  <DefaultInfoCard
                    icon="payments"
                    title="Mensalidade com valores acessiveis"
                    description="Nosso foco principal é a aprendizagem. Onde o intuito não é ganhar dinheiro, e sim levar conhecimento!"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="apps"
                    title="Nossas metodologias"
                    description="Temos as melhores metodologias do mercado! Pensamos no melhor jeito do aluno aprender de forma simples e facil!"
                  />
                </MKBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MKBox mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon="3p"
                    title="Plataforma Inovadora!"
                    description="Nossa plataforma ajuda o aluno de todas as formas!"
                  />
                </MKBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="Estude de onde e quando quiser!"
              description="Venha fazer parte de nossa familia!"
              action={{
                type: "internal",
                route: "/pages/authentication/sign-in",
                component: <SignIn />,
                color: "info",
                label: "Espaço Aluno",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
