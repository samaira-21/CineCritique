import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; 
import { ThemeProvider } from "./context/theme";
import { useEffect, useState } from "react";

export default function App() {
  const [themeMode, setThemeMode] = useState("dark")
  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <Router>
      <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-linear-to-b dark:from-[#181818] dark:to-black text-black dark:text-white">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      </ThemeProvider>
    </Router>
  );
}
