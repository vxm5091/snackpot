/**
 * @generated SignedSource<<d331bd74630821b8a1b65cec50dccf51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Transaction_data$data = {
  readonly username: string;
  readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
  readonly " $fragmentType": "Transaction_data";
};
export type Transaction_data$key = {
  readonly " $data"?: Transaction_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Transaction_data",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "9a2716709923ab7239cf4a943f19d70d";

export default node;
