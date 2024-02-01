import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import SignInPage from "./Pages/SignInPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import SignUpPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import DescriptionPage from "./Pages/DescriptionPage";
import CartPage from "./Pages/CartPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import SubmitOrderPage from "./Pages/SubmitOrderPage";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
          limit={2}
        />
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
              {/* <Route path="/order/:_id" element={<SubmitOrderPage />} /> */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/product/:token" element={<DescriptionPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
