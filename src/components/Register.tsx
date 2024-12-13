
import { FunctionComponent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { usePassword } from "../hooks/usePassword";
import { handlePassword } from "./tools/handlers/handlePassword";
import { FormikValues, useFormik } from "formik";
import { User } from "../interfaces/User";
import { successMsg, errorMsg } from "../services/feedbackService";
import { register } from "../services/usersService";
import * as yup from "yup"
import { initialValues } from "./tools/largeObj/formik";




interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {

    let { passInput, show, setShow } = usePassword()
    const navigate: NavigateFunction = useNavigate()


    const formik: FormikValues = useFormik<User>({
        initialValues: initialValues,
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
                middle: yup.string(),
                last: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
            }),
            phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),
            email: yup
                .string()
                .required("Email is required")
                .email("Must be a valid email address").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
            password: yup
                .string()
                .required("Password is required")
                .min(9, "Password must be at least Nine characters")
                .max(20, "Password must be at most Twenty characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
                    "Password must include an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-"
                ),
            image: yup.object({
                url: yup.string().url("Must be a valid URL"),
                alt: yup.string(),
            }),
            address: yup.object({
                state: yup.string(),
                country: yup.string().required("Country is required"),
                city: yup.string().required("City is required"),
                street: yup.string().required("Street is required"),
                houseNumber: yup.number().required("House number is required").min(0, "House number must be positive"),
                zip: yup.number(),
            }),
            isBusiness: yup.boolean(),
        }),

        onSubmit: (values) => {
            register(values).then(() => {
                successMsg("Welcome To BCard good to have you here");
                navigate('/login')
            }).catch((err) => errorMsg(`Error: ${err}`))
            console.log(values);

        }
    })


    return (<section className="register-box">
        <h1 className="text-center">Create Your Own Account</h1>
        <form onSubmit={formik.handleSubmit} className="container text-dark mt-4">
            <div className="formWrap">


                <div className="wraper">
                    {/* First Name */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingfirst"
                            placeholder="first"
                            name="name.first"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.name?.first && formik.errors.name?.first && "text-danger"} htmlFor="floatingfirst">
                            First Name <span>*</span>
                        </label>
                        {formik.touched.name?.first && formik.errors.name?.first && (
                            <p className="text-danger">{formik.errors.name.first}</p>
                        )}
                    </div>

                    {/* Middle Name */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingmiddle" placeholder="middle"
                            name="middle"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label
                            className={formik.touched.name?.middle && formik.errors.name?.middle && "text-danger"}
                            htmlFor="floatingmiddle"
                        >
                            Middle Name
                        </label>
                        {formik.touched.name?.middle && formik.errors.name?.middle && (
                            <p className="text-danger">{formik.errors.name.middle}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatinglast"
                            placeholder="Last Name"
                            name="name.last"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name?.last || ""}
                        />
                        <label
                            className={
                                formik.touched.name?.last && formik.errors.name?.last && "text-danger"
                            }
                            htmlFor="floatinglast"
                        >
                            Last Name *
                        </label>
                        {formik.touched.name?.last && formik.errors.name?.last && (
                            <p className="text-danger">{formik.errors.name.last}</p>
                        )}

                    </div>

                    {/* Phone */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingphone"
                            placeholder="Phone"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone} // ערך
                        />
                        <label
                            className={formik.touched.phone && formik.errors.phone && "text-danger"}
                            htmlFor="floatingphone"
                        >
                            Phone *
                        </label>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-danger">{formik.errors.phone}</p>
                        )}
                    </div>


                    {/* Email */}
                    <div className="form-floating mb-3 w-75 m-auto">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.email && formik.errors.email && "text-danger"} htmlFor="floatingInput">Email address *</label>

                        {formik.touched.email && formik.errors.email && <p className="text-danger">
                            {formik.errors.email}
                        </p>}
                    </div>

                    {/* Password */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            ref={passInput}
                        />
                        <i onClick={() => {
                            passInput.current.type = handlePassword(passInput.current?.type);
                            setShow(!show)
                        }} className={`fa-${show ? "solid" : "regular"} fa-eye`} title="Show Password"></i>
                        <label className={formik.touched.password && formik.errors.password && "text-danger"} htmlFor="floatingPassword">Password *</label>
                        {formik.touched.password && formik.errors.password && <p className="text-danger">
                            {formik.errors.password}
                        </p>}
                    </div>

                    {/* Image Url */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingurl" placeholder="url"
                            name="image.url"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.image?.url && formik.errors.image?.url && "text-danger"} htmlFor="floatingurl">Image Url</label>
                        {formik.touched.image?.url && formik.errors.image?.url && <p className="text-danger">
                            {formik.errors.image?.url}
                        </p>}
                    </div>

                </div>

                <div className="wraper">



                    {/* Image Alt */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingalt" placeholder="alt"
                            name="image.alt"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.image?.alt && formik.errors.image?.alt && "text-danger"} htmlFor="floatingalt">Image Alt</label>
                        {formik.touched.image?.alt && formik.errors.image?.alt && <p className="text-danger">
                            {formik.errors.image?.alt}
                        </p>}
                    </div>

                    {/* State */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingstate" placeholder="state"
                            name="address.state"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.state && formik.errors.address?.state && "text-danger"} htmlFor="floatingstate">State</label>
                        {formik.touched.address?.state && formik.errors.address?.state && <p className="text-danger">
                            {formik.errors.address?.state}
                        </p>}
                    </div>

                    {/* country */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingcountry" placeholder="country"
                            name="address.country"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.country && formik.errors.address?.country && "text-danger"} htmlFor="floatingcountry">Country *</label>
                        {formik.touched.address?.country && formik.errors.address?.country && <p className="text-danger">
                            {formik.errors.address?.country}
                        </p>}
                    </div>

                    {/* city */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingcity" placeholder="city"
                            name="address.city"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.city && formik.errors.city && "text-danger"} htmlFor="floatingcity">City *</label>
                        {formik.touched.address?.city && formik.errors.address?.city && <p className="text-danger">
                            {formik.errors.address?.city}
                        </p>}
                    </div>

                    {/* street */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingstreet" placeholder="street"
                            name="address.street"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.street && formik.errors.address?.street && "text-danger"} htmlFor="floatingstreet">Street *</label>
                        {formik.touched.address?.street && formik.errors.address?.street && <p className="text-danger">
                            {formik.errors.address?.street}
                        </p>}
                    </div>

                    {/* houseNumber */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatinghouseNumber" placeholder="houseNumber"
                            name="address.houseNumber"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && "text-danger"} htmlFor="floatinghouseNumber">houseNumber *</label>
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && <p className="text-danger">
                            {formik.errors.address?.houseNumber}
                        </p>}
                    </div>

                    {/* zip */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingzip" placeholder="zip"
                            name="address.zip"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.address?.zip && formik.errors.address?.zip && "text-danger"} htmlFor="floatingzip">Zip</label>
                        {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger">
                            {formik.errors.address?.zip}
                        </p>}
                    </div>
                </div>
            </div>
            <div className="form-check w-75 m-auto mb-3 text-warning">
                <input className="form-check-input" type="checkbox" value={formik.values.isBusiness} onChange={formik.handleChange}
                    onBlur={formik.handleBlur} name="isBusiness" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault" >
                    Signup as business
                </label>
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

                <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-secondary">  Signup</button>
            </div>

        </form>

        <span className="qustion text-center">
            <p>Already as an Account? <Link className="link-offset-2 link-underline link-underline-opacity-50" to="/login">Login</Link>.</p>
        </span>
    </section>);
}

export default Register;