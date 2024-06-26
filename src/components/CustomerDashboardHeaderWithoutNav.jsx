import {
    CButton,
  } from "@coreui/react";
  
//   This is componant came from CustomerDashboardHeader.jsx

  export const CustomerDashboardHeaderWithoutNav = () => {
  
    //   const [showMobileMenu, setShowMobileMenu] = useState(false)
  
    const handleLogout = async () => {
      await dispatch(customerLogout());
      navigate("/login");
    };
    return (
      <header>
        <div className="d-flex justify-content-between items-center nav-container px-20x py-20x">
          {/* -----Left----- */}
          <div className="left ">
            {/* <button onClick={()=>setShowMobileMenu(true)} className="customer-dashboard-hamburgur-menu border-none outline-none bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button> */}
  
            <h1 className="h4 fw-bold">My Packages</h1>
            {/* <CNav className="navigation">
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 1}
                  component="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Packages
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 2}
                  component="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Profile
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 3}
                  component="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Contact
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 4}
                  component="button"
                  role="tab"
                  aria-controls="disabled-tab-pane"
                  aria-selected={activeKey === 4}
                  onClick={() => setActiveKey(4)}
                >
                  Disabled
                </CNavLink>
              </CNavItem>
            </CNav> */}
          </div>
          {/* -----Right----- */}
          <div className="right">
            <CButton
              className="font-medium border-none outline-none"
              color=""
              onClick={handleLogout}
            >
              Logout
            </CButton>
          </div>
        </div>
        {/* --------Menubar Popup--------- */}
        {/* <div className="CustomerDashboardMenuPopup" style={{display: showMobileMenu? "block":"none"}} onClick={()=>setShowMobileMenu(false)}>
          <CNav className="navigation-popup">
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 1}
                  component="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Packages
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 2}
                  component="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Profile
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 3}
                  component="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Contact
                </CNavLink>
              </CNavItem>
              <CNavItem role="presentation">
                <CNavLink
                  active={activeKey === 4}
                  component="button"
                  role="tab"
                  aria-controls="disabled-tab-pane"
                  aria-selected={activeKey === 4}
                  onClick={() => setActiveKey(4)}
                >
                  Disabled
                </CNavLink>
              </CNavItem>
            </CNav>
        </div> */}
      </header>
    );
  };
  