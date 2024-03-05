/**
 * @generated SignedSource<<dba0e452b33b057b06952cd79e2bcea6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTransactionInput = {
  groupMemberID: string;
  itemName: string;
  itemPrice?: string | null;
  orderID: string;
};
export type CreateTransactionButtonMutation$variables = {
  input: CreateTransactionInput;
};
export type CreateTransactionButtonMutation$data = {
  readonly createTransaction: {
    readonly node: {
      readonly group: {
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data" | "MemberBalanceCard_data">;
        } | null;
      };
      readonly id: string;
    };
  };
};
export type CreateTransactionButtonMutation = {
  response: CreateTransactionButtonMutation$data;
  variables: CreateTransactionButtonMutation$variables;
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
    "name": "CreateTransactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createTransaction",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "concreteType": "Transaction",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v2/*: any*/),
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
            },
            "action": "THROW",
            "path": "createTransaction.node"
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
    "name": "CreateTransactionButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createTransaction",
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
              (v2/*: any*/),
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d955e83dc57fc6c5c205c8b2958df292",
    "id": null,
    "metadata": {},
    "name": "CreateTransactionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation CreateTransactionButtonMutation(\n  $input: CreateTransactionInput!\n) {\n  createTransaction(input: $input) {\n    node {\n      id\n      group {\n        node {\n          ...MemberBalanceCard_data\n          ...ActiveOrderCard_data\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n      user {\n        node {\n          ...Transaction_data\n          id\n        }\n      }\n    }\n  }\n  activeOrder {\n    node {\n      id\n      transactions {\n        edges {\n          node {\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n                user {\n                  node {\n                    ...Transaction_data\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          user {\n            node {\n              username\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment MemberBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...MemberBalanceRow_data\n        id\n        balance\n        user {\n          node {\n            username\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MemberBalanceRow_data on GroupMember {\n  ...MemberHistoryScreen_data\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      id\n    }\n  }\n}\n\nfragment MemberHistoryScreen_data on GroupMember {\n  id\n  balance\n  user {\n    node {\n      username\n      id\n    }\n  }\n  group {\n    node {\n      groupName\n      id\n    }\n  }\n  transactions {\n    edges {\n      node {\n        id\n        itemName\n        itemPrice\n        recipient {\n          node {\n            id\n            user {\n              node {\n                username\n                id\n              }\n            }\n          }\n        }\n        order {\n          node {\n            createdAt\n            payer {\n              node {\n                id\n                user {\n                  node {\n                    username\n                    id\n                  }\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment Transaction_data on User {\n  ...UserAvatar_data\n  username\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "1717dd7771c018b4b7ce2b124b847412";

export default node;
