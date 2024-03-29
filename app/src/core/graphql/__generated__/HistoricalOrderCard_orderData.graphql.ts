/**
 * @generated SignedSource<<2b31ceea3e72525f0d3087f72e603e73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HistoricalOrderCard_orderData$data = {
  readonly createdAt: string;
  readonly group: {
    readonly node: {
      readonly groupName: string;
    };
  };
  readonly id: string;
  readonly isActive: boolean;
  readonly payer: {
    readonly node: {
      readonly user: {
        readonly node: {
          readonly id: string;
          readonly username: string;
        };
      };
    };
  };
  readonly transactions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly itemName: string;
        readonly itemPrice: number | null;
        readonly recipient: {
          readonly node: {
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
  readonly " $fragmentType": "HistoricalOrderCard_orderData";
};
export type HistoricalOrderCard_orderData$key = {
  readonly " $data"?: HistoricalOrderCard_orderData$data;
  readonly " $fragmentSpreads": FragmentRefs<"HistoricalOrderCard_orderData">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HistoricalOrderCard_orderData",
  "selections": [
    (v0/*: any*/),
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
                        (v0/*: any*/),
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
                    "path": "payer.node.user.node"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "THROW",
          "path": "payer.node"
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
                    "name": "itemPrice",
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
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "Transaction_data"
                                      }
                                    ],
                                    "storageKey": null
                                  },
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
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "75a96211f207704875ac1809d498ad71";

export default node;
