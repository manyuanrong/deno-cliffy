import { assertEquals } from "../../../dev_deps.ts";
import { parseFlags } from "../../flags.ts";
import { OptionType } from "../../types.ts";

Deno.test("[flags] should stop on unknown option with stopOnUnknown enabled", () => {
  const { flags, unknown, literal } = parseFlags([
    "-f",
    "true",
    "--foo",
    "run",
    "script-name",
    "--script-arg1",
    "--script-arg2",
    "--script-arg3",
    "--",
    "--literal-arg1",
    "--literal-arg2",
  ], {
    stopOnUnknown: true,
    flags: [{
      name: "flag",
      aliases: ["f"],
      type: OptionType.BOOLEAN,
      optionalValue: true,
    }, {
      name: "script-arg1",
      aliases: ["s"],
      type: OptionType.BOOLEAN,
      optionalValue: true,
    }, {
      name: "script-arg2",
      aliases: ["S"],
      type: OptionType.BOOLEAN,
      optionalValue: true,
    }],
  });

  assertEquals(flags, { flag: true });
  assertEquals(
    unknown,
    [
      "--foo",
      "run",
      "script-name",
      "--script-arg1",
      "--script-arg2",
      "--script-arg3",
    ],
  );
  assertEquals(literal, ["--literal-arg1", "--literal-arg2"]);
});
