import React from "react";
import { MainContainer, Container, Logo, Menu, Login, Titles, ContainerLogin } from "./MainMenu.styled";
import NutriiPlan from "../../assets/nutriiplan.png";

const MainMenu = () => {
  return (
    <MainContainer>
      <Container>
        <Logo src={NutriiPlan} />
        <Menu>
            <Titles>Home</Titles>
            <Titles>Alimentos</Titles>
            <Titles>Planejamento</Titles>
            <Titles>Receitas</Titles>
            <ContainerLogin>
                <Login>Login</Login>
            </ContainerLogin>
        </Menu>
      </Container>
    </MainContainer>
  );
};

export default MainMenu;
