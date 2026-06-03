type PathDisclosureProps = {
  label: string;
  value: string;
};

export function PathDisclosure({ label, value }: PathDisclosureProps) {
  return (
    <details className="path-disclosure">
      <summary>{label}</summary>
      <code>{value}</code>
    </details>
  );
}
