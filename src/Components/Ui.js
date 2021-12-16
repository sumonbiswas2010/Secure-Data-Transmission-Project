// create a component named ui

import React, {useState, useEffect} from 'react'
import './Ui.css'
import Loading from './Loading'


const Ui = (props) => {

    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [msg, setMsg] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [w, setW] = useState(false);
    const [type, setType] = useState("Savings");
    const [bal, setBal] = useState();
    const [balance, setBalance] = useState(50000);
    const [t, setT] = useState(false);
    const [au, setAu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [n, setN] = useState(1);
    

    //let token = localStorage.getItem("balance")
    const user = "Sumon Biswas"
    const atm = "ATM007"
    const signUpHandler = () => {
        if(username=="sumon" && password=="123"){
            setIsLoggedIn(true)
            setMsg("Welcome Sumon")
        }else{  setMsg("Invalid Username or Password")}
    }

    const auth = () => { 
        setT(true)
        setLoading(true)
        setMsg("")
    }

    const withdrawBalance1 = () => {
        if(bal<balance){      
            auth();       
        }
        else{
            setT(false)
            setMsg("Insufficient Balance")}
     }
    



    const passwordChange = e => {
        setPassword(e.target.value);
    }
    const usernameChange = e => {
        setUsername(e.target.value);
    }

    const checkBalance = () => { 
        setMsg("Your Balance is: "+balance)
    }
    const withdrawBalance = () => { setW(true) }

    const serviceSet = e => {
        setType(e.target.value);
    }

    const balChange = e => {
        setBal(e.target.value);
    }

    const approve = e => {
        setAu(true);
        
        setBalance(balance -bal)
        setMsg("Withdraw Successful")
        setN(n+1)
        setTransaction([...transaction, [n, ". Sumon Biswas - ATM007 - Type: ",type, ", Withdraw - ", bal, <br/>]])
        setLoading(false)
        setT(false)
    }
    console.log(transaction)

    const deny = e => {
        setAu(false);
        setMsg("Withdraw Denied")
        setLoading(false)
        setT(false)
    }

    
    
    console.log(username, password)

    return(
    <div className="all">

        <div className="user">
            <p className="hello">Welcome to our ATM</p>
            { loading && <Loading/>}
            
            {!loading && !isLoggedIn && <div>
            <p>Insert Your ATM Card or Login</p>
                <label> Username: </label> <input type="text" onChange={usernameChange} placeholder="Enter Username" /><br/><br/>
                <label> Password: </label> <input type="password" onChange={passwordChange} placeholder="Enter Password" /><br/><br/>
                <button id="center"onClick={signUpHandler } type="submit">Submit</button>
                <p>{msg}</p>
            </div>}
            
            {!au && !loading && isLoggedIn && <div>
                <p>Please Select From Below</p>
                <button onClick={checkBalance}>Check Balance</button><br></br><br/>
                <button onClick={withdrawBalance}>Withdraw</button><br></br><br/>
                <p className="red center">{msg}</p>
                
            </div>}

            {!au && !loading && isLoggedIn && w && 
                <div>
                    <label>Select Accout Type</label>
                    <select name="serviceType" value={type} onChange={serviceSet}>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Checking">Checking</option>
                        <option value="Others">Others</option>
                    </select><br/><br/>
                    <label>Enter Balance</label> <input onChange={balChange} type="number"></input><br/><br/>
                    <button onClick={withdrawBalance1}>Withdraw</button><br></br>
                    <p className="red center">{msg}</p>
                </div>
            }

            {au && 
                <div>
                    <p className="red center">{msg}</p>
                    <p>Approved</p>
                    <div id='receipt'>
                    <p className="hello">Receipt</p>
                        <p>Time: {Date().toLocaleString()}</p>
                        <p>ATM Code: 007</p>
                        <p>Customer Name: Sumon Biswas</p>
                        <p>Account Number: 01672836364</p>
                        <p>Withdraw Amount: {bal}, Available Balance: {balance} USD</p>
                        <p></p>
                        
                    </div>
                    <button onClick={() => {setAu(false)}}>New Transaction</button>
                </div>}
                
            

        </div> 

        <div className="auth">
            <p className="hello">Financial System Authority</p>
            {t && <div>
                <p>{user} wants to withdraw USD{bal} ({type}) from {atm}</p>
                <button onClick={approve}>Approve</button><br></br><br/>
                <button onClick={deny}>Deny</button><br></br><br/>
                </div>}

        </div> 

        <div className="atm">
            <p className="hello">ATM Logs</p>

            <div className="logs">
                <p>{transaction}</p>
                </div>
                
        </div> 
        <p id="footer">181002087, Baseline Project - ATM. CSE437</p>
    </div>
    )
}

export default Ui