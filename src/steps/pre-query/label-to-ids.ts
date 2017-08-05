import Q = require("q");

export default function(type, labelOrId, registry, frameworkReq) {
  return Q.Promise(function(resolve, reject) {
    const adapter      = registry.dbAdapter(type);
    const model        = adapter.getModel(adapter.constructor.getModelName(type));
    const labelMappers = registry.labelMappers(type);
    const labelMapper  = labelMappers && labelMappers[labelOrId];

    // reolve with the mapped label
    if(typeof labelMapper === "function") {
      Q(labelMapper(model, frameworkReq)).then(resolve, reject);
    }

    // or, if we couldn't find a label mapper, that means
    // we were given an id, so we just resolve with that id.
    else {
      resolve(labelOrId);
    }
  });
}



