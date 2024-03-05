/**
 * @generated SignedSource<<d09434fb7ad234b471412796ad9543dd>>
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
  itemName?: string | null;
  itemPrice?: number | null;
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
        readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data" | "GroupBalanceCard_data">;
      } | null;
    };
  };
  readonly updateTransactionsMany: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly group: {
          readonly node: {
            readonly " $fragmentSpreads": FragmentRefs<"GroupBalanceCard_data">;
          } | null;
        };
        readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
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
  "name": "GroupBalanceCard_data"
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
  "name": "username",
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
        (v6/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        (v7/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "GroupMemberEdge",
  "kind": "LinkedField",
  "name": "recipient",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GroupMember",
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
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemPrice",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupName",
  "storageKey": null
},
v13 = {
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "balance",
              "storageKey": null
            },
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
};
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Transaction_data"
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
                  (v5/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
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
                          (v12/*: any*/),
                          (v7/*: any*/),
                          (v13/*: any*/)
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
                  (v5/*: any*/),
                  (v12/*: any*/),
                  (v7/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GroupMemberEdge",
                    "kind": "LinkedField",
                    "name": "me",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GroupMember",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
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
                                      (v9/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "GroupMemberEdge",
                            "kind": "LinkedField",
                            "name": "payer",
                            "plural": false,
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
                                          (v6/*: any*/),
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bc6352945522c7d358d7d7c0905143b8",
    "id": null,
    "metadata": {},
    "name": "ActiveOrderCardCompleteOrderMutation",
    "operationKind": "mutation",
    "text": "mutation ActiveOrderCardCompleteOrderMutation(\n  $transactionInput: UpdateTransactionsManyInput!\n  $orderInput: UpdateOrderInput!\n) {\n  updateTransactionsMany(input: $transactionInput) {\n    edges {\n      node {\n        ...Transaction_data\n        group {\n          node {\n            ...GroupBalanceCard_data\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  updateOrder(input: $orderInput) {\n    group {\n      node {\n        ...GroupBalanceCard_data\n        ...ActiveOrderCard_data\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n    }\n  }\n  activeOrder {\n    node {\n      id\n      transactions {\n        edges {\n          node {\n            ...Transaction_data\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          user {\n            node {\n              username\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment GroupBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...GroupMember_data\n        id\n        balance\n      }\n    }\n  }\n}\n\nfragment GroupMember_data on GroupMember {\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      id\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          id\n          username\n        }\n      }\n      id\n    }\n  }\n  itemName\n  itemPrice\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "c0497158e371d89ecb0bac2bece539ec";

export default node;
