/**
 * @generated SignedSource<<4ab5ea5e5362816a6ab644d3ddd3ee60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupCard_data$data = {
  readonly groupName: string;
  readonly members: {
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"GroupMember_data">;
    }> | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"GroupAvatar_data">;
  readonly " $fragmentType": "GroupCard_data";
};
export type GroupCard_data$key = {
  readonly " $data"?: GroupCard_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupCard_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupCard_data",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GroupAvatar_data"
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
      "concreteType": "UserBalanceConnection",
      "kind": "LinkedField",
      "name": "members",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserBalanceEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "GroupMember_data"
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

(node as any).hash = "4d5023b38d8e920f549fb59f055c554a";

export default node;
