export function toMessage(payload) {
  return {
    id: String(payload.id),
    text: String(payload.text),
  };
}
