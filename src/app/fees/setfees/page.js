import Fee from "@/models/Fee";

export default async function SetFeesPage() {

    const fees = await Fee.findAll();
    console.log(fees);
  return (
    <div>
      <h1>Set Fees</h1>
    </div>
  );
}
