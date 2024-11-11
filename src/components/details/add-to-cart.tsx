import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { Button, Text, View } from '@/ui';

type DropdownItem = {
  label: string;
  value: number;
};

type AddToCartSectionProps = {
  stock: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  buy: () => void;
};

export const AddToCartSection = ({
  quantity,
  setQuantity,
  buy,
  stock,
}: AddToCartSectionProps) => {
  const numberItems: DropdownItem[] = Array.from(
    { length: stock ?? 0 },
    (_, index) => ({
      label: (index + 1).toString(),
      value: index + 1,
    })
  );
  const [selectedValue, setSelectedValue] = useState<string>('1');

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <View className="items-center">
        <Text className="mb-3 mr-2 font-bold">Quantity</Text>
        <Dropdown
          style={{
            width: 90,
            borderColor: 'black',
            borderWidth: 2,
            padding: 8,
            borderRadius: 8,
            height: 43,
            marginBottom: 8,
          }}
          data={numberItems}
          labelField="label"
          valueField="value"
          placeholder={quantity.toString()}
          value={selectedValue}
          onChange={(item: DropdownItem) => {
            setSelectedValue(item.value.toString());
            setQuantity(item.value);
          }}
        />
      </View>
      <View className="w-4/5 items-center">
        <Text className=" mr-2 font-bold">Avalability: {stock} items</Text>
        <Button
          className="mt-3 h-12 w-72"
          label="Add to cart"
          textClassName="font-bold text-base"
          onPress={buy}
        />
      </View>
    </View>
  );
};
