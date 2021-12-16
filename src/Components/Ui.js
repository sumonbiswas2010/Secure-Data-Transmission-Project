// create a component named ui

import React, {useState, useEffect} from 'react'
import './Ui.css'
import Loading from './Loading'


const Ui = (props) => {

    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [msg, setMsg] = useState();
    const [msg2, setMsg2] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState();
    const [flag, setFlag] = useState();
    const [divisor, setDivisor] = useState();
    const [type, setType] = useState();

    const [crcData, setCrcData] = useState();
    const [parityData, setParityData] = useState();
    const [stuffData, setStuffData] = useState();
    
    const [change, setChange] = useState();

    const [deStuffData, setDeStuffData] = useState();
    const [checkedParityData, setCheckedParityData] = useState();
    const [deCrcData, setDeCrcData] = useState();


    const user = "Sumon Biswas"

    const signUpHandler = () => {
        if(username=="sumon" && password=="123"){
            setIsLoggedIn(true)
            setMsg("Welcome Sumon")
        }else{  setMsg("Invalid Username or Password")}
    }

    



    const passwordChange = e => {
        setPassword(e.target.value);
    }
    const usernameChange = e => {
        setUsername(e.target.value);
    }

    const dataSet = e => {
        setData(e.target.value);
    }
    const flagSet = e => {
        setFlag(e.target.value);
    }
    const divisorSet = e => {
        setDivisor(e.target.value);
    }
    const changeSet = e => {
        setChange(e.target.value);
    }

    const bitCheck = data =>{
        let count = 0;

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
        return dx;

    }

    const deCrc = (dx, dv) =>{

        const dv2 = new Array(dv.length+1).join( '0' );
        let newData = dx;

        let f;

        
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

            return true;
        }
        else {

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
            deCrc("1001110", "1011")
            bitStuff("011000110", "0110")
            bitDeStuff("01110001110", "0110");
            let x = parity("01110101", "odd")

            let y = parityCheck("0111101", "odd")

        }, []) 

    }
    MyComponent();

    

    const makeSecure = e => {
        e.preventDefault();
        if(data==null){
            setMsg("Please enter Data");
            return;
        }
        const count = bitCheck(data)
        if(count==0){
            setMsg("Flag is Secure")

            document.getElementById("datainput").style.display = "none"
            document.getElementById("datainputbtn").style.display = "none"
            document.getElementById("flaginput").style.display = "inline-block"
            document.getElementById("flaginputbtn").style.display = "inline-block"
        }
        else{
            setMsg("Invalid Data")
        }

        
    }
    const makeSecureFlag = e => {
        setType("odd")
        
        e.preventDefault();
        if(flag==null){
            setMsg("Please enter Flag");
            return;
        }
        const count = bitCheck(flag)
        if(count==0){
            setMsg("Flag is Valid")
            document.getElementById("flaginput").style.display = "none"
            document.getElementById("flaginputbtn").style.display = "none"
            document.getElementById("divisorinput").style.display = "inline-block"
            document.getElementById("divisorinputbtn").style.display = "inline-block"

        }
        else{
            setMsg("Invalid Flag")
        }

        
    }

    const makeSecureDivisor = e => {
        
        e.preventDefault();
        if(divisor==null){
            setMsg("Please enter Divisor");
            return;
        }
        const count = bitCheck(divisor)
        if(count==0){
            setMsg("Divisor is Valid")
            //setLoading(true)
            doEverything();
        }
        else{
            setMsg("Invalid Divisor")
        }

        
    }

    const doEverything = () => {
        let x = crc(data, divisor);
        setCrcData(x);
        let y = parity(x, type);
        setParityData(y)
        let z = bitStuff(y, flag);
        setStuffData(z);
        // setCrcData(crc(data, divisor));
        // //setTimeout(parity, 1000, crcData, "odd")
        // setParityData(setTimeout(parity, 1000, crcData, "odd"));
        // setStuffData(bitStuff(parityData, divisor));

        setChange(flag+z+flag)
    }

    const send = () => {
        receive (change, flag, type, divisor);

    }
    const changeit = () => {

        //document.getElementById("changebtn").style.display = "inline-blocks";
        document.getElementById("changeinput").style.display = "inline-block";

    }

    const receive =  (dx, f, t, dv) => {

        let data = dx.split(f);

        let x = bitDeStuff(data[1], f);

        setDeStuffData(x);
        let y = parityCheck(x, t);
        console.log(y +t + "iii")
        if(y==true){
            y=x.substring(0, x.length-1)
            setCheckedParityData(y);
        }
        else {
            console.log("geche re")
            setMsg2("Invalid")
        }

        let z = deCrc(y, dv);
        if(z==true){
            z = y.substring(0, y.length-dv.length+1)
            setDeCrcData(z);
        }
        else {
            console.log("geche re")
            setMsg2("Invalid")
        }

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
            
            {!loading && isLoggedIn && <div>
                <p>Please Enter the Informations</p>
                <form>
                <input id="datainput" type='text' onChange={dataSet} placeholder="Enter Data" /><br/><br/>
                <button id="datainputbtn"  type="submit" onClick={makeSecure}>Submit Data</button><br></br><br/>
                <input style={{display: "none"}} id="flaginput" type='text' onChange={flagSet} placeholder="Enter Flag" /><br/><br/>
                <button style={{display: "none"}}  id="flaginputbtn" onClick={makeSecureFlag}>Submit Flag</button><br></br><br/>
                <input style={{display: "none"}} id="divisorinput" type='text' onChange={divisorSet} placeholder="Enter Divisor for CRC" /><br/><br/>
                <button style={{display: "none"}}  id="divisorinputbtn" onClick={makeSecureDivisor}>Submit Divisor</button><br></br><br/>
                </form>
                <p className="red center">{msg}</p>

                
            </div>}

        </div> 

        <div className="auth">
            <p className="hello">Processed Data</p>
            <div>
                <p >Data: {data}</p>
                <p className="left">CRC: {crcData}</p>
                <p className="left">Parity: {parityData}</p>
                <p className="left">BitStuffing: {stuffData}</p>
                <p className="right">Divisor: {divisor}</p>
                <p className="right">Parity Type: {type}</p>
                <p className="right">Flag: {flag}</p>
                
                <p>Ready to Transmit: {flag+stuffData+flag}</p>
                <label>You want to send it or change it?</label><br></br>
                <button onClick={changeit}>Change It</button><br></br>
                <input id="changeinput" style={{display: "none"}} value={change} id="changeinput" type='text' onChange={changeSet} placeholder="Change Data" /><br></br>
                <button onClick={send}>Send It</button>
            </div>

        </div> 

        <div className="atm">
            <p className="hello">Received Logs</p>

            <div className="logs">
                <p className="left">CRC: {deCrcData}</p>
                <p className="left">Parity: {checkedParityData}</p>
                <p className="left">BitStuffing: {deStuffData}</p>
                {/* <p className="right">Divisor: {divisor}</p>
                <p className="right">Parity Type: {type}</p>
                <p className="right">Flag: {flag}</p> */}
                
            </div>
            <p>{msg2}</p>
                
        </div> 
        <p id="footer">Secure Data Transmission</p>
    </div>
    )
}

export default Ui