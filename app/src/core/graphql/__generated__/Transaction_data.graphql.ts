/**
 * @generated SignedSource<<bec8c01d5a032a1492331a6ce97558c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Transaction_data$data = {
  readonly id: string;
  readonly recipient: {
    readonly node: {
      readonly user: {
        readonly node: {
          readonly id: string;
          readonly username: string;
          readonly " $fragmentSpreads": FragmentRefs<"UserAvatar_data">;
        } | null;
      };
    } | null;
  };
  readonly " $fragmentType": "Transaction_data";
};
export type Transaction_data$key = {
  readonly " $data"?: Transaction_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"Transaction_data">;
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
  "name": "Transaction_data",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "GroupMemberEdge",
      "kind": "LinkedField",
      "name": "recipient",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GroupMember",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
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
                    (v0/*: any*/),
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};
})();

(node as any).hash = "0d0769e737d776bd2f2cc6fa460b5794";

export default node;
