"use strict";
var Q = require("q")

module.exports = function (opts) {
  opts = opts || {}
  return {
    extra: opts.extra || {},
    instanceId: opts.instanceId || "i-4db187c0",
    lastBuild: opts.lastBuild || {},
    name: opts.name || "foo",
    getInst: function () {
      return Q.resolve({
                         InstanceId: opts.instanceId || "i-4db187c0",
                         PublicIpAddress: opts.ip || "0.0.0.0",
                         State: {Name: "stopped"},
                         Tags: [
                           {
                             Key: "Name",
                             Value: "machine3"
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
