/**
 * @generated SignedSource<<76296de89f0817260ae0530809c2862a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupMember_data$data = {
  readonly balance: number;
  readonly node: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
  } | null;
  readonly " $fragmentType": "GroupMember_data";
};
export type GroupMember_data$key = {
  readonly " $data"?: GroupMember_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupMember_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupMember_data",
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
    }
  ],
  "type": "UserBalanceEdge",
  "abstractKey": null
};

(node as any).hash = "3df31115ffe0bc5944f2827f28d24fce";

export default node;
