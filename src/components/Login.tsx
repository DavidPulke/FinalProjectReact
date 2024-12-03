import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { login } from "../services/usersService";
import { errorMsg } from "../services/feedbackService";
import { jwtDecode } from "jwt-decode";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {

    const navigate: NavigateFunction = useNavigate()

    const formik: FormikValues = useFormik<any>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required().min(5).email().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
            password: yup.string().required().min(7, "Password required at least seven characters ").max(20, "Password required at most 20 characters").matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character'),
        }),
        onSubmit: (values) => {
            login(values).then((res) => {
                navigate("/");
                localStorage.token = res.data

            }).catch((err) => errorMsg(`Error: ${err}`))
            console.log(values);
        }
    })

    return (<section className="login-box">
        <h1 className="text-center">Login Into Your Account</h1>
        <form onSubmit={formik.handleSubmit} className="container text-dark mt-4">
            <div className="form-floating mb-3 w-75 m-auto">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <label htmlFor="floatingInput">Email address</label>
                {formik.touched.email && formik.errors.email && <p className="text-danger">
                    {formik.errors.email}
                </p>}
            </div>

            <div className="form-floating w-75 m-auto">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>
                {formik.touched.password && formik.errors.password && <p className="text-danger">
                    {formik.errors.password}
                </p>}
            </div>
            <div className="formControl">
                <div className="form-row">
                    <button type="button" className="btn btn-outline-danger"
                        onClick={() => {
                            navigate("/")
                        }}
                    >Cancel</button>

                    <button type="reset" className="btn btn-outline-primary ">Reset</button>
                </div>



                <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-secondary">Login</button>
            </div>
        </form>
        <span className="qustion text-center">
            <p>New Here? <Link className="link-offset-2 link-underline link-underline-opacity-50" to="/register">Signup Now</Link>, And get down to business.</p>
        </span>
    </section>);
}

export default Login;