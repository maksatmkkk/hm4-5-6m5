import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MovieDetail from "./pages/movieDetail";
import SeriesDetail from "./pages/seriesDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorPage from "./pages/errorPage";
import { useSelector } from "react-redux";
import GoogleAuth from "./firebase/GoogleAuth";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/series/:seriesId" element={<SeriesDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="google">
          <GoogleAuth />
        </div>
      )}
    </>
  );
};

export default App;
