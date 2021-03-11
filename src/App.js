import React, { Component } from "react";
import * as ReactDOM from 'react-dom';
import './App.css';
import { Chat } from '@progress/kendo-react-conversational-ui';
import { Input } from '@progress/kendo-react-inputs';


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
        // this.addUser1 = this.addUser1.bind(this);
        this.state = {
            userName1: "",
            userName2: "x",
            messages: [
              // {
              //       author: this.user2,
              //       timestamp: new Date(),
              //       text: "Hello, this is a demo bot. I don't do much, but I can count symbols!"
              //   }
              ],
              // user1: {
              //   id: 1,
              //   name: "A"
              // },
              // user2: {
              //   id: 0,
              //   name: "B"
              // }
        };
        this.user = {
          id: 1,
          name: "v",
          // avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
      };
      this.user2 = { 
        id: 0,
        name: "v",
       };
    }

    addNewMessage = event => {
        this.setState((prevState) => {
            return { messages: [...prevState.messages, event.message] };
        });
    };

    addUser1 = event => {
      // this.user.name="asd";
      this.setState({userName1: event.target.value});
      // this.setState({user1: {id: 1, name: event.target.value});
      console.log(event.target.value);
      // this.setState({user.name: event.target.value});
      // this.setState({this.user.name: "hello"});
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
                    <Input label="Enter first name" type="text" value={this.state.userName1} onChange={this.addUser1}/>
                    <Input readOnly value="English" />
                    <Chat user={this.user1}
                        messages={this.state.messages}
                        onMessageSend={this.addNewMessage}
                        width={400}
                        messageTemplate={MessageTemplate}>
                    </Chat>
                  </div>
                  <div>
                    <Input label="Enter first name" />
                    <Input  readOnly value="Spanish" />
                    <Chat user={this.user2}
                        messages={this.state.messages}
                        onMessageSend={this.addNewMessage}
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