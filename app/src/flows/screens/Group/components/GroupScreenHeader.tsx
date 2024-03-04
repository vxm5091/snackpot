// import { graphql, useFragment } from 'react-relay';
//
// interface IProps {
//   _transactionData: GroupScreenHeader_data$key;
// }
//
// export const GroupScreenHeader: React.FC<IProps> = ({ _transactionData }) => {
//   const data = useFragment(graphql`
//     fragment GroupScreenHeader_data on Group {
//       ...GroupAvatar_data
//       groupName
//       members {
//         edges {
//           node {
//             ...GroupMember_data
//             id
//           balance
//           }
//         }
//       }
//       orders {
//         edges {
//           node {
//             id
//             ...Order_orderData
//           }
//         }
//       }
//     }
//   `, _transactionData)
//
//
// }