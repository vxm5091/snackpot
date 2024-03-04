/**
 * @generated SignedSource<<6eadf4fd4f92db32dac822bcb166b83a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupBalanceCard_data$data = {
  readonly groupName: string;
  readonly id: string;
  readonly members: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly balance: number;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"GroupMember_data">;
      } | null;
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"GroupAvatar_data">;
  readonly " $fragmentType": "GroupBalanceCard_data";
};
export type GroupBalanceCard_data$key = {
  readonly " $data"?: GroupBalanceCard_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupBalanceCard_data">;
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
  "name": "GroupBalanceCard_data",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GroupAvatar_data"
    },
    (v0/*: any*/),
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
      "concreteType": "GroupMemberConnection",
      "kind": "LinkedField",
      "name": "members",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GroupMemberEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GroupMember_data"
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "balance",
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
  "type": "Group",
  "abstractKey": null
};
})();

(node as any).hash = "a9bf5b33d16878198eb8a941f39e2672";

export default node;
