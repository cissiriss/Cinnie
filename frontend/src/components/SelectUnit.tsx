export default function SelectUnit() {
  return (
    <>
      <select className="select select-success m-4">
        <option disabled selected>
          Unit
        </option>
        <option>st</option>
        <option>gram</option>
        <option>ml</option>
        <option>cl</option>
        <option>dl</option>
        <option>tsp</option>
        <option>tbsp</option>
      </select>
    </>
  );
}
