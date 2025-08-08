import dynamic from "next/dynamic";
import "../App.css";

const App = dynamic(() => import("../App"), { ssr: false });

export default function MyApp() {
  return <App />;
}
