import { JsonForms } from "@jsonforms/react";
import { JsonFormsCore, JsonSchema } from "@jsonforms/core";
import { renderers, cells } from "../renderers";

export type ConfigValue = Pick<JsonFormsCore, "data" | "errors"> & {
  defaults: boolean;
};

export function SectionConfigure(props: {
  config: JsonSchema | undefined;
  value: ConfigValue;
  onChange: (value: ConfigValue) => void;
}) {
  if (props.config == null || Object.keys(props.config).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 [&:has(.content>.vertical-layout:first-child:last-child:empty)]:hidden">
      <h2 className="text-xl font-semibold">Configure</h2>

      <div className="content flex flex-col gap-3">
        <JsonForms
          schema={props.config}
          data={props.value.data}
          renderers={renderers}
          cells={cells}
          onChange={({ data, errors }) => {
            if (data) {
              props.onChange({ data, errors, defaults: false });
            }
          }}
        />
      </div>
    </div>
  );
}
