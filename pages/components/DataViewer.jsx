import Loadig from "../components/Loadig";
import React, { useEffect, useState } from "react";
import { Badge, Divider } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import moment from "moment";

const DataViewer = () => {
  const [dataServer, setDataServer] = useState(null);
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const getData = async () => {
    try {
     
      const { data } = await fetch(process.env.NEXT_PUBLIC_DOMAIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (data) {
        const dateMonth = moment(data.FECVENCIULTIFACT, "DD/MM/YYYY").format(
          "MMMM"
        );
        const dataRefactor = { ...data, FECHA: dateMonth.toUpperCase() };
        setDataServer(dataRefactor);
      }
      console.log("RESPONSE", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {dataServer !== null ? (
        <div style={{ marginTop: 20 }}>
          <div className="component-flex">
            <div className="component-50">
              <strong>
                <p style={{ fontSize: 30 }}>EMPRESA ELÉCTRICA QUITO</p>
              </strong>
              <p style={{ color: "#BDC3C7", fontSize: 18 }}>
                CONSULTA DE FACTURA DEL MES DE {dataServer.FECHA}
              </p>
            </div>
            <div className="component-50-grey ">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Badge dot>
                  <NotificationOutlined />  
                </Badge>
                <p className="margin-botton-none">
                     Factura pendiente de pago
                </p>
              </div>
              <Divider style={{ marginBottom: 0 }} />
              <div className="dos-columnas">
                <div className="aling-rigth">
                  <div>
                    <strong>N° Contrato:  </strong>
                  </div>

                  <div>
                    <strong>Fecha de emisión:  </strong>
                  </div>
                  <div>
                    <strong>Fecha de pago:  </strong>
                  </div>
                  <div>
                    <strong> Dirección:  </strong>
                  </div>
                </div>
                <div className="aling-left">
                  <div>{dataServer.CUENTACONTRATO}</div>
                  <div>{dataServer.FECVENCIULTIFACT}</div>
                  <div>{dataServer.FECVENCIULTIFACT}</div>
                  <div style={{ textAlign: "left" }}>
                    {dataServer.DIRECCION}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 40 }}>
                <strong>$ {dataServer.DEUDA}</strong>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        <div>
          <Loadig visible />
        </div>
      )}
    </>
  );
};

export default DataViewer;
