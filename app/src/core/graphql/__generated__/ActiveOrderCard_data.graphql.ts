/**
 * @generated SignedSource<<1f935cd5928aead715014c813fd55c0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActiveOrderCard_data$data = {
  readonly activeOrder: {
    readonly node: {
      readonly id: string;
      readonly payer: {
        readonly node: {
          readonly id: string;
          readonly user: {
            readonly node: {
              readonly username: string;
            };
          };
        };
      };
      readonly transactions: {
        readonly __id: string;
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly itemName: string;
            readonly itemPrice: number | null;
            readonly recipient: {
              readonly node: {
                readonly id: string;
                readonly user: {
                  readonly node: {
                    readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
                  };
                };
              };
            };
          };
        }> | null;
      };
    };
  } | null;
  readonly avatarURL: string | null;
  readonly groupName: string;
  readonly id: string;
  readonly me: {
    readonly node: {
      readonly id: string;
      readonly user: {
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
        };
      };
    };
  };
  readonly " $fragmentType": "ActiveOrderCard_data";
};
export type ActiveOrderCard_data$key = {
  readonly " $data"?: ActiveOrderCard_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data">;
};

const node: ReaderFragment = (function(){
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
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Transaction_data"
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActiveOrderCard_data",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "groupName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarURL",
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
          "kind": "RequiredField",
          "field": {
            "alias": null,
            "args": null,
            "concreteType": "GroupMember",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "UserEdge",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  {
                    "kind": "RequiredField",
                    "field": (v1/*: any*/),
                    "action": "THROW",
                    "path": "me.node.user.node"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "THROW",
          "path": "me.node"
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
          "kind": "RequiredField",
          "field": {
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
                        "kind": "RequiredField",
                        "field": {
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
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "GroupMemberEdge",
                              "kind": "LinkedField",
                              "name": "recipient",
                              "plural": false,
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
                                      (v0/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "UserEdge",
                                        "kind": "LinkedField",
                                        "name": "user",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "RequiredField",
                                            "field": (v1/*: any*/),
                                            "action": "THROW",
                                            "path": "activeOrder.node.transactions.edges.node.recipient.node.user.node"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  "action": "THROW",
                                  "path": "activeOrder.node.transactions.edges.node.recipient.node"
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        },
                        "action": "THROW",
                        "path": "activeOrder.node.transactions.edges.node"
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
                    "kind": "RequiredField",
                    "field": {
                      "alias": null,
                      "args": null,
                      "concreteType": "GroupMember",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        (v0/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "UserEdge",
                          "kind": "LinkedField",
                          "name": "user",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "RequiredField",
                              "field": {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "username",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              "action": "THROW",
                              "path": "activeOrder.node.payer.node.user.node"
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "THROW",
                    "path": "activeOrder.node.payer.node"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "THROW",
          "path": "activeOrder.node"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};
})();

(node as any).hash = "f4b3b5a96d33c436f812a85da29ce57c";

export default node;
