import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import {Textarea} from "@chakra-ui/core/dist";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean
};

// '' => false
// 'error message stuff' => true

const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    textarea,
    ...props
  }) => {
  const [field, { error }] = useField(props);
  const InputOrTextArea = textarea ? Textarea : Input
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
