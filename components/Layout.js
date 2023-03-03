import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar />

      <main>
        {children}
      </main>

      <Footer />
      
    </div>
  )
}
