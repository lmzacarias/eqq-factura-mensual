import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  //console.log("LOG_1 ⚡", req.body);
  console.log("nuevo comment from github");
  console.log("Prueba desde github");
  const response = await axios({
    url: process.env.URL_DATA,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      cuentaContrato: process.env.CONTRATO,
    },
  });
  console.log("LOG_4 ⚡", response);

  if (!response.data) {
    console.log("❌ Error getColors");
    res.status(500).send({ message: "Error", status: 500 });
    return;
  }

  console.log("🔴🔴", response.data);
  const data = response.data;
  res.status(200).send({
    message: "OK",
    data: { ...data },
    status: 200,
  });
};
