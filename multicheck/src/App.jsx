import Multicheck from "./Multicheck";

function App() {
  const datos = [
    { name: "Check1", text: "Con más mozarella", value: "mozarella_plus" },
    { name: "Check2", text: "Con más tomate", value: "tomate_plus" },
    { name: "Check3", text: "Con más piña", value: "piña_plus" },
    { name: "Check4", text: "Con más york", value: "york_plus" },
    { name: "Check5", text: "Con más anchoas", value: "anchoas_plus" },
    { name: "Check6", text: "Con más bacon", value: "bacon_plus" },
  ];

  return (
    <>
      <h4>Multi Check</h4>
      <Multicheck maxcheck={3} datos={datos} />
      <Multicheck maxcheck={2} datos={datos} />
     </>
  );
}

export default App;
