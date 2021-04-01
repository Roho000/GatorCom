import React, { Component } from "react";
import './App.css';
import { Chat } from '@progress/kendo-react-conversational-ui';
import { Input, Rating } from '@progress/kendo-react-inputs';
import { googleTranslate } from "./utils/googleTranslate";
import { Button } from '@progress/kendo-react-buttons';


function MessageTemplate(props) {
    return (
        <div className="k-bubble">
            <div>{props.item.text}</div>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          trans: "",  
          messages: [
              // {
              //       author: this.user2,
              //       timestamp: new Date(),
              //       text: "temp text"
              //   }
              ],
          messages2: [],
          user1: {
            id: 1,
            name: "",
          },
          user2: {
            id: 0,
            name: "",
          },
        };
    }

    addNewMessage = event => {
      let mess = event.message.text;
      let transMess = "";
      const translating = transMess => {
          this.setState({ trans: transMess });
          event.message.text = this.state.trans;
          this.setState((prevState) => ({
            messages2: [...prevState.messages2, event.message] 
          }));
      };
      googleTranslate.translate(mess, "es", function(err, translation) {
        transMess = translation.translatedText;
        translating(transMess);        
      });
      this.setState((prevState) => ({
        messages: [...prevState.messages, { author: event.message.author, text: mess, timestamp: event.message.timestamp }] 
      }));      
    };

    addNewMessage2 = event => {
      let mess = event.message.text;
      let transMess = "";
      const translating = transMess => {
          this.setState({ trans: transMess });
          event.message.text = this.state.trans;
          this.setState((prevState) => ({
            messages: [...prevState.messages, event.message] 
          }));
      };
      googleTranslate.translate(mess, "en", function(err, translation) {
        transMess = translation.translatedText;
        translating(transMess);        
      });
      this.setState((prevState) => ({
        messages2: [...prevState.messages2, { author: event.message.author, text: mess, timestamp: event.message.timestamp }] 
      }));           
  };

    addUser1 = event => {
      this.setState({user1: {
        id: 1,
        name: event.target.value,
      }});
    }

    addUser2 = event => {
      this.setState({user2: {
        id: 0,
        name: event.target.value,
      }});
    }

    render() {
      const header = {
        textAlign: "center",
      };  
      const end = {
        textAlign: "center",
      };  
      return (
            <div>
                <h1 style={header} className="header">GatorCom</h1>
                <div style={end}>
                  <Button look="outline"> <a href="https://ufl.qualtrics.com/jfe/form/SV_51oJINWTWlHX5Ii?">End Session</a></Button>
                </div>
                <div className='rowC'>
                  <div className='chat'>
                    <Input className='name' label="Enter first name" type="text" onChange={this.addUser1}/>
                    <Input className='lang' readOnly value="English" />
                    <Chat user={this.state.user1}
                        messages={this.state.messages}
                        onMessageSend={this.addNewMessage}
                        placeholder={"Type message here..."}
                        width={400}
                        messageTemplate={MessageTemplate}>
                    </Chat>
                  </div>
                  <div className='chat2'>
                    <div className='rating'>
                      <legend className={'k-form-legend'}>Please rate your experience:</legend>
                      <Rating/>
                    </div>
                    <Input className='name' label="Ingrese el nombre" type="text" onChange={this.addUser2}/>
                    <Input className='lang' readOnly value="Spanish"/>
                    <Chat user={this.state.user2}
                        messages={this.state.messages2}
                        onMessageSend={this.addNewMessage2}
                        placeholder={"Escriba el mensaje aquí..."}
                        width={400}
                        messageTemplate={MessageTemplate}>
                    </Chat>
                  </div>
                </div>
            </div>
        );
    }
}



export default App;