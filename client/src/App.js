import "./App.scss";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./components/signUp/SignUpPage";
import SignInPage from "./components/signIn/SignInPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
