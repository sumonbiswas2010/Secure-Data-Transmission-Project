// create a component named ui

import React, {useState, useEffect} from 'react'
import './Ui.css'
import Loading from './Loading'


const Ui = (props) => {

    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [msg, setMsg] = useState();
    const [msg1, setMsg1] = useState();
    const [msg2, setMsg2] = useState();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

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
            setLoading2(true)
            setLoading3(true)
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
    const typeSet = e => {
        setType(e.target.value)
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

        
        for(let i=0; i<=(newData.length-dv.length); i++) {
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
        const flag = f;
        f= f.substring(0, f.length-2);

        for(let i=0; i<=(d.length-f.length-1); i++) {
            
            let y=d;
            let x = d.substring(i, (i+f.length))
            if(x==f){
                y = d.substring(0, i+f.length) + '0' + d.substring(i+f.length, d.length);
                i=i+f.length-1;
            }
            d=y;
            
        }

        return d;
    }


    

    const bitDeStuff = (d, f) => {

        const ff = f.substring(0, (f.length-2));
        let res=d;
        let c =0;

        for(let i=0; i<=(res.length-ff.length); i++) {
            
            let y=d;
            let x = d.substring(i, (i+f.length-2))
            

            if(x==ff){
                
                res = res.substring(0, i+f.length-2-c) + res.substring(i+f.length-1-c, d.length);

                c=c+1;
            }
            
           // res = res.substring(0, i) + d.substring(i, d.lenghth);
            //d=y;
            
        }
        return res;
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
            setMsg("Data is valid")

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
        
        e.preventDefault();
        if(flag==null){
            setMsg("Please enter Flag");
            return;
        }
        const count = bitCheck(flag)
        if(count==0){
            if(flag[0]=='0' && flag[flag.length-1]=='0')
            {
                setMsg("Flag is Valid")
                document.getElementById("flaginput").style.display = "none"
                document.getElementById("flaginputbtn").style.display = "none"
                document.getElementById("divisorinput").style.display = "inline-block"
                document.getElementById("divisorinputbtn").style.display = "inline-block"
            }
            else {
                setMsg("Invalid Flag")
            }
            
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
            document.getElementById("divisorinput").style.display = "none"
            document.getElementById("divisorinputbtn").style.display = "none"
            document.getElementById("radios").style.display = "inline-block"
        }
        else{
            setMsg("Invalid Divisor")
        }

        
    }

    const makeSecureParity = e => {
        
        e.preventDefault();
        setLoading2(true)
        if(type==null){
            setMsg("Please select Parity Type");
            return;
        }
        else{
            setMsg("Data is being processed...");
            setLoading2(false)
            doEverything();
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
        
        setLoading3(false)
        if(change==null){
            setMsg1("Transmission data cannot be null")
            return;
        }
        const count = bitCheck(change);
        if(count==0){
            setMsg1("Transmitting Data...")
            receive (change, flag, type, divisor);
        }
        else {
            setMsg1("Invalid Transmission data")
            return;
        }
        

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

        if(y==true){
            y=x.substring(0, x.length-1)
            setCheckedParityData(y);
            setMsg2("Valid on Parity Check")
        }
        else {
            setCheckedParityData("Invalid Data");
            setDeCrcData("Invalid Data")

            setMsg2("Invalid on Parity Check")
            return
        }

        let z = deCrc(y, dv);
        if(z==true){
            z = y.substring(0, y.length-dv.length+1)
            setDeCrcData(z);
            setMsg2("Valid Data Received")
            
        }
        else {
            setDeCrcData("Invalid Data")
            setMsg2("Invalid on CRC Check")

            
        }

    }

    const tryAgain = (e) => {
        e.preventDefault();
        setData(null);
        setType(null);
        setFlag(null);
        setDivisor(null);

        setParityData(null);
        setCrcData(null);
        setStuffData(null);

        setDeCrcData(null);
        setDeStuffData(null);
        setCheckedParityData(null);

        setLoading3(true);
        setLoading2(true);
        document.getElementById("datainput").style.display = "inline-block"
        document.getElementById("datainputbtn").style.display = "inline-block"
        document.getElementById("divisorinput").style.display = "inline-block"
        document.getElementById("divisorinputbtn").style.display = "inline-block"
        document.getElementById("flaginput").style.display = "inline-block"
        document.getElementById("flaginputbtn").style.display = "inline-block"
        document.getElementById("radios").style.display = "inline-block"
        document.getElementById("datainput").value = null;
        document.getElementById("divisorinput").value = null;
        document.getElementById("flaginput").value = null;
        
    }

    
    

    return(
    <div className="all">

        <div className="user">
            <p className="hello">Welcome to our Project</p>
            { loading1 && <Loading/>}
            
            {!isLoggedIn && <div>
            <p>Enter you credentials to Login</p>
                <label> Username: </label> <input type="text" onChange={usernameChange} placeholder="Enter Username" /><br/><br/>
                <label> Password: </label> <input type="password" onChange={passwordChange} placeholder="Enter Password" /><br/><br/>
                <button id="center"onClick={signUpHandler } type="submit">Submit</button>
                <p>{msg}</p>
            </div>}
            
            {isLoggedIn && <div>
                <p>Please Enter the Informations</p>
                <form>
                <input id="datainput" type='text' onChange={dataSet} placeholder="Enter Data" />
                <button id="datainputbtn"  type="submit" onClick={makeSecure}>Submit Data</button><br></br><br/>
                <input style={{display: "none"}} id="flaginput" type='text' onChange={flagSet} placeholder="Enter Flag" />
                <button style={{display: "none"}}  id="flaginputbtn" onClick={makeSecureFlag}>Submit Flag</button><br></br><br/>
                <input style={{display: "none"}} id="divisorinput" type='text' onChange={divisorSet} placeholder="Enter Divisor for CRC" />
                <button style={{display: "none"}}  id="divisorinputbtn" onClick={makeSecureDivisor}>Submit Divisor</button><br></br><br/>
                <div id = "radios" style={{display: "none"}}>
                    <form>
                        <label>Select Parity Type:  </label>
                        <label>Odd</label><input id="radio1" name="radios" type='radio' value="odd" onClick={typeSet}/>
                        <label>Even</label><input  id="radio2" name="radios" type='radio' value="even" onClick={typeSet}/><br></br><br></br>
                        <button onClick={makeSecureParity}>Submit Parity Type And Process Data</button><br></br><br/>
                    </form>
                </div>
                </form>
                <p className="red center">{msg}</p>

                <button id="try" onClick={tryAgain}>Try Again</button>

                
            </div>}

        </div> 

        <div className="auth">
        <p className="hello">Processed Data</p>
        { loading2 && <Loading/>}
        { !loading2 && isLoggedIn && <div>
            
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
                <p>{msg1}</p>
                </div>
            </div>}

        </div> 

        <div className="atm">
            <p className="hello">Received Logs</p>
            { loading3 && <Loading/>}

            {!loading3 && isLoggedIn && <div className="logs">
                <p className="left">Actual Data: {deCrcData}</p>
                <p className="left">Without Parity Bit: {checkedParityData}</p>
                <p className="left">DeStuffData: {deStuffData}</p>
                
                <p>{msg2}</p>
  
            </div>}
            
                
        </div> 
        <p id="footer">Secure Data Transmission</p>
    </div>
    )
}

export default Ui