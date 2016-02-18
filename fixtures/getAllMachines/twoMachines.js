"use strict";
var Q = require("q")

module.exports = function () {
  return [getMachine({name: "foo"}), getMachine({name: "bar"})]
}

var getMachine = function (opts) {
  return {
    aws: {instanceId: opts.instanceId || "i-4db187c0"},
    extra: opts.extra || {},
    name: opts.name || "foo",
    getInst: function () {
      return Q.resolve(
        {
          InstanceId: opts.instanceId || "i-4db187c0",
          PublicIpAddress: opts.ip || "0.0.0.0",
          State: {Name: "running"},
          Tags: [
            {
              Key: "Name",
              Value: "machine3"
            },
            {
              Key: "SpawnedBy",
              Value: "aws-machine-manager"
            }
          ]
        })
    },
    getState: function () {
      return this.getInst()
        .then(function (inst) {
          return Q.resolve(inst.State.Name)
        })
    }
  }
}
