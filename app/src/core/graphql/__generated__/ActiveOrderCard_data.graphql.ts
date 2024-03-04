/**
 * @generated SignedSource<<43718b00db04d7cac940b57f70c568eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActiveOrderCard_data$data = {
  readonly activeOrder: {
    readonly node: {
      readonly " $fragmentSpreads": FragmentRefs<"Order_orderData">;
    } | null;
  } | null;
  readonly avatarURL: string | null;
  readonly groupName: string;
  readonly id: string;
  readonly " $fragmentType": "ActiveOrderCard_data";
};
export type ActiveOrderCard_data$key = {
  readonly " $data"?: ActiveOrderCard_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActiveOrderCard_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActiveOrderCard_data",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "OrderEdge",
      "kind": "LinkedField",
      "name": "activeOrder",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Order",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order_orderData"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "fbabdf08ec856cfe883b0a26f2899e51";

export default node;
