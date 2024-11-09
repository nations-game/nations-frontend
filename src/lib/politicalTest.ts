// types.ts
export interface Answer {
    text: string;
    authorityChange: number;
    economicChange: number;
}
  
export interface Question {
    questionText: string;
    answers: Answer[];
}
  
export interface CompassScore {
    authority: number;
    economic: number;
}


const questions: Question[] = [
    {
        questionText: "Government should control the economy to some extent.",
        answers: [
            { text: "Strongly agree", authorityChange: 2, economicChange: 2 },
            { text: "Agree", authorityChange: 1, economicChange: 1 },
            { text: "Disagree", authorityChange: -1, economicChange: -1 },
            { text: "Strongly disagree", authorityChange: -2, economicChange: -2 }
        ]
    },
    {
        questionText: "Personal freedoms are more important than state control.",
        answers: [
            { text: "Strongly agree", authorityChange: -2, economicChange: 0 },
            { text: "Agree", authorityChange: -1, economicChange: 0 },
            { text: "Disagree", authorityChange: 1, economicChange: 0 },
            { text: "Strongly disagree", authorityChange: 2, economicChange: 0 }
        ]
    },
    {
        questionText: "The government should provide free healthcare for all citizens.",
        answers: [
            { text: "Strongly agree", authorityChange: 2, economicChange: 2 },
            { text: "Agree", authorityChange: 1, economicChange: 1 },
            { text: "Disagree", authorityChange: -1, economicChange: -1 },
            { text: "Strongly disagree", authorityChange: -2, economicChange: -2 }
        ]
    },
    {
        questionText: "A free market is the best way to achieve economic prosperity.",
        answers: [
            { text: "Strongly agree", authorityChange: -1, economicChange: -2 },
            { text: "Agree", authorityChange: -1, economicChange: -1 },
            { text: "Disagree", authorityChange: 1, economicChange: 1 },
            { text: "Strongly disagree", authorityChange: 1, economicChange: 2 }
        ]
    },
    {
        questionText: "Immigration should be tightly controlled.",
        answers: [
            { text: "Strongly agree", authorityChange: 2, economicChange: 0 },
            { text: "Agree", authorityChange: 1, economicChange: 0 },
            { text: "Disagree", authorityChange: -1, economicChange: 0 },
            { text: "Strongly disagree", authorityChange: -2, economicChange: 0 }
        ]
    }
];


export class PoliticalCompassTest {
    private score: CompassScore = { authority: 0, economic: 0 };
    private currentQuestionIndex = 0;

    get currentQuestion() {
        return questions[this.currentQuestionIndex];
    }

    get hasNextQuestion() {
        return this.currentQuestionIndex < questions.length;
    }

    answerQuestion(answerIndex: number) {
        const answer = this.currentQuestion.answers[answerIndex];
        this.score.authority += answer.authorityChange;
        this.score.economic += answer.economicChange;
        this.currentQuestionIndex++;
    }

    getScore(): CompassScore {
        return this.score;
    }
}