import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import Card from "../interfaces/Card";

import * as yup from "yup"
import cardInitValues from "./tools/largeObj/formik";
import { createCard } from "../services/cardsService";
import { successMsg } from "../services/feedbackService";

interface AddCardProps {
    onHide: Function;
    refresh: Function;
}

const AddCard: FunctionComponent<AddCardProps> = ({ refresh, onHide }) => {



    const formik: FormikValues = useFormik({
        initialValues: cardInitValues,
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            subtitle: yup.string().required().min(2),
            description: yup.string().required().min(2),
            phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),
            email: yup
                .string()
                .required("Email is required")
                .email("Must be a valid email address").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
            web: yup.string().min(14),
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
        onSubmit: (values: Card) => {
            createCard(values).then((res) => {
                successMsg("Your business card as been added successfuly now everyone can see it");
                onHide()
            }
            ).catch((err) => console.log(err)
            )
        }

    })
    return (<section className="register-box">

        <form onSubmit={formik.handleSubmit} className="container text-dark mt-4">
            <div className="formWrap">


                <div className="wraper">
                    {/* title */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingtitle"
                            placeholder="title"
                            name="title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label className={formik.touched.title && formik.errors.title && "text-danger"} htmlFor="floatingfirst">
                            Title <span>*</span>
                        </label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>

                    {/* subtitle  */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="text" className="form-control" id="floatingsubtitle" placeholder="subtitle"
                            name="subtitle"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        <label
                            className={formik.touched.subtitle && formik.errors.subtitle && "text-danger"}
                            htmlFor="floatingsubtitle"
                        >
                            subtitle *
                        </label>
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-danger">{formik.errors.subtitle}</p>
                        )}
                    </div>

                    {/* description Name */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingdescription"
                            placeholder="description"
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description || ""}
                        />
                        <label
                            className={
                                formik.touched.description && formik.errors.description && "text-danger"
                            }
                            htmlFor="floatingdescription"
                        >
                            description *
                        </label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
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

                    {/* web */}
                    <div className="form-floating w-75 m-auto mb-3">
                        <input type="web" className="form-control" id="floatingweb" placeholder="web"
                            name="web"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />

                        <label className={formik.touched.web && formik.errors.web && "text-danger"} htmlFor="floatingweb">Web</label>
                        {formik.touched.web && formik.errors.web && <p className="text-danger">
                            {formik.errors.web}
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

            <div className="formControl">
                <div className="form-row">
                    <button type="reset" className="btn btn-outline-primary ">Reset</button>
                    <button type="button" className="btn btn-outline-danger"
                        onClick={() => {
                            onHide()
                        }}
                    >Cancel</button>
                </div>

                <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-success">Create</button>
            </div>

        </form>
    </section>);
}

export default AddCard;