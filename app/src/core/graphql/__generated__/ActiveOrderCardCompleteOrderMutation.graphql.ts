/**
 * @generated SignedSource<<599c70e8a83d54f1b397f640cdd79dc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateTransactionsManyInput = {
  transactions: ReadonlyArray<UpdateTransactionInput>;
};
export type UpdateTransactionInput = {
  id: string;
  itemName: string;
  itemPrice?: string | null;
};
export type UpdateOrderInput = {
  id: string;
  isActive: boolean;
};
export type ActiveOrderCardCompleteOrderMutation$variables = {
  orderInput: UpdateOrderInput;
  transactionInput: UpdateTransactionsManyInput;
};
export type ActiveOrderCardCompleteOrderMutation$data = {
  readonly updateOrder: {
    readonly group: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data" | "MemberBalanceCard_data">;
      } | null;
    };
  };
  readonly updateTransactionsMany: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly group: {
          readonly node: {
            readonly " $fragmentSpreads": FragmentRefs<"MemberBalanceCard_data">;
          } | null;
        };
      } | null;
    }> | null;
  };
};
export type ActiveOrderCardCompleteOrderMutation = {
  response: ActiveOrderCardCompleteOrderMutation$data;
  variables: ActiveOrderCardCompleteOrderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "transactionInput"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "transactionInput"
  }
],
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "MemberBalanceCard_data"
},
v4 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "orderInput"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarURL",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemPrice",
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GroupMember",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v5/*: any*/),
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
              (v8/*: any*/),
              (v5/*: any*/)
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
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "GroupMemberEdge",
  "kind": "LinkedField",
  "name": "payer",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
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
            (v5/*: any*/),
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
                    (v8/*: any*/),
                    (v5/*: any*/),
                    (v9/*: any*/),
                    (v10/*: any*/),
                    (v7/*: any*/)
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
                    (v6/*: any*/),
                    (v5/*: any*/)
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
                        (v5/*: any*/),
                        (v11/*: any*/),
                        (v12/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "GroupMemberEdge",
                          "kind": "LinkedField",
                          "name": "recipient",
                          "plural": false,
                          "selections": (v13/*: any*/),
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
                                (v14/*: any*/),
                                (v5/*: any*/)
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
v16 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GroupMember",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v5/*: any*/),
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
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v7/*: any*/)
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActiveOrderCardCompleteOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionConnection",
        "kind": "LinkedField",
        "name": "updateTransactionsMany",
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
                          (v3/*: any*/)
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
        "args": (v4/*: any*/),
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "updateOrder",
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
                  (v3/*: any*/),
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActiveOrderCardCompleteOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionConnection",
        "kind": "LinkedField",
        "name": "updateTransactionsMany",
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
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
        "args": (v4/*: any*/),
        "concreteType": "Order",
        "kind": "LinkedField",
        "name": "updateOrder",
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GroupMemberEdge",
                    "kind": "LinkedField",
                    "name": "me",
                    "plural": false,
                    "selections": (v16/*: any*/),
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
                          (v5/*: any*/),
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
                                      (v5/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "GroupMemberEdge",
                                        "kind": "LinkedField",
                                        "name": "recipient",
                                        "plural": false,
                                        "selections": (v16/*: any*/),
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
                          (v14/*: any*/)
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "782d2c51e0c390d4b269c80ddb1ab0a3",
    "id": null,
    "metadata": {},
    "name": "ActiveOrderCardCompleteOrderMutation",
    "operationKind": "mutation",
    "text": "mutation ActiveOrderCardCompleteOrderMutation(\n  $transactionInput: UpdateTransactionsManyInput!\n  $orderInput: UpdateOrderInput!\n) {\n  updateTransactionsMany(input: $transactionInput) {\n    edges {\n      node {\n        group {\n          node {\n            ...MemberBalanceCard_data\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  updateOrder(input: $orderInput) {\n    group {\n      node {\n        ...MemberBalanceCard_data\n        ...ActiveOrderCard_data\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n      user {\n        node {\n          ...Transaction_data\n          id\n        }\n      }\n    }\n  }\n  activeOrder {\n    node {\n      id\n      transactions {\n        edges {\n          node {\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n                user {\n                  node {\n                    ...Transaction_data\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          user {\n            node {\n              username\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment MemberBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...MemberBalanceRow_data\n        id\n        balance\n        user {\n          node {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MemberBalanceRow_data on GroupMember {\n  ...MemberHistoryScreen_data\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      id\n    }\n  }\n}\n\nfragment MemberHistoryScreen_data on GroupMember {\n  id\n  balance\n  user {\n    node {\n      username\n      id\n    }\n  }\n  group {\n    node {\n      groupName\n      id\n    }\n  }\n  transactions {\n    edges {\n      node {\n        id\n        itemName\n        itemPrice\n        recipient {\n          node {\n            id\n            user {\n              node {\n                username\n                id\n              }\n            }\n          }\n        }\n        order {\n          node {\n            createdAt\n            payer {\n              node {\n                id\n                user {\n                  node {\n                    username\n                    id\n                  }\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment Transaction_data on User {\n  ...UserAvatar_data\n  username\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "baf7efb68f75a40a0bb20fbb840b6b06";

export default node;
