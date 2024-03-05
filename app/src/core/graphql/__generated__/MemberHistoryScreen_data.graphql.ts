/**
 * @generated SignedSource<<aaf5bdc0003de17e89d781e26ad62650>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MemberHistoryScreen_data$data = {
  readonly balance: number;
  readonly group: {
    readonly node: {
      readonly groupName: string;
    };
  };
  readonly id: string;
  readonly transactions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly itemName: string;
        readonly itemPrice: number | null;
        readonly order: {
          readonly node: {
            readonly createdAt: string;
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
          };
        };
        readonly recipient: {
          readonly node: {
            readonly id: string;
            readonly user: {
              readonly node: {
                readonly username: string;
              };
            };
          };
        };
      };
    }> | null;
  };
  readonly user: {
    readonly node: {
      readonly username: string;
    };
  };
  readonly " $fragmentType": "MemberHistoryScreen_data";
};
export type MemberHistoryScreen_data$key = {
  readonly " $data"?: MemberHistoryScreen_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"MemberHistoryScreen_data">;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MemberHistoryScreen_data",
  "selections": [
    (v0/*: any*/),
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
          "kind": "RequiredField",
          "field": (v1/*: any*/),
          "action": "THROW",
          "path": "user.node"
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "groupName",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "THROW",
          "path": "group.node"
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
                                  "path": "transactions.edges.node.recipient.node.user.node"
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        },
                        "action": "THROW",
                        "path": "transactions.edges.node.recipient.node"
                      }
                    ],
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
                        "kind": "RequiredField",
                        "field": {
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
                                            "field": (v1/*: any*/),
                                            "action": "THROW",
                                            "path": "transactions.edges.node.order.node.payer.node.user.node"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  "action": "THROW",
                                  "path": "transactions.edges.node.order.node.payer.node"
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        },
                        "action": "THROW",
                        "path": "transactions.edges.node.order.node"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              "action": "THROW",
              "path": "transactions.edges.node"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GroupMember",
  "abstractKey": null
};
})();

(node as any).hash = "c7ca57bc4d84a2085b19d4a91bdb6566";

export default node;
