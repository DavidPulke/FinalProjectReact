import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { FormikValues, useFormik } from "formik";
import { EditUserType, User } from "../interfaces/User";
import { successMsg, errorMsg } from "../services/feedbackService";
import { editUser } from "../services/usersService";
import * as yup from 'yup'

interface EditUserProps {

}

const EditUser: FunctionComponent<EditUserProps> = () => {
    let { userId } = useParams()
    let [userEdit, setUserEdit] = useState<User>({
        name: { first: "", middle: "", last: "" },
        phone: "",
        email: "",
        password: "",
        address: { state: "", city: "", country: "", street: "", houseNumber: 0, zip: 0 },
        image: { url: "", alt: "" },
        isBusiness: false,
    })
    let { user, payload } = useUser()

    const navigate: NavigateFunction = useNavigate()
    useEffect(() => {
        if (user != undefined) {
            setUserEdit(user as User)
        }

    }, [user])


    const formik: FormikValues = useFormik<EditUserType>({
        initialValues: userEdit,
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.object({
                first: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
                middle: yup.string(),
                last: yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
            }),
            phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),

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
        }),

        onSubmit: (values) => {
            console.log(values);

            editUser(userId as string, {
                name: { first: values.name.first, middle: values.name.middle, last: values.name.last },
                phone: values.phone,
                address: {
                    state: values.address.state, city: values.address.city, country: values.address.country, street: values.address.street, houseNumber: values.address.houseNumber, zip: values.address.zip
                },
                image: { url: values.image.url, alt: values.image.alt },
            }).then(() => {
                successMsg("Welcome To BCard good to have you here");
                navigate(-1)
            }).catch((err) => errorMsg(`Error: ${err}`))
        }
    })


    useEffect(() => {

    }, [])
    return (<section className="register-box">
        <div className="userCard">
            <div className="card" key={userEdit._id}>

                <img src={userEdit.image.url} alt={userEdit.image.alt} title={`${userEdit.name.first} ${userEdit.name.last}`} onError={(e) => {
                    e.currentTarget.src = 'Images/DefaultUserImage.png'
                }} />


                <div className="card-data">
                    <h4><strong>name:</strong> {`${userEdit.name.first} ${userEdit.name.last}`}</h4>
                    <h5><strong>country:</strong> {userEdit.address.country}</h5>
                    <hr />
                    <p><strong>city:</strong> {userEdit.address.city}</p>
                    <p><strong>email:</strong> {userEdit.email}</p>
                    <p><strong>isBusiness:</strong> {userEdit.isBusiness ? <>Yes</> : <>No</>}</p>
                </div>
            </div>
        </div>
        <h1 title="Edit User" className="text-center logo">Edit <i className="fa-solid fa-pencil" style={{ cursor: "default" }}></i></h1>
        {user != undefined &&
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
                                value={formik.values.name.first}
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
                                value={formik.values.name.last}
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
                                value={formik.values.phone}
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


                        {/* Image Url */}
                        <div className="form-floating w-75 m-auto mb-3">
                            <input type="text" className="form-control" id="floatingurl" placeholder="url"
                                name="image.url"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.image.url}
                            />
                            <label className={formik.touched.image?.url && formik.errors.image?.url && "text-danger"} htmlFor="floatingurl">Image Url</label>
                            {formik.touched.image?.url && formik.errors.image?.url && <p className="text-danger">
                                {formik.errors.image?.url}
                            </p>}
                        </div>


                        {/* Image Alt */}
                        <div className="form-floating w-75 m-auto mb-3">
                            <input type="text" className="form-control" id="floatingalt" placeholder="alt"
                                name="image.alt"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.image.alt}
                            />
                            <label className={formik.touched.image?.alt && formik.errors.image?.alt && "text-danger"} htmlFor="floatingalt">Image Alt</label>
                            {formik.touched.image?.alt && formik.errors.image?.alt && <p className="text-danger">
                                {formik.errors.image?.alt}
                            </p>}
                        </div>

                    </div>

                    <div className="wraper">




                        {/* State */}
                        <div className="form-floating w-75 m-auto mb-3">
                            <input type="text" className="form-control" id="floatingstate" placeholder="state"
                                name="address.state"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.address.state}
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
                                value={formik.values.address.country}
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
                                value={formik.values.address.city}
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
                                value={formik.values.address.street}
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
                                value={formik.values.address.houseNumber}
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
                                value={formik.values.address.zip}
                            />
                            <label className={formik.touched.address?.zip && formik.errors.address?.zip && "text-danger"} htmlFor="floatingzip">Zip</label>
                            {formik.touched.address?.zip && formik.errors.address?.zip && <p className="text-danger">
                                {formik.errors.address?.zip}
                            </p>}
                        </div>
                    </div>
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

                    <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-warning">  Edit</button>
                </div>

            </form>
        }

    </section>);
}

export default EditUser;