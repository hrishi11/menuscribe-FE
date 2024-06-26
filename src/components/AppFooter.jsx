import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; {currentYear}</span>
      </div>
      <div className="ms-auto">
        Admin Panel
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
