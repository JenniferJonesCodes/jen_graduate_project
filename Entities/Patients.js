import React from "react";
import restClient from "../rest_client";

const defaultValue = {
  patients: [],
  activePatient: null,
  search: () => null,
  get: () => null
};

export const PatientsContext = React.createContext(defaultValue);

export function PatientsProvider({ children }) {
  const [patients, setPatients] = React.useState([]);
  const [activePatient, setActivePatient] = React.useState(null);

  async function search(query) {
    // call restClient.patients.search with query as q
    const result = await restClient.patient.search(query);
    if (result) {
      setPatients(result);
    }
  }

  async function get(uuid) {
    // get patient
    const result = await restClient.patient.get(uuid);
    if (result) {
      setActivePatient(result);
    }
  }

  return (
    <PatientsContext.Provider value={{ patients, activePatient, search, get }}>
      {children}
    </PatientsContext.Provider>
  );
}

export const usePatients = () => React.useContext(PatientsContext);

// export default class Patients {
//   static async get(id) {
//     try {
//       const res = await Axios({
//         method: "get",
//         url: `localhost:3000/patients/${id}`
//       });
//       return res.data;
//     } catch (error) {
//       return null;
//     }
//   }

//   static async lookup({ first_name, last_name, dob }) {
//     try {
//       const res = await Axios({
//         method: "get",
//         url: `localhost:3000/patients/?first_name=${first_name}&last_name=${last_name}&dob=${dob}`
//       });

//       return res.data;
//     } catch (error) {
//       return null;
//     }
//   }

//   static async create(fields) {
//     try {
//       const res = await Axios({
//         method: "post",
//         url: `localhost:3000/patients/`,
//         body: fields
//       });

//       return res.data;
//     } catch (error) {
//       return null;
//     }
//   }

//   static async update(id, fields) {
//     try {
//       const res = await Axios({
//         method: "put",
//         url: `localhost:3000/patients/${id}`,
//         body: fields
//       });

//       return res.data;
//     } catch (error) {
//       return null;
//     }
//   }
// }

// Examples:
// const patientCreated = await Patients.create({
//     first_name: 'Jen',
//     last_name: 'Jones',
//     dob: '10/2/1990',
// })

// const patient = await Patients.lookup({
//     first_name: 'Eli',
//     last_name: 'Oshinsky',
//     dob: '07/18/1996',
// });

// const patientById = await Patients.get(patient.id);
// const pateintCreatedById = await Patients.get(patientCreated.id);
