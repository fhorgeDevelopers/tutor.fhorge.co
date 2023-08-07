import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import PageNotFound from './notFound/PageNotFound';
import { Auth } from './contexts/Auth';
import { Basic } from './contexts/Basic';
import { Hook } from './contexts/Hook';
import { New } from './contexts/New';
import { Edit } from './contexts/Edit';
import { RequireAuth } from './contexts/RequireAuth';
import { useEffect } from 'react';
import { SubContent } from './contexts/SubContent';
import { EditCon } from './contexts/EditContent';
import { Detail } from './contexts/Detail';
import Forgot from './forgotPassword/Forgot';
import Home from './home/Home';
import Authoring from './creation/creation';
import BasicSection from './creation/sections/basic/BasicSection';
import Footer from './footer/Footer';
import GradingSection from './creation/sections/grading/GradingSection';
import TeamSection from './creation/sections/team/TeamSection';
import ResourcesSection from './creation/sections/resources/ResourcesSection';
import SubmitSection from './creation/sections/submit/SubmitSection';
import AllContents from './creation/sections/content/AllContents';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Hook>
        <Auth>
          <Detail>
            <Edit>
              <Basic>
                <SubContent>
                  <New>
                    <Routes>
                      <Route
                        exact
                        path="/"
                        element={
                          <New>
                            <Home />
                          </New>
                        }
                      />
                      <Route
                        exact
                        path="/creation"
                        element={
                          <RequireAuth>
                            <New>
                              <Authoring />
                            </New>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/basic/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <BasicSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/grading/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <GradingSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/courseTeam/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <TeamSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/resources/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <ResourcesSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/content/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <EditCon>
                                <AllContents />
                                <Footer />
                              </EditCon>
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/creation/edit/submit/:id"
                        element={
                          <RequireAuth>
                            <Edit>
                              <SubmitSection />
                              <Footer />
                            </Edit>
                          </RequireAuth>
                        }
                      />
                      <Route
                        exact
                        path="/login"
                        element={
                          <Login />
                        }
                      />
                      <Route
                        exact
                        path="/forgot-password"
                        element={
                          <Forgot />
                        }
                      />
                      <Route
                        exact
                        path="*"
                        element={<PageNotFound />}
                      />
                    </Routes>
                  </New>
                </SubContent>
              </Basic>
            </Edit>
          </Detail>
        </Auth>
      </Hook>
    </>
  );
}

export default App;
