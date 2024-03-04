/**
 * @generated SignedSource<<3862554e4f93c4343e2b90981845e420>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Transaction_data$data = {
  readonly globalID: string;
  readonly id: string;
  readonly itemName: string;
  readonly itemPrice: number | null;
  readonly recipient: {
    readonly node: {
      readonly user: {
        readonly node: {
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

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Transaction_data",
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
      "name": "globalID",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemPrice",
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};

(node as any).hash = "43e0ffa14884017b2b02384757dc9aec";

export default node;
