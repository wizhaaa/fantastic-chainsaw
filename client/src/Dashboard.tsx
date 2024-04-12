import { MainPage } from "./components/main-page";

export const Dashboard = () => {

  //Kevin, make this function load in the correct data, this currently just loads in a 20 * 100 grid of blank cells
  const data = new Array(100)
  .fill(null)
  .map(() => new Array(20).fill({ value: "" }));

  return (
      <MainPage data={data}></MainPage>
  );
};
