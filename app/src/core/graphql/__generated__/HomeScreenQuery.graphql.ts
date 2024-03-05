/**
 * @generated SignedSource<<d6dd7391c4bf1bffac9b527a1453f0f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeScreenQuery$variables = {};
export type HomeScreenQuery$data = {
  readonly me: {
    readonly groups: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly group: {
            readonly node: {
              readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data">;
            };
          };
        };
      }>;
    };
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
  };
};
export type HomeScreenQuery = {
  response: HomeScreenQuery$data;
  variables: HomeScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
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
  "name": "globalID",
  "storageKey": null
},
v6 = {
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
        (v0/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeScreenQuery",
    "selections": [
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
            "name": "UserAvatar_data"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GroupMemberConnection",
            "kind": "LinkedField",
            "name": "groups",
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
                    "kind": "RequiredField",
                    "field": {
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
                          "concreteType": "GroupEdge",
                          "kind": "LinkedField",
                          "name": "group",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "RequiredField",
                              "field": {
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
                                    "name": "ActiveOrderCard_data"
                                  }
                                ],
                                "storageKey": null
                              },
                              "action": "THROW",
                              "path": "me.groups.edges.node.group.node"
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "THROW",
                    "path": "me.groups.edges.node"
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GroupMemberConnection",
            "kind": "LinkedField",
            "name": "groups",
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
                              (v0/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "groupName",
                                "storageKey": null
                              },
                              (v4/*: any*/),
                              (v6/*: any*/),
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
                                      (v0/*: any*/),
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
                                              (v0/*: any*/),
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
                                                      (v1/*: any*/),
                                                      (v5/*: any*/)
                                                    ],
                                                    "storageKey": null
                                                  }
                                                ],
                                                "storageKey": null
                                              },
                                              (v5/*: any*/),
                                              (v0/*: any*/)
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
                                                  (v0/*: any*/),
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
                                                                  (v0/*: any*/),
                                                                  (v1/*: any*/),
                                                                  (v2/*: any*/),
                                                                  (v3/*: any*/),
                                                                  (v4/*: any*/),
                                                                  (v5/*: any*/)
                                                                ],
                                                                "storageKey": null
                                                              }
                                                            ],
                                                            "storageKey": null
                                                          },
                                                          (v5/*: any*/),
                                                          (v0/*: any*/)
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
                                      (v5/*: any*/)
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0c369e28c4a1b120988b6edf7f01ea17",
    "id": null,
    "metadata": {},
    "name": "HomeScreenQuery",
    "operationKind": "query",
    "text": "query HomeScreenQuery {\n  me {\n    ...UserAvatar_data\n    groups {\n      edges {\n        node {\n          group {\n            node {\n              ...ActiveOrderCard_data\n              globalID\n            }\n          }\n          globalID\n        }\n      }\n    }\n    globalID\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  me {\n    node {\n      id\n      globalID\n    }\n  }\n  activeOrder {\n    node {\n      ...NewTransactionOverlay_orderData\n      transactions {\n        edges {\n          node {\n            ...Transaction_data\n            id\n            itemName\n            itemPrice\n            recipient {\n              node {\n                id\n                globalID\n              }\n            }\n            globalID\n          }\n        }\n      }\n      payer {\n        node {\n          id\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n}\n\nfragment NewTransactionOverlay_orderData on Order {\n  id\n  group {\n    node {\n      id\n      me {\n        node {\n          id\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  payer {\n    node {\n      user {\n        node {\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          id\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  itemName\n  itemPrice\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "5c0b51e87e31fe80f0f7594259034385";

export default node;
