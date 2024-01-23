import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Protect/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { setLoading, setGeneratePage } from "../Reducer/UserReducer";
import axios from "axios";
import { config } from "../Config/Config";
import Loading from "../Loading/Loading";

function Dashboard() {
  const { loading, generatePage } = useSelector((state) => state.users);
  const [url , setUrl] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      originalUrl: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.originalUrl) {
        errors.originalUrl = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const request = await axios.post(`
        ${config.userApi}/short-url`, values);
        console.log(request.data);
        setUrl(request.data); 
        setUrl(request.data.url); 
        dispatch(setGeneratePage(true));
        formik.resetForm();
      } catch (error) {
        console.log(error);
        console.error('API Request Error:', error);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
  useEffect(() => {
    console.log('Updated URL State:', url);
  }, [url]);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBack = () => {
    dispatch(setGeneratePage(false));
  };

  console.log('Short URL:', url.shortUrl);
console.log('Original URL:', url.originalUrl);
  return (
    <article className="container">
      <hgroup className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <section className="card o-hidden border-0 shadow-lg my-5">
            <main className="card-body p-0">
              <section className="row justify-content-center">
                <section className="col-lg-12 p-5">
                  <hgroup className="d-flex justify-content-center user-heading"></hgroup>
                  <header className="text-center d-flex justify-content-evenly">
                    <h1 className="h4 text-gray-900 mb-4">
                      Welcome Back chief!
                    </h1>
                    <button
                      className="absolute btn btn-primary btn-user btn-block "
                      type="submit"
                      onClick={handleLogout}
                    >
                    Logout
                    </button>
                  </header>
                  <article className="container">
                    <hgroup className="row justify-content-center">
                      <div className="col-xl-10 col-lg-12 col-md-9">
                        <section className="card o-hidden border-0 shadow-lg my-5">
                          <main className="card-body p-0">
                            <section className="row justify-content-center">
                              <section className="col-lg-12 d-flex  p-5"></section>
                              {generatePage ? (
                                <div className="col-lg-7 pb-5 px-5">
                                  {url && (
                                    <div className="p-3">
                                      <span>Short Url</span> <br />
                                      <a
                                        rel="noreferrer"
                                        href={`${config.userApi}/${url.shortUrl}`}
                                        target="_blank"
                                      >
                                      {`${config.userApi}/${url?.shortUrl}`}
                                      </a>
                                    </div>
                                  )}
                                  {url && (
                                    <div className="p-3">
                                      <span>Original Url</span> <br />
                                      <a
                                        rel="noreferrer"
                                        href={`${url?.originalUrl}`}
                                        target="_blank"
                                      >
                                      {`${url.originalUrl}`}
                                      </a>
                                    </div>
                                  )}
                                  <div className="text-center">
                                    <button
                                      className="btn btn-primary"
                                      onClick={handleBack}
                                    >
                                      Back to generatePage
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <form
                                  onSubmit={formik.handleSubmit}
                                  className="col-lg-7  pb-5 px-5"
                                >
                                  <fieldset className="form-group">
                                    <label htmlFor="originalUrl" className="h5">
                                      Enter your long url :
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control form-control-user ${
                                        formik.touched.originalUrl &&
                                        formik.errors.originalUrl
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      value={formik.values.originalUrl}
                                      name="originalUrl"
                                      id="originalUrl"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.originalUrl &&
                                      formik.errors.originalUrl && (
                                        <span className="d-block ms-3 text-danger small invalid-feedback">
                                          {formik.errors.originalUrl}
                                        </span>
                                      )}
                                  </fieldset>
                                  <div className="form-group text-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary col-lg-5"
                                    >
                                      {loading ? <Loading /> : "Generate"}
                                    </button>
                                  </div>
                                </form>
                              )}
                            </section>
                          </main>
                        </section>
                      </div>
                    </hgroup>
                  </article>
                </section>
              </section>
            </main>
          </section>
        </div>
      </hgroup>
    </article>
  );
}

export default Dashboard;
