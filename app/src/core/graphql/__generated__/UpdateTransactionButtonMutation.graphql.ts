/**
 * @generated SignedSource<<57bee9ca7501dbd7849c07e0eeef36f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateTransactionInput = {
  id: string;
  itemName: string;
  itemPrice?: string | null;
};
export type UpdateTransactionButtonMutation$variables = {
  input: UpdateTransactionInput;
};
export type UpdateTransactionButtonMutation$data = {
  readonly updateTransaction: {
    readonly node: {
      readonly group: {
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data" | "MemberBalanceCard_data">;
        } | null;
      };
    } | null;
  };
};
export type UpdateTransactionButtonMutation = {
  response: UpdateTransactionButtonMutation$data;
  variables: UpdateTransactionButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarURL",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemPrice",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GroupMember",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserEdge",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "GroupMemberEdge",
  "kind": "LinkedField",
  "name": "payer",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GroupMember",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserEdge",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateTransactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "updateTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GroupEdge",
                "kind": "LinkedField",
                "name": "group",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Group",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "MemberBalanceCard_data"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ActiveOrderCard_data"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateTransactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "updateTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GroupEdge",
                "kind": "LinkedField",
                "name": "group",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Group",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GroupMemberConnection",
                        "kind": "LinkedField",
                        "name": "members",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "GroupMemberEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "GroupMember",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "balance",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "UserEdge",
                                    "kind": "LinkedField",
                                    "name": "user",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v5/*: any*/),
                                          (v2/*: any*/),
                                          (v6/*: any*/),
                                          (v7/*: any*/),
                                          (v4/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "GroupEdge",
                                    "kind": "LinkedField",
                                    "name": "group",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Group",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v3/*: any*/),
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "TransactionConnection",
                                    "kind": "LinkedField",
                                    "name": "transactions",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "TransactionEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Transaction",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              (v2/*: any*/),
                                              (v8/*: any*/),
                                              (v9/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "GroupMemberEdge",
                                                "kind": "LinkedField",
                                                "name": "recipient",
                                                "plural": false,
                                                "selections": (v10/*: any*/),
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "OrderEdge",
                                                "kind": "LinkedField",
                                                "name": "order",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Order",
                                                    "kind": "LinkedField",
                                                    "name": "node",
                                                    "plural": false,
                                                    "selections": [
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "createdAt",
                                                        "storageKey": null
                                                      },
                                                      (v11/*: any*/),
                                                      (v2/*: any*/)
                                                    ],
                                                    "storageKey": null
                                                  }
                                                ],
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GroupMemberEdge",
                        "kind": "LinkedField",
                        "name": "me",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "OrderEdge",
                        "kind": "LinkedField",
                        "name": "activeOrder",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Order",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "TransactionConnection",
                                "kind": "LinkedField",
                                "name": "transactions",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "TransactionEdge",
                                    "kind": "LinkedField",
                                    "name": "edges",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Transaction",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          (v8/*: any*/),
                                          (v9/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "GroupMemberEdge",
                                            "kind": "LinkedField",
                                            "name": "recipient",
                                            "plural": false,
                                            "selections": (v12/*: any*/),
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ClientExtension",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "__id",
                                        "storageKey": null
                                      }
                                    ]
                                  }
                                ],
                                "storageKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d55c80f8d5c30b78f2429a528b7d695a",
    "id": null,
    "metadata": {},
    "name": "UpdateTransactionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateTransactionButtonMutation(\n  $input: UpdateTransactionInput!\n) {\n  updateTransaction(input: $input) {\n    node {\n      group {\n        node {\n          ...MemberBalanceCard_data\n          ...ActiveOrderCard_data\n          id\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n      user {\n        node {\n          ...Transaction_data\n          id\n        }\n      }\n    }\n  }\n  activeOrder {\n    node {\n      id\n      transactions {\n        edges {\n          node {\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n                user {\n                  node {\n                    ...Transaction_data\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          user {\n            node {\n              username\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment MemberBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...MemberBalanceRow_data\n        id\n        balance\n        user {\n          node {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MemberBalanceRow_data on GroupMember {\n  ...MemberHistoryScreen_data\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      id\n    }\n  }\n}\n\nfragment MemberHistoryScreen_data on GroupMember {\n  id\n  balance\n  user {\n    node {\n      username\n      id\n    }\n  }\n  group {\n    node {\n      groupName\n      id\n    }\n  }\n  transactions {\n    edges {\n      node {\n        id\n        itemName\n        itemPrice\n        recipient {\n          node {\n            id\n            user {\n              node {\n                username\n                id\n              }\n            }\n          }\n        }\n        order {\n          node {\n            createdAt\n            payer {\n              node {\n                id\n                user {\n                  node {\n                    username\n                    id\n                  }\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment Transaction_data on User {\n  ...UserAvatar_data\n  username\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "4638707ae81878e1bfe7cf7c2c6f0704";

export default node;
