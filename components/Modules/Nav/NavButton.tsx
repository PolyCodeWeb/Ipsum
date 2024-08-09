type Button = {
  Type: "button" | "submit" | "reset";
  Id?: string;
  Classes?: string;
};

export default function Button({
  children,
  button,
  ...props
}: {
  children: React.ReactNode;
  button: Button;
}) {
  return (
    <button type={button.Type} className={`${button.Classes}`} id={button.Id}>
      {children}
    </button>
  );
}
