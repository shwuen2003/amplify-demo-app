import './App.css';
import { get } from 'aws-amplify/api';   // ✅ new import
import React, { useState } from 'react';

const myAPI = "apic6f3973d";
const path = '/customers'; 

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  async function getCustomer(e) {
    let customerId = e.input;
    try {
      // ✅ build REST operation
      const restOperation = get({
        apiName: myAPI,
        path: path + "/" + customerId
      });

      // ✅ wait for the response
      const response = await restOperation.response;
      const customer = await response.body.json();  // parse JSON body

      console.log("GET call succeeded: ", customer);

      setCustomers([...customers, customer]);
    } catch (error) {
      console.log("GET call failed: ", error);
    }
  }

  return (
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
        <input 
          placeholder="customer id" 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />      
      </div>
      <br/>
      <button onClick={() => getCustomer({input})}>
        Get Customer From Backend
      </button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>
        Response
      </h2>
      {
        customers.map((thisCustomer, index) => (
          <div key={thisCustomer.customerId}>
            <span>
              <b>CustomerId:</b> {thisCustomer.customerId} - 
              <b>CustomerName:</b> {thisCustomer.customerName}
            </span>
          </div>
        ))
      }
    </div>
  )
}

export default App;
