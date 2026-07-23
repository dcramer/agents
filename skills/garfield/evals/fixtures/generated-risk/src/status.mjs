import { statuses } from "../generated/statuses.mjs";

export function acceptsStatus(value) {
  return statuses.includes(value);
}
