import { Schema } from "joi";

export default function ___runValidation({
  payload,
  schema,
}: {
  payload: Object;
  schema: Schema;
}) {
  return schema.validate(payload, {
    allowUnknown: false, // when true, allows object to contain unknown keys which are ignored.
    convert: false,
    errors: {
      escapeHtml: false,
      render: true,
    },
    noDefaults: true,
    presence: "optional", // default presence of data in payload
    skipFunctions: true, // no functions in data
    stripUnknown: {
      arrays: false, // set to true to remove unknown items from arrays
      objects: false, //  to true to remove unknown keys from objects
    },
  });
}
