import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProgressBar from "./ProgressBar";

function App() {
  return (
    <>
      <div className="container">
        <div className="my-3">
          <ProgressBar porcentaje={25} color="bg-warning" striped={true} />
        </div>
        <div className="my-3">
          <ProgressBar porcentaje={50} color="bg-danger" striped={false} />
        </div>
        <div className="my-3">
          <ProgressBar porcentaje={75} color="bg-info" striped={true} />
        </div>
      </div>
    </>
  );
}

export default App;
