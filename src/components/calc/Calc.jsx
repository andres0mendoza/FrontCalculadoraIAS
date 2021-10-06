import React, { useState, useRef } from "react";

export const Calc = () => {

    const [data, setData] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showError, setShowError] = useState(false);
    const [inputValue, setInputValue] = useState("Técnico")
    const [inpuSemana, setInputSemana] = useState("Semana");
    const tecnico = useRef(null);
    const yearWeek = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleInputSemanaChange = (e) => {
        setInputSemana(e.target.value);
    }

    const obtenerReporte = () => {
        setShowWarning(false);

        if (!tecnico.current.value || !yearWeek.current.value) {
            setShowWarning(true);
            return;
        }

        obtenerInformacion();
    }

    const limpiarReporte = () => {
        tecnico.current.value = "";
        yearWeek.current.value = "";
        setShowWarning(false);
        setShowError(false);
    }

    const limpiarTabla = () => {
        setData(false)
        setInputValue("Técnico")
        setInputSemana("Semana")
        limpiarReporte()
    }

    const obtenerInformacion = () => {

        let year = yearWeek.current.value.substring(0,4);
        let week = yearWeek.current.value.substring(6,8);
            
        let url = "http://localhost:8080/calculo?idTecnico=" + tecnico.current.value + "&week=" + week + "&year=" + year;
        
        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                setData(data);
                limpiarReporte();
            }).catch((e) => {
                setShowError(true);
            });
    }

    return (
    
    <>
        <section className="hero is-warning">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title has-text-centered">Cálculo de horas de trabajo</h1>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                {showWarning && (<div id="camposRequeridos" className="notification is-warning">Todos los campos son requeridos</div>)}
                {showError && (<div className="notification is-error">Ocurrió un error inesperado</div>)}
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Técnico</label>
                            <div className="control">
                                <input id="idTecnicoCalculo" className="input" type="text" ref={tecnico}
                                    placeholder="Identificación del técnico"
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="field">
                            <label className="label">Semana</label>
                            <div className="control">
                                <input id="yearWeek" className="input" type="week" name="week" min="20210-W1" ref={yearWeek} required 
                                    onChange={handleInputSemanaChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <h3 className="title has-text-centered">{ inputValue }</h3>
                        </div>
                        <div class="column">
                            <h3 className="title has-text-centered">{ inpuSemana }</h3>
                        </div>
                    </div>
                </div>
                

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button id="btnLimpiarCalculo" className="button is-secondary is-outlined"
                            onClick={limpiarTabla}>Limpiar</button>
                    </div>
                    <div className="control">
                        <button id="btnObtenerCalculo" className="button is-primary"
                            onClick={obtenerReporte}>Consultar</button>
                    </div>
                </div>
            </div>
            <br />
            <div className="container">
                <table className="table" id="table">
                    <thead>
                        <tr>
                            <th>Horas normales</th>
                            <th>Horas nocturnas</th>
                            <th>Horas dominicales</th>
                            <th>Horas normales extra</th>
                            <th>Horas nocturnas extra</th>
                            <th>Horas dominicales extra</th>
                            <th>Horas totales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            <tr>
                                <td>{data.horasNormales}</td>
                                <td>{data.horasNocturnas}</td>
                                <td>{data.horasDominicales}</td>
                                <td>{data.horasNormalesExtra}</td>
                                <td>{data.horasNocturnasExtra}</td>
                                <td>{data.horasDominicalesExtra}</td>
                                <td>{data.horasTotales}</td>
                            </tr>
                        ) : (
                            <tr><td colSpan="7">Sin registros</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    </>
    );
}