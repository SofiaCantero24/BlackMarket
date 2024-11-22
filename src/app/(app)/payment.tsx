import { BuyForm } from '@/components/payment/buy-form';
import { SafeAreaView } from '@/ui';

export default function Payment() {
  // const formMethods = useForm();
  return (
    <SafeAreaView className="flex-1">
      <BuyForm onSubmitHandler={() => {}} />
    </SafeAreaView>
  );
}
