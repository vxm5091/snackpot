import { number, object, ObjectSchema, string } from 'yup';

export interface IPayerInput {
  itemName?: string;
  itemPrice: number;
}

export const payerFormSchema: ObjectSchema<IPayerInput> = object().shape({
  itemName: string().optional(),
  itemPrice: number().required('Item price required')
})


export interface IMeInput {
  itemName: string;
  itemPrice?: number;
}

export const meFormSchema: ObjectSchema<IMeInput> = object().shape({
  itemName: string().required('Item name required'),
  itemPrice: number().optional()
})