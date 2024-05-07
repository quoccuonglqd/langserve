import { useMemo } from "react";
import defaults from "../utils/defaults";
import { JsonForms } from "@jsonforms/react";
import { JsonFormsCore, JsonSchema } from "@jsonforms/core";
import { renderers, cells } from "../renderers";

export type InputValue = Pick<JsonFormsCore, "data" | "errors">;

export function SectionInputs(props: {
  input: JsonSchema | undefined;
  value: InputValue;
  onChange: (value: InputValue) => void;
}) {
  const isInputResetable = useMemo(() => {
    if (!props.input) return false;
    return (
      JSON.stringify(defaults(props.input)) !== JSON.stringify(props.value.data)
    );
  }, [props.input, props.value.data]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Try it</h2>

      <div className="p-4 border border-divider-700 flex flex-col gap-3 rounded-2xl bg-background">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Inputs</h3>
          {isInputResetable && (
            <button
              type="button"
              className="text-sm px-1 -mr-1 py-0.5 rounded-md hover:bg-divider-500/50 active:bg-divider-500 text-ls-gray-100"
              onClick={() =>
                props.onChange({
                  data: defaults(props.input),
                  errors: [],
                })
              }
            >
              Reset
            </button>
          )}
        </div>

        <JsonForms
          schema={props.input}
          data={props.value.data}
          renderers={renderers}
          cells={cells}
          onChange={({ data, errors }) => props.onChange({ data, errors })}
        />
      </div>
    </div>
  );
}
