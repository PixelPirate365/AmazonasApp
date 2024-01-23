import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import SignInPage from "./Pages/SignInPage";
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <Header/>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="signin" element={<SignInPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
