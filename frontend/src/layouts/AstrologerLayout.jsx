import { Outlet } from "react-router-dom"
import AstrologerSidebar from "../components/astrologer/AstrologerSidebar"
import AstrologerHeader from "../components/astrologer/AstrologerHeader"
import styled from "styled-components"

const AstrologerContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #4A148C;
  color: white;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
`

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
`

const HeaderWrapper = styled.div`
  height: 70px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`

const MainContent = styled.main`
  padding: 20px;
  background-color: #F5F5F5;
  min-height: calc(100vh - 70px);
`

const AstrologerLayout = () => {
  return (
    <AstrologerContainer>
      <SidebarWrapper>
        <AstrologerSidebar />
      </SidebarWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <AstrologerHeader />
        </HeaderWrapper>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </AstrologerContainer>
  )
}

export default AstrologerLayout

