import { Trash2Icon } from "lucide-react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  placeholder,
  description,
  type,phone
}: {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  id?: string;
  type?: string;phone?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-1  flex-col items-start ">
          <FormLabel className=" ">{label}</FormLabel>
          <FormControl className="">
            <div className="flex items-center w-full">
              <Input type={type || "text"} className="" placeholder={placeholder} {...field} />
            </div>
          </FormControl>
          {description && <FormDescription>{description}.</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
