/**
 * @generated SignedSource<<043a149d7667ab7c5693d5bb9f8bf416>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupScreenQuery$variables = {
  id: string;
};
export type GroupScreenQuery$data = {
  readonly node: {
    readonly groupName?: string;
    readonly members?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly balance: number;
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"GroupMember_data">;
        } | null;
      }>;
    };
    readonly orders?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly isActive: boolean;
          readonly " $fragmentSpreads": FragmentRefs<"HistoricalOrderCard_orderData">;
        } | null;
      }> | null;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data" | "GroupAvatar_data" | "GroupBalanceCard_data">;
  } | null;
};
export type GroupScreenQuery = {
  response: GroupScreenQuery$data;
  variables: GroupScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "groupName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "balance",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isActive",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarURL",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
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
        (v3/*: any*/),
        (v7/*: any*/),
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
        (v6/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
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
        (v3/*: any*/),
        {
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
                (v3/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "itemName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "itemPrice",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GroupScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupBalanceCard_data"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupAvatar_data"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ActiveOrderCard_data"
              },
              (v2/*: any*/),
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
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "GroupMember_data"
                          },
                          (v3/*: any*/),
                          (v4/*: any*/)
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
                "concreteType": "OrderConnection",
                "kind": "LinkedField",
                "name": "orders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "HistoricalOrderCard_orderData"
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
              }
            ],
            "type": "Group",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GroupScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
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
                          (v4/*: any*/),
                          (v8/*: any*/),
                          (v3/*: any*/)
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
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GroupMember",
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TransactionConnection",
                        "kind": "LinkedField",
                        "name": "transactions",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
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
                              (v3/*: any*/),
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
                                      (v7/*: any*/),
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
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderConnection",
                "kind": "LinkedField",
                "name": "orders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "OrderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
                          (v5/*: any*/),
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
                                          (v3/*: any*/),
                                          (v7/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
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
                                  (v2/*: any*/),
                                  (v3/*: any*/)
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
                              (v9/*: any*/)
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
            "type": "Group",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c59ae436dfa68ce8111ed12048baba41",
    "id": null,
    "metadata": {},
    "name": "GroupScreenQuery",
    "operationKind": "query",
    "text": "query GroupScreenQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Group {\n      ...GroupBalanceCard_data\n      ...GroupAvatar_data\n      ...ActiveOrderCard_data\n      groupName\n      members {\n        edges {\n          node {\n            ...GroupMember_data\n            id\n            balance\n          }\n        }\n      }\n      orders {\n        edges {\n          node {\n            id\n            ...HistoricalOrderCard_orderData\n            isActive\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n    }\n  }\n  activeOrder {\n    node {\n      id\n      transactions {\n        edges {\n          node {\n            ...Transaction_data\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n              }\n            }\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          user {\n            node {\n              username\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment GroupBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...GroupMember_data\n        id\n        balance\n      }\n    }\n  }\n}\n\nfragment GroupMember_data on GroupMember {\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      id\n    }\n  }\n}\n\nfragment HistoricalOrderCard_orderData on Order {\n  id\n  createdAt\n  isActive\n  payer {\n    node {\n      user {\n        node {\n          id\n          username\n        }\n      }\n      id\n    }\n  }\n  group {\n    node {\n      groupName\n      id\n    }\n  }\n  transactions {\n    edges {\n      node {\n        ...Transaction_data\n        id\n        itemPrice\n      }\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          id\n          username\n        }\n      }\n      id\n    }\n  }\n  itemName\n  itemPrice\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "8bdfc909b7e04258a22345b1c7d87147";

export default node;
