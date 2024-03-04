/**
 * @generated SignedSource<<00851df884e452140cb28c03ae057576>>
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
              readonly " $fragmentSpreads": FragmentRefs<"GroupBalanceCard_data">;
            } | null;
          };
        } | null;
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
                              {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "GroupBalanceCard_data"
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
                                          (v0/*: any*/),
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
    "cacheID": "08eb2610d20a92f5723267154083650c",
    "id": null,
    "metadata": {},
    "name": "HomeScreenQuery",
    "operationKind": "query",
    "text": "query HomeScreenQuery {\n  me {\n    ...UserAvatar_data\n    groups {\n      edges {\n        node {\n          group {\n            node {\n              ...GroupBalanceCard_data\n              globalID\n            }\n          }\n          globalID\n        }\n      }\n    }\n    globalID\n  }\n}\n\nfragment GroupAvatar_data on Group {\n  id\n  groupName\n  avatarURL\n}\n\nfragment GroupBalanceCard_data on Group {\n  ...GroupAvatar_data\n  id\n  groupName\n  members {\n    edges {\n      node {\n        ...GroupMember_data\n        id\n        balance\n        globalID\n      }\n    }\n  }\n}\n\nfragment GroupMember_data on GroupMember {\n  balance\n  user {\n    node {\n      ...UserAvatar_data\n      username\n      globalID\n    }\n  }\n}\n\nfragment UserAvatar_data on User {\n  id\n  username\n  firstName\n  lastName\n  avatarURL\n}\n"
  }
};
})();

(node as any).hash = "56cf6afc0f15505feb77009e4a1aa7b7";

export default node;
