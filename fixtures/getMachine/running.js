"use strict";
var Q = require("q")

module.exports = function (opts) {
  opts = opts || {}
  return {
    extra: opts.extra || {},
    instanceId: opts.instanceId || "i-4db187c0",
    name: opts.name || "foo",
    _created: opts._created || new Date(),
    _updated: opts._updated || new Date(),
    getInst: function () {
      return Q.resolve(
        {
          InstanceId: opts.instanceId || "i-4db187c0",
          PublicIpAddress: opts.ip || "0.0.0.0",
          State: {Name: opts.state || "running"},
          Tags: [
            {
              Key: "Name",
              Value: opts.name || "machine3"
            },
            {
              Key: "SpawnedBy",
              Value: "aws-spawner0.4.0"
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
