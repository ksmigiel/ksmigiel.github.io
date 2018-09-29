const { h, app } = window.hyperapp

const answers = [2, "flet", "KOMK", 7, "kiwi", "KOCHAM CIĘ"]
const questions = [
    h("div", {}, [
        h("p", {}, "Jednym z obowiązków jaki czeka cię w małżeństwie jest zarządzanie domowym budżetem. "+
        "Wymaga to niebanalnych zdolności rachunkowych. Udowodnij, że nie puścisz rodziny z torbami rozwiązując całkę:"),
        h("img", { src: "https://img.zadania.info/zad/1825096/HzadT0x.gif" })
    ]),
    h("div", {}, [
        h("p", {}, "Aby zaimponować swojej przyszłej żonie, musisz umieć grać na jakimś instrumencie. " +
        "Masz parę minut, aby nauczyć się grać poniższą melodię na FLECIE."),
        h("iframe", {
            width: "480",
            height: "360",
            src: "https://www.youtube.com/embed/KolfEhV-KiA",
            frameborder: "0",
            allow: "autoplay; encrypted-media"
        }),
        h("p", {}, "Jeśli twoja przyszła żona uzna wykonanie, dostaniesz klucz do następnego zadania")
    ]),
    h("p", {}, "Każdy facet powinien umieć gotować (przynajmniej wodę na herbatę). Jeśli akurat nie będziesz miał "+
    "pomysłu na wykwintny obiad, a żonę zaboli głowa (jak zwykle), wiedz, że na ulicy Św. Tomasza znajduje się "+
    "fajny bar mleczny. Udaj się tam teraz i znajdź drzwi zdobione gzymsem/portalem. Napis z tego portalu jest kluczem do następnego zadania."),
    h("p", {}, "Wysportowany chłop, to zdrowy chłop i szczęśliwa kobita. Wiesz ile wieżyczek ma Barbakan Krakowski? "+
    "Czas leci, na co czekasz!"),
    h("p", {}, "Noc poślubna tuż-tuż. Zanim jednak wkoczysz Kasi do łóżka powinieneś się odpowiednio przygotować. "+
    "Mówią na mieście, że depilacja jąder to już standard. Poćwicz na sztucznych, zanim narobisz sobie krzywdy. "+
    "Spiesz się - libido spada!"),
    h("p", {}, "Kierując się w stronę rynku ulicą Floriańską wykorzystaj tę okoliczność i poderwij jakąś dziewczynę. "+
    "Strzel sobie selfie i przez pomyłkę wyślij je do swojej narzeczonej. Klucz do tego zadania zna Kasia, a to czy go "+
    "dostaniesz zależy tylko od niej...")
]
const times = [190, 300, 300, 180, 60, 600]

const state = {
    activeTask: 0,
    isError: false,
    timer: times[0]
}

const actions = {
    checkAnswer: value => (state, actions) => {
        const input = document.querySelector("input")

        if (answers[state.activeTask] == input.value) {
            actions.resetInput()
            const nextTask = state.activeTask + 1
            return { activeTask: nextTask, isError: false, timer: times[nextTask]}
        }

        return { isError: true }
    },
    resetInput: () => document.querySelector("input").value = null,
    countDown: () => (state, actions) => {
        return state.timer == 0 ? { timer: 0 } : { timer: state.timer - 1 }
    }
}

let interval = null;

const view = (state, actions) => {
    if (state.activeTask == questions.length) {
        return h("h1", {}, "Gratulacje! Prawdziwy z Ciebie kawaler i świetny materiał na męża!")
    } else {
        return h("div", {}, [
            h("h1", {}, "Zadanie " + (state.activeTask + 1)),
            questions[state.activeTask],
            h("input", { type: "text", placeholder: "Odpowiedz tutaj" }, null),
            h("button", {
                onclick: () => actions.checkAnswer(),
                class: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            }, "Wyślij"),
            h(timer, {
                seconds: state.timer,
                countDown: actions.countDown
            }),
            state.isError ? h("h2", { style: { color: "red" } }, "Sorry, spróbuj jeszcze raz!") : null,
        ])
    }
}

const timer = ({ seconds, countDown }) => {
    return h("h2", {
        oncreate: element => interval = setInterval(countDown, 1000)
    }, formatTime(seconds))
}

const formatTime = (seconds) => {
    if (seconds >= 60) {
        const minute = Math.floor(seconds / 60)
        const second = (seconds - 60 * minute)

        return minute + "m " + second + "s" 
     } else {
         return seconds + "s"
     }
}

app(state, actions, view, document.getElementById("app"))