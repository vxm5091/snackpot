/**
 * @generated SignedSource<<75ad899fe2fd22b0c111a3ecbb3f520a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MemberBalanceCard_data$data = {
  readonly groupName: string;
  readonly id: string;
  readonly members: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly balance: number;
        readonly id: string;
        readonly user: {
          readonly node: {
            readonly username: string;
          };
        };
        readonly " $fragmentSpreads": FragmentRefs<"MemberBalanceRow_data">;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"GroupAvatar_data">;
  readonly " $fragmentType": "MemberBalanceCard_data";
};
export type MemberBalanceCard_data$key = {
  readonly " $data"?: MemberBalanceCard_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"MemberBalanceCard_data">;
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
  "name": "MemberBalanceCard_data",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GroupAvatar_data"
    },
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "MemberBalanceRow_data"
                  },
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
                        "path": "members.edges.node.user.node"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              "action": "THROW",
              "path": "members.edges.node"
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
};
})();

(node as any).hash = "d03c4c6825c64457fabd9fb773076e78";

export default node;
