import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputFieldProps = {
  name: string;
  label?: string;
  control: Control<any>;
};

function FormInputField({ name, label, control }: FormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label || name}</FormLabel>
          <FormControl>
            <Input {...field} className="bg-background" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default FormInputField;
