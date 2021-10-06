import React, { useState, useRef } from "react";

export const Dashboard = () => {

    const [showError, setShowError] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showWarningDate, setShowWarningDate] = useState(false);
    const [ShowWarningLength, setShowWarningLength] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const tecnico = useRef(null);
    const servicio = useRef(null);
    const fechaInicio = useRef(null);
    const fechaFin = useRef(null);

    const guardarReporte = () => {
        setShowWarning(false);
        setShowWarningDate(false);

        if (!tecnico.current.value || !servicio.current.value || !fechaInicio.current.value || !fechaFin.current.value) {
            setShowWarning(true);
            return;
        }

        if((Date.parse(fechaInicio.current.value) >= Date.parse(fechaFin.current.value)) || (Date.parse(fechaInicio.current.value) === Date.parse(fechaFin.current.value))){
            setShowWarningDate(true);
            return;
        }

        if(
            tecnico.current.value.length < 2 || servicio.current.value.length < 2){
            setShowWarningLength(true);
            return;
        }

        enviarInformacion();
    }

    const limpiarReporte = () => {
        tecnico.current.value = "";
        servicio.current.value = "";
        fechaInicio.current.value = "";
        fechaFin.current.value = "";
        setShowWarningDate(false);
        setShowWarning(false);
        setShowError(false);
    }

    const enviarInformacion = () => {

        let service = {
            idTecnico: tecnico.current.value, 
            idServicio: servicio.current.value,
            fechaInicio: fechaInicio.current.value,
            fechaFin: fechaFin.current.value
        }

        let url = "http://localhost:8080/servicio";

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(service)
        })
            .then(response => response.json())
            .catch((e) => {
                setShowError(true);
            })
            .then(data => {                                
                setShowSuccess(true);
                limpiarReporte();
            }).catch((e) => {
                setShowError(true);
            });
    }

    return (
    
    <>
        <section className="hero is-info">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title has-text-centered">Reporte de servicio</h1>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                {showWarning && (<div className="notification is-warning">Todos los campos son requeridos</div>)}
                {showWarningDate && (<div className="notification is-warning">La fecha final debe ser mayor que la fecha inicial</div>)}
                {ShowWarningLength && (<div className="notification is-warning">Las identificaciones del técnico y del servicio debe tener un tamaño mayor a dos</div>)}
                {showError && (<div className="notification is-error">Ocurrió un error inesperado</div>)}
                {showSuccess && (<div className="notification is-success">Registro creado exitosamente</div>)}
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Técnico</label>
                            <div className="control">
                                <input id="idTecnico" className="input" type="text" ref={tecnico}
                                    placeholder="Identificación del técnico" />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Servicio</label>
                            <div className="control">
                                <input id="idServicio" className="input" type="text" ref={servicio}
                                    placeholder="Identificación del servicio" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Fecha inicial</label>
                            <div className="control">
                                <input id="fechaInicio" className="input" type="datetime-local" ref={fechaInicio} />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Fecha final</label>
                            <div className="control">
                                <input id="fechaFin" className="input" type="datetime-local" ref={fechaFin} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button id="btnLimpiar" className="button is-secondary is-outlined"
                            onClick={limpiarReporte}>Limpiar</button>
                    </div>
                    <div className="control">
                        <button id="btnGuardarReporte" className="button is-primary"
                            onClick={guardarReporte}>Guardar</button>
                    </div>
                </div>

            </div>
        </section>
    </>
    );
}

