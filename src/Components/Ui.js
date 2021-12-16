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

    const [data, setData] = useState([]);
    const [flag, setFlag] = useState([]);
    

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

    const serviceSet = e => {
        setType(e.target.value);
    }

    const balChange = e => {
        setBal(e.target.value);
    }

    const dataSet = e => {
        setData(e.target.value);
    }
    const flagSet = e => {
        setFlag(e.target.value);
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

    const deny = e => {
        setAu(false);
        setMsg("Withdraw Denied")
        setLoading(false)
        setT(false)
    }
    //document.getElementById("flaginput").style.display = "none"
    //document.getElementById("flaginputbtn").style.display = "none"

    const bitCheck = data =>{
        let count = 0;
        console.log(data);
        data.split("").forEach(c => {
            if(c!='0' && c!='1'){     
                count++;
            }
        });
        return count;
    }
    const crc = (dx, dv) =>{

        const extend = new Array(dv.length).join( '0' );
        let newData = dx + extend;
        const dv2 = extend + '0';
        let f;
        
        for(let i=0; i<(dx.length); i++) {
            let t;

            if(newData[i]=='1'){
                t=dv
            }
            else t = dv2;
            let c = 1;
            if(i==0) {
                f ='0' + newData.substring(i+1, newData.length);

            }
            else{
                f = newData.substring(0, i) + '0' + newData.substring(i+1, newData.length);
            }
            
            newData=f;
  
            for(let j = i+1; j<(i+dv.length); j++) {
                let tb;

                if(newData[j] == '1' && t[c]=='1'){
                    tb = '0';
                }
                else if(newData[j] == '1' && t[c]=='0'){
                    tb = '1';
                }
                else if(newData[j] == '0' && t[c]=='1'){
                    tb = '1';
                }
                else if(newData[j] == '0' && t[c]=='0'){
                    tb = '0';
                }
                f = newData.substring(0, j) + tb + newData.substring(j+1, newData.length);
                
                newData=f;
                
                c++;
            }
            


        }
        dx = dx + newData.substring(dx.length, newData.length);
        


    }

    const DeCrc = (dx, dv) =>{

        const dv2 = new Array(dv.length+1).join( '0' );
        let newData = dx;

        let f;
        console.log(dx, dv)
        
        for(let i=0; i<(newData.length-dv.length); i++) {
            let t;

            if(newData[i]=='1'){
                t=dv
            }
            else t = dv2;
            let c = 1;
            if(i==0) {
                f ='0' + newData.substring(i+1, newData.length);

            }
            else{
                f = newData.substring(0, i) + '0' + newData.substring(i+1, newData.length);
            }
            
            newData=f;

            for(let j = i+1; j<(i+dv.length); j++) {
                let tb;

                if(newData[j] == '1' && t[c]=='1'){
                    tb = '0';
                }
                else if(newData[j] == '1' && t[c]=='0'){
                    tb = '1';
                }
                else if(newData[j] == '0' && t[c]=='1'){
                    tb = '1';
                }
                else if(newData[j] == '0' && t[c]=='0'){
                    tb = '0';
                }
                f = newData.substring(0, j) + tb + newData.substring(j+1, newData.length);
                
                newData=f;
                
                c++;
            } 

        }
        let count=0;
        for(let i=0; i<newData.length; i++){
            if(newData[i]=='0'){
                count++;
            }
        }
        if(count==newData.length){
            console.log(count, true);
            return true;
        }
        else {
            console.log(count, false);
            return false;
        }
        

    }

    const bitStuff = (d, f) => {

        for(let i=0; i<=(d.length-f.length); i++) {
            let t;
            if(f[f.length-1]=='1'){
                t='0'
            }
            else t = '1'
            let y=d;
            let x = d.substring(i, (i+f.length))
            if(x==f){
                let j;
                y = d.substring(0, i+f.length-1) + t + d.substring(i+f.length-1, d.length);

            }
            d=y;
            
 
            if(d[i]==f){
                d[i]='0';
            }
        }

        return d;
    }
    

    const bitDeStuff = (d, f) => {

        const ff = f.substring(0, (f.length-1))

        let t;


        for(let i=0; i<=(d.length-ff.length); i++) {
            
            let y=d;
            let x = d.substring(i, (i+f.length-1))
            if(x==ff){

                y = d.substring(0, i+f.length-1) + d.substring(i+f.length, d.length);
    
            }
            d=y;
            

            if(d[i]==f){
                d[i]='0';
            }
        }
        return d;
    }

    const parity = (d, type) => {
        let count=0;
        for(let i=0; i<d.length; i++){
            if(d[i]=='1'){
                count++;
            }
        }
        if(type=='even'){
            if(count%2==0){
                return d+'0';
            }
            else return d+'1';
        }
        else if(type=='odd'){
            if(count%2==1){
                return d+'0';
            }
            else return d+'1';
        }

    }

    const parityCheck = (d, type) => {
        let count=0;
        for(let i=0; i<d.length; i++){
            if(d[i]=='1'){
                count++;
            }
        }
        if(type=='even'){
            if(count%2==0){
                return true
            }
            else return false
        }
        else if(type=='odd'){
            if(count%2==1){
                return true
            }
            else return false
        }

    }

    function MyComponent(){
        useEffect(()=>{
            crc("110011", "000") 
            DeCrc("1001110", "1011")
            bitStuff("011000110", "0110")
            bitDeStuff("01110001110", "0110");
            let x = parity("01110101", "odd")
            console.log(x)
            let y = parityCheck("0111101", "odd")
            console.log(y)
        }, []) 

    }
    MyComponent();

    

    const makeSecure = e => {
        e.preventDefault();
        const count = bitCheck(data)
        if(count==0){
            setMsg("Data is Secure")
            console.log(data.length + data[2])
            document.getElementById("datainput").style.display = "none"
            document.getElementById("datainputbtn").style.display = "none"
            document.getElementById("flaginput").style.display = "inline-block"
            document.getElementById("flaginputbtn").style.display = "inline-block"
        }
        else{
            setMsg("Invalid Data")
        }
        console.log(count)
        
    }
    const makeSecureFlag = e => {
        
        e.preventDefault();
        const count = bitCheck(data)
        if(count==0){
            setMsg("Data is Secure")

        }
        else{
            setMsg("Invalid Flag")
        }
        console.log(count)
        
    }

    
    

    return(
    <div className="all">

        <div className="user">
            <p className="hello">Welcome to our Project</p>
            { loading && <Loading/>}
            
            {!loading && !isLoggedIn && <div>
            <p>Enter you credentials to Login</p>
                <label> Username: </label> <input type="text" onChange={usernameChange} placeholder="Enter Username" /><br/><br/>
                <label> Password: </label> <input type="password" onChange={passwordChange} placeholder="Enter Password" /><br/><br/>
                <button id="center"onClick={signUpHandler } type="submit">Submit</button>
                <p>{msg}</p>
            </div>}
            
            {!au && !loading && isLoggedIn && <div>
                <p>Please Select From Below</p>
                <input id="datainput" type='text' onChange={dataSet} placeholder="Enter Data" /><br/><br/>
                <button id="datainputbtn" onClick={makeSecure}>Submit Data</button><br></br><br/>
                <input style={{display: "none"}} id="flaginput" type='text' onChange={flagSet} placeholder="Enter Flag" /><br/><br/>
                <button style={{display: "none"}} id="flaginputbtn" onClick={makeSecureFlag}>Submit Flag</button><br></br><br/>
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
        <p id="footer">Secure Data Transmission</p>
    </div>
    )
}

export default Ui