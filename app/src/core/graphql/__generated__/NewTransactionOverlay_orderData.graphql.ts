/**
 * @generated SignedSource<<22d415dbdca00c61fd74092684a1f7a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewTransactionOverlay_orderData$data = {
  readonly group: {
    readonly node: {
      readonly id: string;
    } | null;
  };
  readonly id: string;
  readonly " $fragmentType": "NewTransactionOverlay_orderData";
};
export type NewTransactionOverlay_orderData$key = {
  readonly " $data"?: NewTransactionOverlay_orderData$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewTransactionOverlay_orderData">;
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
  "name": "NewTransactionOverlay_orderData",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "GroupEdge",
      "kind": "LinkedField",
      "name": "group",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Group",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "995f5b3adefadfd3636a6a3d2937a1eb";

export default node;
