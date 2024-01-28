import ManufacturerCard from "./ManufacturerCard";

export default function manufacturerList({ dbmanuf }) {
  const manuf = dbmanuf;
  return (
    <div className=" flex flex-col px-60 my-32 justify-center align-middle text-center gap-10">
      {manuf.map((c) => (
        <ManufacturerCard
          name={c.manuf_name}
          country={c.country}
          key={c.id}
          id={c.id}
        />
      ))}
    </div>
  );
}
