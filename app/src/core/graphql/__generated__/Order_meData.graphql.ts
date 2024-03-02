/**
 * @generated SignedSource<<3d86f1ec25114e5325b69013cbbac778>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order_meData$data = {
  readonly id: string;
  readonly " $fragmentType": "Order_meData";
};
export type Order_meData$key = {
  readonly " $data"?: Order_meData$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order_meData">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order_meData",
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

(node as any).hash = "f72476d732fbf249904afa8d4c8fdc3f";

export default node;
