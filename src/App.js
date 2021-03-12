import React, { Component } from "react";
import './App.css';
import { Chat } from '@progress/kendo-react-conversational-ui';
import { Input } from '@progress/kendo-react-inputs';
import { googleTranslate } from "./utils/googleTranslate";


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
      return (
            <div>
                <h1 style={header}>GatorCom</h1>
                <div className='rowC'>
                  <div>
                    <Input className='name' label="Enter first name" type="text" onChange={this.addUser1}/>
                    <Input className='lang' readOnly value="English" />
                    <Chat user={this.state.user1}
                        messages={this.state.messages}
                        onMessageSend={this.addNewMessage}
                        width={400}
                        messageTemplate={MessageTemplate}>
                    </Chat>
                  </div>
                  <div>
                    <Input className='name' label="Enter first name" type="text" onChange={this.addUser2}/>
                    <Input className='lang' readOnly value="Spanish"/>
                    <Chat user={this.state.user2}
                        messages={this.state.messages2}
                        onMessageSend={this.addNewMessage2}
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