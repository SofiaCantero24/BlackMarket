import { ControlledInput, Text, View } from '@/ui';

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
};

type FromInputsProps = {
  title?: string;
  fields: FieldProps[];
  control: any;
  editable: boolean;
  inputClassname: string;
  textClassname: string;
  titleClassname?: string;
};

export const FormInputs = ({
  title,
  fields,
  control,
  editable,
  inputClassname,
  textClassname,
  titleClassname,
}: FromInputsProps) => {
  return (
    <View>
      {title && <Text className={titleClassname}>{title}</Text>}
      {fields.map(({ label, name, placeholder, required }) => (
        <View key={name} className="">
          <Text className={textClassname}>
            {label} {required ? '*' : ' '}
          </Text>
          <ControlledInput
            className={inputClassname}
            control={control}
            name={name}
            placeholder={placeholder}
            editable={editable}
          />
        </View>
      ))}
    </View>
  );
};
