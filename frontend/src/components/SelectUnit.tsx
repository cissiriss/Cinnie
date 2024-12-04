export default function SelectUnit() {
  return (
    <>
      <select className="select select-secondary w-full max-w-xs">
        <option disabled selected>
          Unit
        </option>
        <option>st</option>
        <option>gram</option>
        <option>ml</option>
        <option>cl</option>
        <option>dl</option>
      </select>
    </>
  );
}
