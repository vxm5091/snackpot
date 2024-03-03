/**
 * @generated SignedSource<<d6fbf960a588c9837b0ab1fb83384aac>>
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
  readonly user: {
    readonly node: {
      readonly username: string;
      readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
    } | null;
  };
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
      "storageKey": null
    }
  ],
  "type": "GroupMember",
  "abstractKey": null
};

(node as any).hash = "ff1b25555b72d910163e37da502df80d";

export default node;
