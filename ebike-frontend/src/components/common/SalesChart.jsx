import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function SalesChart() {

  const data = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 9000],
        backgroundColor: "#1976d2"
      }
    ]
  };

  return <Bar data={data} />;
}

export default SalesChart;
