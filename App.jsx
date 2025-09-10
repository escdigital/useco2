import { useState } from "react";
import fatores from "../data/fatores_emissao.json";

export default function App() {
  const [energy, setEnergy] = useState("");
  const [transport, setTransport] = useState({ car: "", bus: "", plane: "" });
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const energyEmissions = energy * fatores.energy.kWh;
    const carEmissions = transport.car * fatores.transport.car;
    const busEmissions = transport.bus * fatores.transport.bus;
    const planeEmissions = transport.plane * fatores.transport.plane;

    const total = energyEmissions + carEmissions + busEmissions + planeEmissions;
    const totalTons = total / 1000;
    const credits = totalTons.toFixed(2);
    const value = (credits * 50).toFixed(2);

    setResults({
      energyEmissions,
      carEmissions,
      busEmissions,
      planeEmissions,
      total,
      credits,
      value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌱 USECO₂ - Calculadora de Carbono
      </h1>

      <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md">
        <label className="block font-semibold mb-2">Consumo de energia (kWh/mês)</label>
        <input type="number" value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />

        <label className="block font-semibold mb-2">Km percorridos de carro (mês)</label>
        <input type="number" value={transport.car}
          onChange={(e) => setTransport({ ...transport, car: e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />

        <label className="block font-semibold mb-2">Km percorridos de ônibus (mês)</label>
        <input type="number" value={transport.bus}
          onChange={(e) => setTransport({ ...transport, bus: e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />

        <label className="block font-semibold mb-2">Km percorridos de avião (mês)</label>
        <input type="number" value={transport.plane}
          onChange={(e) => setTransport({ ...transport, plane: e.target.value })}
          className="p-2 border rounded w-full mb-4"
        />

        <button onClick={handleCalculate}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 w-full">
          Calcular
        </button>

        {results && (
          <div className="mt-6 bg-gray-50 border p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Resultados</h2>
            <p>Energia: {results.energyEmissions.toFixed(2)} kgCO₂e</p>
            <p>Carro: {results.carEmissions.toFixed(2)} kgCO₂e</p>
            <p>Ônibus: {results.busEmissions.toFixed(2)} kgCO₂e</p>
            <p>Avião: {results.planeEmissions.toFixed(2)} kgCO₂e</p>
            <hr className="my-2" />
            <p className="font-semibold">Total: {results.total.toFixed(2)} kgCO₂e</p>
            <p>Créditos (tCO₂e): {results.credits}</p>
            <p>Valor estimado: R$ {results.value}</p>
          </div>
        )}
      </div>
    </div>
  );
}