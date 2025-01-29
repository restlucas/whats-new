import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { PanelLayout } from "./components/panelLayout";
import { Dashboard } from "./pages/(panel)/dashboard";
import { AuthCreator } from "./pages/auth/creator";
import { News } from "./pages/(panel)/news";
import { Support } from "./pages/support";
import { Teams } from "./pages/(panel)/teams";
import { Error } from "./pages/error";
import { Article } from "./pages/article";
import { Search } from "./pages/search";
import { AuthReader } from "./pages/auth/reader";
import { MyProfile } from "./pages/my-profile";
import { ResetPassword } from "./pages/auth/reset-password";
import { AppProviders } from "./components/appProviders";
import { Edit } from "./pages/(panel)/news/edit";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="article/:slug" element={<Article />} />
            <Route path="search" element={<Search />} />
          </Route>

          <Route path="/panel" element={<PanelLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="news" element={<News />} />
            <Route path="news/edit" element={<Edit />} />
            <Route path="teams" element={<Teams />} />
          </Route>

          <Route path="/support" element={<Support />} />
          <Route path="/auth/reader" element={<AuthReader />} />
          <Route path="/auth/creator" element={<AuthCreator />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
};
