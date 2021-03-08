import React, { Component } from "react";
import cookie from "react-cookies";
import './App.css';

import { googleTranslate } from "./utils/googleTranslate";

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  state = {
    textAreaValue: "",
    languageCodes: [],
    language: cookie.load("language") ? cookie.load("language") : "en",
    question: cookie.load("question")
      ? cookie.load("question")
      : "What language do you prefer to read with?"
  };

  componentDidMount() {
    // load all of the language options from Google Translate to your app state

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes); // use a callback function to setState
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
    console.log(event.target.value);
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    const { languageCodes, language, question } = this.state;
    const divStyle = {
      // display: "flex",
      alignItems: "center",
      textAlign: "center",
      // height: "100vh",
      // width: "100wh"
      // backgroundColor: 'yellow',
    };
    const header = {
      textAlign: "center",
    };
    return (
      <div style={divStyle}>
        <h1 style={header}>GatorCom</h1>
        <p>Enter text:</p>

        {/* <form onSubmit={this.handleSubmit}> */}
          <div>
            {/* <label>Enter value : </label> */}
            <textarea
              value={this.state.textAreaValue}
              onChange={this.handleChange}
              rows={15}
              cols={40}
            />
          </div>
          
          {/* <input type="submit" value="Submit" />
        </form> */}

        <p>{question}</p>

        {/* iterate through language options to create a select box */}
        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  changeHandler = language => {
    let { question } = this.state;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = transQuestion => {
      if (question !== transQuestion) {
        this.setState({ question: transQuestion });
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    // translate the question when selecting a different language
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };
  
  
}

export default App;