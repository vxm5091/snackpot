/**
 * @generated SignedSource<<76ac5e4f6cc2f43c7fe2291c3b2b1e7b>>
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
  readonly group: {
    readonly groupName: string;
    readonly members: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly balance: number;
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"GroupMember_data">;
        } | null;
      }>;
    };
    readonly orders: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"Order_orderData">;
        } | null;
      }> | null;
    };
    readonly " $fragmentSpreads": FragmentRefs<"GroupAvatar_data" | "GroupCard_data">;
  };
  readonly me: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"Order_meData">;
  };
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
  "name": "avatarURL",
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
  "name": "globalID",
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
        (v5/*: any*/),
        (v7/*: any*/)
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
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GroupCard_data"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GroupAvatar_data"
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
                        "name": "Order_orderData"
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
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Order_meData"
          },
          (v3/*: any*/)
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
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/),
          (v5/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isActive",
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
                                      (v6/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
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
                              (v2/*: any*/),
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
                                  (v3/*: any*/),
                                  (v7/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2722d56a32b8d005fb172460e7420c08",
    "id": null,
    "metadata": {},
    "name": "GroupScreenQuery",
    "operationKind": "query",
    "text": "query GroupScreenQuery(\n  $id: ID!\n) {\n  group(id: $id) {\n    ...GroupCard_data\n    ...GroupAvatar_data\n    groupName\n    members {\n      edges {\n        node {\n          ...GroupMember_data\n          id\n          balance\n          globalID\n        }\n      }\n    }\n    orders {\n      edges {\n        node {\n          id\n          ...Order_orderData\n          globalID\n        }\n      }\n    }\n    globalID\n  }\n  me {\n    ...Order_meData\n    id\n    globalID\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment GroupCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...GroupMember_data\n        globalID\n      }\n    }\n  }\n}\n\nfragment GroupMember_data on GroupMember {\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      globalID\n    }\n  }\n}\n\nfragment Order_meData on User {\n  id\n}\n\nfragment Order_orderData on Order {\n  id\n  createdAt\n  isActive\n  payer {\n    node {\n      user {\n        node {\n          id\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  group {\n    node {\n      groupName\n      globalID\n    }\n  }\n  transactions {\n    edges {\n      node {\n        ...Transaction_data\n        itemPrice\n        globalID\n      }\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  globalID\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  itemName\n  itemPrice\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "4e3796825423410df13f997061018429";

export default node;
