import {
  NewTransactionOverlay_meData$key
} from 'core/graphql/__generated__/NewTransactionOverlay_meData.graphql';
import { graphql, useFragment } from 'react-relay';

interface IProps {
  _meData: NewTransactionOverlay_meData$key;
  _orderData: NewTransactionoverlay_orderData$key;
}

export const NewTransactionOverlay: React.FC<IProps> = ({_orderData, _meData}) => {
  const orderData = useFragment(graphql`
    fragment NewTransactionOverlay_orderData on Order {
      id
      group {
        node {
          id
				}
			}
    }
  `, _orderData)
  
  const meData = useFragment(graphql`
    fragment NewTransactionOverlay_meData on GroupMember {
      id
    }
  `, _meData)
}