import { spawn, spawnSync } from "node:child_process";

function invocation(args) {
  const cli = process.env.npm_execpath;
  if (!cli) {
    throw new Error(
      "pnpm executable is unavailable; run this tool through a pnpm script",
    );
  }
  return /\.[cm]?js$/i.test(cli)
    ? [process.execPath, [cli, ...args]]
    : [cli, args];
}

export function spawnPnpm(args, options) {
  const [command, commandArgs] = invocation(args);
  return spawn(command, commandArgs, options);
}

export function spawnPnpmSync(args, options) {
  const [command, commandArgs] = invocation(args);
  return spawnSync(command, commandArgs, options);
}
