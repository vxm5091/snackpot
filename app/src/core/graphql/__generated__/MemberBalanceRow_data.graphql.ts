/**
 * @generated SignedSource<<adeee45668e6dba31ac1c33ce517a725>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MemberBalanceRow_data$data = {
  readonly balance: number;
  readonly user: {
    readonly node: {
      readonly username: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"MemberHistoryScreen_data">;
  readonly " $fragmentType": "MemberBalanceRow_data";
};
export type MemberBalanceRow_data$key = {
  readonly " $data"?: MemberBalanceRow_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"MemberBalanceRow_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MemberBalanceRow_data",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MemberHistoryScreen_data"
    },
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "UserAvatar_data"
              },
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
          "path": "user.node"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GroupMember",
  "abstractKey": null
};

(node as any).hash = "aaa6f823512b657e1981e4618c3cc43b";

export default node;
