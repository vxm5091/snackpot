/**
 * @generated SignedSource<<52def4a73ef4b694c8ea289d543e2307>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteTransactionInput = {
  groupMemberID: string;
  orderID: string;
};
export type DeleteMyTransactionButtonMutation$variables = {
  connections: ReadonlyArray<string>;
  input: DeleteTransactionInput;
};
export type DeleteMyTransactionButtonMutation$data = {
  readonly deleteTransaction: string;
};
export type DeleteMyTransactionButtonMutation = {
  response: DeleteMyTransactionButtonMutation$data;
  variables: DeleteMyTransactionButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "deleteTransaction",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteMyTransactionButtonMutation",
    "selections": [
      (v3/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteMyTransactionButtonMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "deleteEdge",
        "key": "",
        "kind": "ScalarHandle",
        "name": "deleteTransaction",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "34aec691fbebfe10e1673ff6946dd324",
    "id": null,
    "metadata": {},
    "name": "DeleteMyTransactionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteMyTransactionButtonMutation(\n  $input: DeleteTransactionInput!\n) {\n  deleteTransaction(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "06af28d1ba4dc97d59915e0fe8086f8d";

export default node;
