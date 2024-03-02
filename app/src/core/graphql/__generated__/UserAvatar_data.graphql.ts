/**
 * @generated SignedSource<<97e53fd8f2117a2a05fa99635d306926>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserAvatar_data$data = {
  readonly avatarURL: string | null;
  readonly firstName: string;
  readonly id: string;
  readonly lastName: string;
  readonly username: string;
  readonly " $fragmentType": "UserAvatar_data";
};
export type UserAvatar_data$key = {
  readonly " $data"?: UserAvatar_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserAvatar_data",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarURL",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "cb6d7c086225fa023f37b572d3ed7b0f";

export default node;
