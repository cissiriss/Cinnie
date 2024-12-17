import MenuForm from "./MenuForm";

export default function NewMenu() {
  return (
    <div className="container mx-auto py-4">
      <div className="prose">
        <h1>Add new menu</h1>
        <MenuForm />
      </div>
    </div>
  );
}
