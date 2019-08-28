import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showForm: false,
            greeting: "",
            name: "",
            response:""
        }
    }

    handleChange(key, event) {
        let val = {};
        //Assing value to the provided key
        val[key] = event.target.value;

        this.setState(val);
    }

    async sendToBackend(e) {
        e.preventDefault();
        console.log("Submitting form: ",this.state.greeting,this.state.name);

        var formData  = new FormData();
        formData.append("name",this.state.name);
        formData.append("greeting",this.state.greeting);
        formData.append("timestamp",new Date().getTime());
         
        let response  = await fetch('http://localhost:5000/api/saveGreeting',{
            method:"POST",
            body:formData            
        });

        try{
            let json = await response.json();
            console.log("Response",json);

            if(json.status=="success"){
                this.setState({
                    response:json.data
                })
            }
            else if(json.status=="error"){
                alert(json.data)
            }
        }catch(e){
            console.error(e);

            //That's not how to show an error, but ok for now
            alert("Something went wrong");
        }

        
    }

    render() {

        return (
            <div>
            <div style={{padding:"10px 100px"}}>{this.state.response.length > 0 && <span style={{color:"red"}}>{this.state.response}</span>}</div>
            <form>
                

                <input
                    onChange={(event) => {  this.handleChange("greeting",event) }}
                    placeholder="Greeting"/><br/>

                <input
                    value={this.state.name}
                    onChange={(event) => {  this.handleChange("name",event) }}
                    placeholder="Name" /><br/>

                <button onClick={(e) => { this.sendToBackend(e) }} className="btn" type="submit">Send To Backend</button>
            </form>
            </div>
        );
    }
}

export default Form;
