export function formatText(records) {
  return records.map((record) => `${record.id}: ${record.title}`).join("\n");
}

export function renderReport(_args, records) {
  return formatText(records);
}
