import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/admin/AdminSidebar"
import AdminHeader from "../components/admin/AdminHeader"
import styled from "styled-components"

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #1A237E;
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

const AdminLayout = () => {
  return (
    <AdminContainer>
      <SidebarWrapper>
        <AdminSidebar />
      </SidebarWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <AdminHeader />
        </HeaderWrapper>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </AdminContainer>
  )
}

export default AdminLayout

