/**
 * @generated SignedSource<<cf8ee0e89b5805f599244f6e1e9e6023>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewTransactionOverlay_meData$data = {
  readonly id: string;
  readonly " $fragmentType": "NewTransactionOverlay_meData";
};
export type NewTransactionOverlay_meData$key = {
  readonly " $data"?: NewTransactionOverlay_meData$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewTransactionOverlay_meData">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewTransactionOverlay_meData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GroupMember",
  "abstractKey": null
};

(node as any).hash = "e1b7d0b94fa697653a2481ae5d21f278";

export default node;
