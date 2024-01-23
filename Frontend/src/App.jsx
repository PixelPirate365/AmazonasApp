import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import SignInPage from "./Pages/SignInPage";
import { ToastContainer } from "react-toastify";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
