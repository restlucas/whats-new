import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { PanelLayout } from "./components/panelLayout";
import { Dashboard } from "./pages/(panel)/dashboard";
import { AuthCreator } from "./pages/auth/creator";
import { UserContextProvider } from "./contexts/UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { News } from "./pages/(panel)/news";
import { Support } from "./pages/(panel)/support";
import { Profile } from "./pages/(panel)/profile";
import { Teams } from "./pages/(panel)/teams";
import { TeamContextProvider } from "./contexts/TeamContext";
import { Error } from "./pages/error";
import { Article } from "./pages/article";
import { Search } from "./pages/search";
import { AuthReader } from "./pages/auth/reader";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <TeamContextProvider>
          <HelmetProvider>
            <Helmet titleTemplate="%s | What's new?" />
            <Routes>
              <Route path="/auth/reader" element={<AuthReader />} />
              <Route path="/auth/creator" element={<AuthCreator />} />
              <Route path="/error" element={<Error />} />
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="article/:slug" element={<Article />} />
                <Route path="search" element={<Search />} />
              </Route>
              <Route path="/panel" element={<PanelLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="news" element={<News />} />
                <Route path="teams" element={<Teams />} />
                <Route path="support" element={<Support />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </HelmetProvider>
        </TeamContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};
