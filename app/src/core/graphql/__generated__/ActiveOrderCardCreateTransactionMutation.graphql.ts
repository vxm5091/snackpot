/**
 * @generated SignedSource<<0ddc24255c963c3d62285037781ad700>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTransactionInput = {
  itemName: string;
  itemPrice?: number | null;
};
export type ActiveOrderCardCreateTransactionMutation$variables = {
  input: CreateTransactionInput;
};
export type ActiveOrderCardCreateTransactionMutation$data = {
  readonly createTransaction: {
    readonly node: {
      readonly group: {
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data">;
        } | null;
      };
    } | null;
  };
};
export type ActiveOrderCardCreateTransactionMutation = {
  response: ActiveOrderCardCreateTransactionMutation$data;
  variables: ActiveOrderCardCreateTransactionMutation$variables;
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
  "name": "globalID",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActiveOrderCardCreateTransactionMutation",
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
    "name": "ActiveOrderCardCreateTransactionMutation",
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
                                              (v2/*: any*/),
                                              (v5/*: any*/),
                                              (v6/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
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
                                      (v6/*: any*/)
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
                                                          (v2/*: any*/),
                                                          (v5/*: any*/),
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
                                                          (v4/*: any*/),
                                                          (v6/*: any*/)
                                                        ],
                                                        "storageKey": null
                                                      }
                                                    ],
                                                    "storageKey": null
                                                  },
                                                  (v6/*: any*/)
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
                                            "name": "itemPrice",
                                            "storageKey": null
                                          },
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "daa9f7c917a809f96d4acd75c549d157",
    "id": null,
    "metadata": {},
    "name": "ActiveOrderCardCreateTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation ActiveOrderCardCreateTransactionMutation(\n  $input: CreateTransactionInput!\n) {\n  createTransaction(input: $input) {\n    node {\n      group {\n        node {\n          ...ActiveOrderCard_data\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n}\n\nfragment ActiveOrderCard_data on Group {\n  id\n  groupName\n  avatarURL\n  activeOrder {\n    node {\n      ...Order_orderData\n      globalID\n    }\n  }\n}\n\nfragment Order_orderData on Order {\n  id\n  createdAt\n  isActive\n  payer {\n    node {\n      user {\n        node {\n          id\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  group {\n    node {\n      groupName\n      globalID\n    }\n  }\n  transactions {\n    edges {\n      node {\n        ...Transaction_data\n        itemPrice\n        globalID\n      }\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          id\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "a73801afcaf47664b55b48662a6fbc0f";

export default node;
