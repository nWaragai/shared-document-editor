

import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditorPage } from "../pages/EditorPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignInPage";
import { Page404 } from "../pages/Page404";


export const Router: FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor"  element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*"  element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}