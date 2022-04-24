import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

const InputField = (props: InputFieldProps) => {
    const [field, { error }] = useField(props);
    return (

        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
            <Input {...field} type={props.type} id={props.name} placeholder={props.placeholder} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}

export default InputField;