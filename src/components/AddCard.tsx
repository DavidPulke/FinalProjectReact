import { FunctionComponent } from "react";

interface AddCardProps {
    onHide: Function
    refresh: Function
}

const AddCard: FunctionComponent<AddCardProps> = ({ onHide, refresh }) => {


    return (<aside>
        <h1>TODO:: Formik, yup, jsx form.</h1>
    </aside>);
}

export default AddCard;