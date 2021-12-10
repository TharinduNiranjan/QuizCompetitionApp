class Question {
  constructor(data, id) {
    if (id) {
      this.id = id;
    }
    if (data) {
      this.description = data.english.description;
      // this.choices = data.english.choices;
      this.image = data.image;
      this.correct = data.correct;
      this.sinhalaDescription = data.sinhala.description;
      // this.sinhalaChoices = data.sinhala.choices;
      this.tamilDescription = data.tamil.description;
      // this.tamilChoices = data.tamil.choices;
      this.hardness = data.hardness;
    } else {
      this.description = "";
      // this.choices = {
      //   A: "",
      //   B: "",
      //   C: "",
      //   D: "",
      //   E: "",
      // };
      this.image = "";
      this.correct = "A";
      this.hardness = "Easy";
      this.sinhalaDescription = "";
      // this.sinhalaChoices = {
      //   A: "",
      //   B: "",
      //   C: "",
      //   D: "",
      //   E: "",
      // };
      this.tamilDescription = "";
      // this.tamilChoices = {
      //   A: "",
      //   B: "",
      //   C: "",
      //   D: "",
      //   E: "",
      // };
    }
  }
}
function DBQuestion(state) {
  // return {
  //   english: { description: state.description, choices: state.choices },
  //   image: state.image,
  //   sinhala: { description: state.sinhalaDescription, choices: state.sinhalaChoices },
  //   tamil: { description: state.tamilDescription, choices: state.tamilChoices },
  //   correct: state.correct,
  //   hardness: state.hardness,
  // };
  return {
    english: { description: state.description },
    image: state.image,
    sinhala: { description: state.sinhalaDescription },
    tamil: { description: state.tamilDescription },
    // correct: state.correct,
    // hardness: state.hardness,
  };
}
export { Question, DBQuestion };
