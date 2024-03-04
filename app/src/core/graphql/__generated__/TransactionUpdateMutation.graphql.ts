/**
 * @generated SignedSource<<f01ff4b6e537946589cd82567995bf0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateTransactionInput = {
  id: string;
  itemName?: string | null;
  itemPrice?: number | null;
};
export type TransactionUpdateMutation$variables = {
  input: UpdateTransactionInput;
};
export type TransactionUpdateMutation$data = {
  readonly updateTransaction: {
    readonly node: {
      readonly group: {
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"GroupCard_data">;
        } | null;
      };
      readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
    } | null;
  };
};
export type TransactionUpdateMutation = {
  response: TransactionUpdateMutation$data;
  variables: TransactionUpdateMutation$variables;
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
  "name": "globalID",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
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
        (v3/*: any*/)
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
    "name": "TransactionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "updateTransaction",
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "GroupCard_data"
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
    "name": "TransactionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "updateTransaction",
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
                      (v5/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "groupName",
                        "storageKey": null
                      },
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "balance",
                                    "storageKey": null
                                  },
                                  (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "602660ccea0168373eb9d012814a39a2",
    "id": null,
    "metadata": {},
    "name": "TransactionUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionUpdateMutation(\n  $input: UpdateTransactionInput!\n) {\n  updateTransaction(input: $input) {\n    node {\n      ...Transaction_data\n      group {\n        node {\n          ...GroupCard_data\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment GroupCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...GroupMember_data\n        globalID\n      }\n    }\n  }\n}\n\nfragment GroupMember_data on GroupMember {\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      globalID\n    }\n  }\n}\n\nfragment Transaction_data on Transaction {\n  id\n  globalID\n  recipient {\n    node {\n      user {\n        node {\n          ...UserAvatar_data\n          username\n          globalID\n        }\n      }\n      globalID\n    }\n  }\n  itemName\n  itemPrice\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "98a3561ac0f69b2481dda84ef889133b";

export default node;
