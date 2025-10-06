import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import municipios from "../../data/municipios.json";

export const Clima = () => {
    const navigate = useNavigate();
    const [ciudad, setCiudad] = useState("");
    const [clima, setClima] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/");
        }
    }, [navigate]);

    const fetchClima = async () => {
        if (!ciudad) {
            alert("Selecciona una ciudad primero.");
            return;
        }

        setLoading(true);
        setClima(null);
        try {
            const API_KEY = import.meta.env.VITE_AEMET_API_KEY;

            // Buscar municipio en el JSON local
            const municipio = municipios.find((m) => m.nombre === ciudad);

            // 1ª petición: URL con datos
            const resp = await fetch(
                `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${municipio.id}?api_key=${API_KEY}`
            );
            const data = await resp.json();

            // 2ª petición: datos reales
            const respDatos = await fetch(data.datos);
            const buffer = await respDatos.arrayBuffer();
            const decoder = new TextDecoder("iso-8859-1");
            const text = decoder.decode(buffer);
            const climaData = JSON.parse(text);

            setClima(climaData[0]);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <PageHeader
                title="Información sobre el clima"
                lead="Consulta el tiempo que hará en tu ciudad antes de reservar pista y, ¡evita quedarte con las ganas de jugar!"
            />

            {/* Selector de ciudad */}
            <div className="mt-4 flex justify-center gap-2">
                <select
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-64 mb-2"
                >
                    <option value="">Selecciona una ciudad</option>
                    {municipios.map((m) => (
                        <option key={m.id} value={m.nombre}>
                            {m.nombre}
                        </option>
                    ))}
                </select>

                <button onClick={fetchClima} className="btn btn-outline-primary boton-padelplus ms-2 mb-1 px-4 py-2">
                    Buscar
                </button>
            </div>

            {/* Cargando */}
            {loading && <p className="mt-4">Cargando datos...</p>}

            {/* Tabla de resultados */}
            {clima && (
                <div className="mt-3 py-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">{clima.nombre} - Predicción 7 días</h2>

                    <div className="d-flex justify-content-center">
                        <div className="overflow-x-auto">
                            <table className="min-w-max w-full border border-gray-300 text-center mb-5">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-3 py-2">Concepto</th>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <th key={index} className="border border-gray-300 px-3 py-2">
                                                {new Date(dia.fecha).toLocaleDateString("es-ES", {
                                                    weekday: "short",
                                                    day: "numeric",
                                                    month: "numeric",
                                                })}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Estado del cielo */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">⛅ Estado del cielo</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.estadoCielo[0]?.descripcion || "No disponible"}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Temperatura */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">🌡️ Temperatura (ºC)</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.temperatura.minima ?? dia.temperatura.min} / {dia.temperatura.maxima ?? dia.temperatura.max}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Humedad relativa */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">💧 Humedad relativa (%)</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.humedadRelativa.minima ?? dia.humedadRelativa.min} / {dia.humedadRelativa.maxima ?? dia.humedadRelativa.max}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Probabilidad de precipitación */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">🌧️ Prob. precipitación (%)</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.probPrecipitacion[0]?.value ?? 0}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Velocidad del viento */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">🌬️ Vel. viento (km/h)</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.viento[0]?.velocidad || "0"}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Índice ultravioleta máximo */}
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-3 py-2 font-semibold">☀️ Ind. ultravioleta máx.</td>
                                        {clima.prediccion.dia.slice(0, 7).map((dia, index) => (
                                            <td key={index} className="border border-gray-300 px-3 py-2">
                                                {dia.uvMax || "No disponible"}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p>© Información provista por la Agencia Estatal de Meteorología - AEMET, Gobierno de España</p>
                </div>
            )}
        </div>
    );
};
