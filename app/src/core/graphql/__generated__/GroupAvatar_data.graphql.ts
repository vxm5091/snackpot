/**
 * @generated SignedSource<<961ee03953790a6ebc7f31ed5c1cc5b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupAvatar_data$data = {
  readonly avatarURL: string | null;
  readonly groupName: string;
  readonly id: string;
  readonly " $fragmentType": "GroupAvatar_data";
};
export type GroupAvatar_data$key = {
  readonly " $data"?: GroupAvatar_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupAvatar_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupAvatar_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "2d22fe9b58f8ba2dfd9880b5eb73f96e";

export default node;
