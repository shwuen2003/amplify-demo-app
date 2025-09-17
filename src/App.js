import './App.css';
import { get } from 'aws-amplify/api';
import React, { useState } from 'react';
import DifyChatbot from './components/DifyChatbot'; // ✅ import chatbot

const myAPI = "apic6f3973d";
const path = '/customers'; 

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  async function getCustomer(e) {
    let customerId = e.input;
    try {
      const restOperation = get({
        apiName: myAPI,
        path: path + "/" + customerId
      });

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
        customers.map((thisCustomer) => (
          <div key={thisCustomer.customerId}>
            <span>
              <b>CustomerId:</b> {thisCustomer.customerId} - 
              <b>CustomerName:</b> {thisCustomer.customerName}
            </span>
          </div>
        ))
      }

      {/* ✅ Include the chatbot */}
      <DifyChatbot />
    </div>
  )
}

export default App;
