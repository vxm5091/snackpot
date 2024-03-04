/**
 * @generated SignedSource<<3935c455d9586eba2622b17839f4869b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Transaction_meData$data = {
  readonly id: string;
  readonly " $fragmentType": "Transaction_meData";
};
export type Transaction_meData$key = {
  readonly " $data"?: Transaction_meData$data;
  readonly " $fragmentSpreads": FragmentRefs<"Transaction_meData">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Transaction_meData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "3bb0a4c3d71d5a0773e4ac3c39d5d540";

export default node;
