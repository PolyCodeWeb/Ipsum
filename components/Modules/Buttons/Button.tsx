type Button = {
  Type: "button" | "submit" | "reset";
  Title: string;
  Id?: string;
  Classes?: string;
};

export default function Button({ button }: { button: Button }) {
  return (
    <button type={button.Type} className={`${button.Classes}`} id={button.Id}>
      {button.Title}
    </button>
  );
}
