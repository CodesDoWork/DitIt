import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import "./LabelledText.scss";

type LabelledTextProps = {
    label: string;
    text: string;
};

export const LabelledText = ({ label, text }: LabelledTextProps) => (
    <InputGroup className={"labelled-text"}>
        <FloatingLabel label={label}>
            <Form.Control readOnly value={text} />
        </FloatingLabel>
    </InputGroup>
);
