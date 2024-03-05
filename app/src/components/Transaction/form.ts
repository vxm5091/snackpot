import {
  UpdateTransactionInput, UpdateTransactionsManyInput,
} from 'core/graphql/__generated__/ActiveOrderCardCompleteOrderMutation.graphql';
import { CreateTransactionInput } from 'core/graphql/__generated__/ActiveOrderCardCreateTransactionMutation.graphql';
import { FieldValues } from 'react-hook-form';
import yup, { number, object, ObjectSchema, string } from 'yup';

export type TUserTransactionRole = 'payer' | 'recipient' | 'reader';

export type TCreateTransactionInput = DeepWriteable<
  Pick<CreateTransactionInput, 'itemName' | 'itemPrice'>
>; // only itemName and itemPrice need to be form fields. groupMemberID and orderID will be added as part of the mutation payload

// export type TUpdateTransactionInput = DeepWriteable<Pick<UpdateTransactionInput, 'itemName' | 'itemPrice'>>
// export type TUpdateTransactionInput = Pick<UpdateTransactionInput, 'itemName' | 'itemPrice'>

export type TUpdateOrderInput = FieldValues & UpdateTransactionsManyInput



export const createTxnSchema: ObjectSchema<TCreateTransactionInput> =
  object().shape({
    itemName: string().required('Item name required'),
    itemPrice: number().optional(),
  });

export const getTransactionSchema = (role: TUserTransactionRole) => {
  const baseSchema = yup.object().shape({
    itemName: string().required('Item name is required'),
  });

  const payerSchema = {
    ...baseSchema,
    itemPrice: yup.number().required('Item price is required'),
  };

  const recipientSchema = {
    ...baseSchema,
    itemPrice: yup.number().optional(),
  };
  
  return role === 'payer' ? payerSchema : recipientSchema
};
