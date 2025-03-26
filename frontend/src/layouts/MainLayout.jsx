import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import styled from "styled-components"

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.main`
  flex: 1;
  padding: 20px 0;
`

const MainLayout = () => {
  return (
    <MainContainer>
      <Navbar />
      <Content className="container">
        <Outlet />
      </Content>
      <Footer />
    </MainContainer>
  )
}

export default MainLayout

