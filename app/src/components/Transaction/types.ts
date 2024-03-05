import { UpdateTransactionsManyInput } from 'core/graphql/__generated__/ActiveOrderCardCompleteOrderMutation.graphql';
import { FieldValues } from 'react-hook-form';

export type TUserTransactionRole = 'payer' | 'recipient' | 'reader';

export type TUpdateOrderInput = FieldValues & UpdateTransactionsManyInput;
