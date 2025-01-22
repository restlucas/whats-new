import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { PanelLayout } from "./components/panelLayout";
import { Dashboard } from "./pages/(panel)/dashboard";
import { Auth } from "./pages/auth";
import { UserContextProvider } from "./contexts/UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { News } from "./pages/(panel)/news";
import { Support } from "./pages/(panel)/support";
import { Profile } from "./pages/(panel)/profile";
import { Teams } from "./pages/(panel)/teams";
import { TeamContextProvider } from "./contexts/TeamContext";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <TeamContextProvider>
          <HelmetProvider>
            <Helmet titleTemplate="%s | What's new?" />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
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
