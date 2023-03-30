import axios from "axios";
import { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./App.css";

function App() {
  const [branches, setBranches] = useState([]);
  const getAllBranch = async () => {
    try {
      const result = await axios.get("http://localhost:8010/restaurants/");
      console.log(result);
      setBranches(result.data.message);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  // const getNearBranch = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:8010/restaurants/", {
  //       lat: 1,
  //       lon: 1,
  //     });
  //     setBranches(result.data.branches);
  //   } catch (error) {
  //     console.log("ERROR", error);
  //   }
  // };
  return (
    <div className="App">
      <h1>Gazriin zurag</h1>
      <div>
        <button onClick={getAllBranch}>Buh salbar</button>
        <button>Ugugdsun zaid oirhon</button>
      </div>
      <div style={{ width: "100%", height: "100vh", backgroundColor: "green" }}>
        <MapContainer
          center={[47.923773, 106.93387]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.923773, 106.93387]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {branches.length > 0 &&
            branches.map((r, index) => (
              <Marker
                key={index}
                position={[
                  r.location.coordinates[1],
                  r.location.coordinates[0],
                ]}
              >
                <Popup>{r.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
