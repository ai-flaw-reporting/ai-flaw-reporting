type Props = {
  label: string;
  children: React.ReactNode;
};

export default function SummaryField({ label, children }: Props) {
  return (
    <div className="space-y-2">
      <dt className="form-dt">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
